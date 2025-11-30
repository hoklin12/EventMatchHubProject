// Import the sequelize instance from your models/index.js to start transactions
const { sequelize } = require("../models");
const models = require("../models");
const { checkUserRoleParticipant } = require("../utils/checkUserRole");
const { BUCKET_NAME, FOLDERS } = require("../config/supabaseConfig");
const storageService = require("../services/storageService");

/* //////////////////////////////////////////////////////////////////////////////////
                          Event Registration Management
*/ //////////////////////////////////////////////////////////////////////////////////
//================== CRUD Event Register ==================
// User register for an event (only for participants)
exports.userRegisterForEvent = async (req, res, next) => {
  // 1. START THE TRANSACTION at the very beginning.
  const t = await sequelize.transaction();

  try {
    const userId = req.user.userId;
    const eventId = req.params.event_id;
    const { portfolioId, submission } = req.body;

    // =================================================================
    //  Step A: Perform Initial Validations (before any database writes)
    // =================================================================

    // Check if the user has the 'Participant' role
    const isParticipant = await checkUserRoleParticipant(userId);
    if (isParticipant) {
      await t.rollback(); // It's good practice to always close a transaction
      return res.status(403).json({
        status: "fail",
        message: "Your role does not have permission to perform this action.",
      });
    }

    // Check if the event exists
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      await t.rollback();
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }

    // Check if the user is already registered for this specific event
    const existingRegistration = await models.Registration.findOne({
      where: { user_id: userId, event_id: eventId },
    });
    if (existingRegistration) {
      await t.rollback();
      return res.status(400).json({
        status: "fail",
        message: "You are already registered for this event.",
      });
    }

    // =================================================================
    //  Step B: Perform Database Writes within the Transaction
    // =================================================================

    // Create the main registration record, passing the transaction object 't'
    const newRegistration = await models.Registration.create(
      {
        user_id: userId,
        event_id: eventId,
        portfolio_id: portfolioId, // This can be null if not provided
      },
      { transaction: t }
    );
    const questionsAnswered = [];
    // Process the form submission if it exists and is a valid array
    if (submission && Array.isArray(submission) && submission.length > 0) {
      const allFormFields = await models.FormField.findAll({
        where: { event_id: eventId },
        transaction: t, // Run read queries inside the transaction for consistency
      });
      const fieldsMap = new Map(
        allFormFields.map((field) => [field.formfield_id, field])
      );

      // Prepare an array for bulk creation for high performance
      const answersToCreate = [];

      for (const answer of submission) {
        const formField = fieldsMap.get(answer.formfield_id);
        const questionType = formField.field_type;
        const questionRequired = formField.is_required;
        const questionText = formField.question;

        // Fail the entire transaction if a submission is for a field that doesn't exist for this event
        if (!formField) {
          throw new Error(
            `Invalid form field ID '${answer.formfield_id}' submitted for this event.`
          );
        }

        const answerData = {
          registration_id: newRegistration.registration_id,
          formfield_id: answer.formfield_id,
        };

        // Validate and prepare data based on the question type from the database
        switch (questionType) {
          case "short":
          case "paragraph":
            if (
              questionRequired &&
              (!answer.answer_text || answer.answer_text.trim() === "")
            ) {
              throw new Error(
                `An answer is required for the question: "${questionText}"`
              );
            }
            answerData.answer_text = answer.answer_text || null;
            break;

          case "radio":
          case "dropdown":
            if (questionRequired && !answer.selected_options_id) {
              throw new Error(
                `A choice is required for the question: "${questionText}"`
              );
            }
            // Standardize on a single JSON column for all selections
            answerData.selected_options_id = answer.selected_options_id
              ? [answer.selected_options_id]
              : null;
            break;

          case "checkbox":
            if (
              questionRequired &&
              (!answer.selected_options_ids ||
                answer.selected_options_ids.length === 0)
            ) {
              throw new Error(
                `At least one checkbox must be selected for the question: "${questionText}"`
              );
            }
            answerData.selected_options_ids =
              answer.selected_options_ids || null;
            break;

          default:
            throw new Error(
              `Unsupported question type encountered in the database: ${questionType}`
            );
        }

        if (answer.answer_text != null) {
          questionsAnswered.push(`"${questionText}" : "${answer.answer_text}"`);
        } else if (answer.selected_options_ids != null) {
          let options = [];
          if (Array.isArray(answer.selected_options_ids)) {
            for (const optionId of answer.selected_options_ids) {
              const option = await models.FormFieldOption.findByPk(optionId);
              if (option) {
                options.push(option.option_text);
              }
            }
          }

          questionsAnswered.push(`"${questionText}" : "${options}"`);
        } else {
          const option = await models.FormFieldOption.findByPk(
            answer.selected_options_id
          );
          questionsAnswered.push(`"${questionText}" : "${option.option_text}"`);
        }
      }
      // Create all answers in a single, efficient database call
      if (answersToCreate.length > 0) {
        await models.FormResponseAnswer.bulkCreate(answersToCreate, {
          transaction: t,
        });
      }
    }
    const jsonformResponse = {};

    questionsAnswered.forEach((line) => {
      const cleaned = line.replace(/"/g, "");
      const [key, value] = cleaned.split(" : ");
      jsonformResponse[key] = value;
    });

    // Event details
    const eventData = await models.Event.findByPk(eventId);
    const eventDetails = {
      event_name: eventData.event_name,
      event_description: eventData.description,
      event_type: eventData.type,
      event_date: eventData.event_date,
      event_time: eventData.start_time,
      event_location: eventData.location,
    };

    // Participant details
    const userData = await models.User.findByPk(userId);
    eventDetails.participant_name = userData.full_name;
    eventDetails.participant_email = userData.email;

    // Portfolio
    let portfolioDataRaw = null;
    let portfolioData = null;
    if (portfolioId) {
      portfolioDataRaw = await models.Portfolio.findByPk(portfolioId);
      portfolioData = {
        title: portfolioDataRaw.title,
        description: portfolioDataRaw.description,
        bio: portfolioDataRaw.bio,
      };
    }
    const finalData = {
      ...eventDetails,
      participant_data: {
        ...jsonformResponse,
        if(portfolioData) {
          portfolio: portfolioData;
        },
      },
    };
    // Upload the form submission as a JSON file to Supabase Storage
    if (Object.keys(finalData).length > 0) {
      const buffer = Buffer.from(JSON.stringify(finalData, null, 2));
      const filePath = `${FOLDERS.FORMREGISTER}/${eventId}/${newRegistration.registration_id}.json`;

      const uploadedFile = await storageService.uploadFile(
        BUCKET_NAME.REGISTER,
        buffer,
        filePath,
        "application/json"
      );
      if (!uploadedFile) {
        throw new Error("Failed to upload form submission to storage.");
      }
      newRegistration.formResponseJson = uploadedFile;
      await newRegistration.save({ transaction: t });
    }

    // 2. If all operations were successful, commit the transaction to save the changes.
    await t.commit();

    return res.status(201).json({
      status: "success",
      message: "You have been registered for the event successfully.",
      data: newRegistration,
    });
  } catch (error) {
    // 3. If ANY error was thrown during the try block, rollback all database changes.
    await t.rollback();
    // Pass the error to your global error handling middleware
    next(error);
  }
};
