const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");

/* //////////////////////////////////////////////////////////////////////////////////
                              Manage Event Form Fields
*/ //////////////////////////////////////////////////////////////////////////////////
// View form fields for an event (only for organizers)
exports.viewEventFormFields = async (req, res) => {
  const eventId = req.params.event_id;
  const userId = req.user.userId;
  try {
    // Check if user is organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in event ID ${eventId}.`,
      });
    }

    // Fetch form fields associated with the event
    const formFields = await models.FormField.findAll({
      where: { event_id: eventId },
      attributes: [
        "formfield_id",
        "question",
        "field_type",
        "is_required",
        "question_order",
      ],
    });

    let questionOptions = [];
    for (let field of formFields) {
      if (
        field.field_type === "radio" ||
        field.field_type === "checkbox" ||
        field.field_type === "dropdown"
      ) {
        const options = await models.FormFieldOption.findAll({
          where: { formfield_id: field.formfield_id },
          attributes: ["option_id", "option_text", "option_order"],
        });
        questionOptions.push({
          formfield_id: field.formfield_id,
          question: field.question,
          field_type: field.field_type,
          is_required: field.is_required,
          question_order: field.question_order,
          options: options.sort((a, b) => a.option_order - b.option_order),
        });
      } else {
        questionOptions.push({
          formfield_id: field.formfield_id,
          question: field.question,
          field_type: field.field_type,
          is_required: field.is_required,
          question_order: field.question_order,
        });
      }
    }

    return res.status(200).json({
      formFields: questionOptions.sort(
        (a, b) => a.question_order - b.question_order
      ),
    });
  } catch (error) {
    console.error("Error viewing event form fields:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update form fields for an event (only for organizers)
exports.updateEventFormFields = async (req, res) => {
  const eventId = req.params.event_id;
  const userId = req.user.userId;
  const formFields = req.body.formFields;

  try {
    // Check if user is organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    // Check event organizer
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're not organizer of event ID ${eventId}.`,
      });
    }

    // Load existing form fields
    const existingFormFields = await models.FormField.findAll({
      where: { event_id: eventId },
    });

    const existingFormFieldIds = existingFormFields.map((f) => f.formfield_id);

    const incomingFormFieldIds = formFields
      .filter((f) => f.formfield_id)
      .map((f) => f.formfield_id);

    // DELETE removed form fields
    for (let oldId of existingFormFieldIds) {
      if (!incomingFormFieldIds.includes(oldId)) {
        await models.FormFieldOption.destroy({
          where: { formfield_id: oldId },
        });
        await models.FormField.destroy({ where: { formfield_id: oldId } });
      }
    }

    // UPDATE OR CREATE form fields
    for (let field of formFields) {
      let formFieldRecord;

      if (field.formfield_id) {
        // UPDATE FIELD
        formFieldRecord = await models.FormField.findByPk(field.formfield_id);

        if (formFieldRecord) {
          await formFieldRecord.update({
            question: field.question,
            field_type: field.field_type,
            is_required: field.is_required,
            question_order: field.question_order,
          });
        }
      } else {
        // CREATE NEW FIELD
        formFieldRecord = await models.FormField.create({
          event_id: eventId,
          question: field.question,
          field_type: field.field_type,
          is_required: field.is_required,
          question_order: field.question_order,
        });

        // assign new id to field object to use for options
        field.formfield_id = formFieldRecord.formfield_id;
      }
    }

    // UPDATE OR CREATE OPTIONS
    for (let field of formFields) {
      if (["radio", "checkbox", "dropdown"].includes(field.field_type)) {
        const existingOptions = await models.FormFieldOption.findAll({
          where: { formfield_id: field.formfield_id },
        });

        const existingIds = existingOptions.map((o) => o.option_id);

        const incomingIds = (field.options || [])
          .filter((o) => o.option_id)
          .map((o) => o.option_id);

        // DELETE removed options
        for (let oldId of existingIds) {
          if (!incomingIds.includes(oldId)) {
            await models.FormFieldOption.destroy({
              where: { option_id: oldId },
            });
          }
        }

        // UPDATE or CREATE
        for (let opt of field.options || []) {
          if (opt.option_id) {
            // update
            const optRecord = await models.FormFieldOption.findByPk(
              opt.option_id
            );

            if (optRecord) {
              await optRecord.update({
                option_text: opt.option_text,
                option_order: opt.option_order,
              });
            }
          } else {
            // create new
            await models.FormFieldOption.create({
              formfield_id: field.formfield_id,
              option_text: opt.option_text,
              option_order: opt.option_order,
            });
          }
        }
      }
    }

    // FETCH updated form fields
    const updatedFormFields = await models.FormField.findAll({
      where: { event_id: eventId },
      order: [["question_order", "ASC"]],
    });

    const response = [];

    for (let f of updatedFormFields) {
      if (["radio", "checkbox", "dropdown"].includes(f.field_type)) {
        const options = await models.FormFieldOption.findAll({
          where: { formfield_id: f.formfield_id },
          attributes: ["option_id", "option_text", "option_order"],
          order: [["option_order", "ASC"]],
        });

        response.push({
          ...f.toJSON(),
          options,
        });
      } else {
        response.push({
          ...f.toJSON(),
        });
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Event form fields updated successfully.",
      data: response,
    });
  } catch (error) {
    console.error("Error updating event form fields:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
