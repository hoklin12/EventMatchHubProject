const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");
const checkUserPlanUtils = require("../utils/checkUserPlanUtils");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");
const mime = require("mime-types");
const { hashJsonObject } = require("../utils/encryptUtils");
const {
  uploadFile,
  replaceFile,
  deleteFile,
} = require("../services/storageService");
const { FOLDERS, BUCKET_NAME } = require("../config/supabaseConfig");
const {
  generateDailySessionsForRange,
} = require("../services/eventAttendanceService");
const { Op } = require("sequelize");
const { fileTypeFromBuffer } = require("file-type");

/* //////////////////////////////////////////////////////////////////////////////////
                              Create Event
*/ //////////////////////////////////////////////////////////////////////////////////
// List all events (accessible to all authenticated users)
exports.listEvents = async (req, res, next) => {
  try {
    const events = await models.Event.findAll();
    return res.status(200).json({
      status: "success",
      data: events,
    });
  } catch (error) {
    console.error("List Events Error:", error);
    next(error);
  }
};
// ================== CRUD Event ==================
// Create a new event only for organizers
exports.createEvent = async (req, res, next) => {
  const userId = req.user.userId;
  // title, description, type, category, status, start_date,end_date, location_name, location, agenda, schedule_date,
  const data = JSON.parse(req.body.data);
  const themeFile = req.file ? req.file : null;
  try {
    // Check if user is organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    //Check Event Date Validity
    const eventDateObj = new Date(data.start_date);
    const currentDate = new Date();
    if (isNaN(eventDateObj.getTime()) || eventDateObj < currentDate) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid event date. It must be a future date.",
      });
    }

    // Create Event
    const newEvent = await models.Event.create({
      user_id: userId,
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      type: data.type,
      start_date: data.start_date,
      end_date: data.end_date,
      location_name: data.location_name,
      location: data.location,
    });

    const sessions = await generateDailySessionsForRange(
      newEvent.event_id,
      newEvent.start_date,
      newEvent.end_date
    );

    if (sessions.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to create event sessions. Please check event dates.",
      });
    }

    console.log("Event Sessions created:", sessions.length);

    let themeURL = null;
    if (themeFile) {
      fileType = await fileTypeFromBuffer(themeFile.buffer);
      themeURL = await uploadFile(
        BUCKET_NAME.EVENT,
        themeFile.buffer,
        `${FOLDERS.THEME}/${newEvent.event_id}.${fileType.ext}`,
        fileType.mime
      );
      newEvent.theme = themeURL;
      await newEvent.save();
    }
    newEvent.theme = themeURL;
    await newEvent.save();

    if (newEvent) {
      //Create Event Default Event Ticket
      const eventTicket = await models.EventTicket.create({
        event_id: newEvent.event_id,
        price: 0.0,
        quantity: 100,
        start_sale_date: new Date(),
        end_sale_date: newEvent.start_date,
      });

      if (!eventTicket) {
        console.error(
          "Failed to create default event ticket for event ID:",
          newEvent.event_id
        );
      }

      //Create Event Default Form Field
      const question_1 = await models.FormField.create({
        event_id: newEvent.event_id,
        field_type: "dropdown",
        question: "How did you hear about us?",
        is_required: true,
        question_order: 1,
      });
      const question_2 = await models.FormField.create({
        event_id: newEvent.event_id,
        field_type: "paragraph",
        question: "Please provide a brief bio about yourself.",
        is_required: true,
        question_order: 2,
      });
      const question_3 = await models.FormField.create({
        event_id: newEvent.event_id,
        field_type: "paragraph",
        question: "Do you have any prior experience related to this event?",
        is_required: false,
        question_order: 3,
      });
      const question_4 = await models.FormField.create({
        event_id: newEvent.event_id,
        field_type: "dropdown",
        question: "Select your T-shirt size:",
        is_required: false,
        question_order: 4,
      });

      // Create options for question 1
      const optionsQ1 = [
        "Social Media",
        "Friend or Colleague",
        "Online Advertisement",
        "Search Engine",
        "Other",
      ];
      await Promise.all(
        optionsQ1.map((optionText, index) =>
          models.FormFieldOption.create({
            formfield_id: question_1.formfield_id,
            option_text: optionText,
            option_order: index + 1,
          })
        )
      );
      // Create options for question 4
      const optionsQ4 = ["XS", "S", "M", "L", "XL", "XXL"];
      for (const optionText of optionsQ4) {
        await models.FormFieldOption.create({
          formfield_id: question_4.formfield_id,
          option_text: optionText,
          option_order: optionsQ4.indexOf(optionText) + 1,
        });
      }

      //get user data
      const organizer = await models.User.findByPk(userId);

      // Create default of event certificate data
      const defaultCertificate = await models.CertificateData.create({
        event_id: newEvent.event_id,
        organizer_name:
          organizer.full_name || "Cambodia Academy of Digital Technology",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        issued_date: new Date(),
        organizer_role: "Organizer",
        organizer_director_name: organizer.full_name || "Director Name",
        expiration_duration: 0,
      });
      if (!defaultCertificate) {
        console.error(
          "Failed to create default certificate for event ID:",
          newEvent.event_id
        );
      }
    }

    return res.status(201).json({
      status: "success",
      data: {
        event: newEvent,
      },
    });
  } catch (error) {
    console.error("Create Event Error:", error);
    next(error);
  }
};

// View specific event details (accessible to all authenticated users)
exports.viewSpecificEvent = async (req, res, next) => {
  const eventId = req.params.event_id;
  try {
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }
    return res.status(200).json({
      status: "success",
      data: {
        title: event.title,
        description: event.description,
        type: event.type,
        status: event.status,
        start_date: event.start_date,
        end_date: event.end_date,
        location: event.location,
        fee_amount: event.fee_amount,
      },
    });
  } catch (error) {
    console.error("View Specific Event Error:", error);
    next(error);
  }
};

// Update event details only for organizers that created the event
exports.updateEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const data = JSON.parse(req.body.data);
  const themeFile = req.file ? req.file : null;

  try {
    // Validation for data fields
    if (
      !data.title ||
      !data.description ||
      !data.type ||
      !data.start_date ||
      !data.end_date ||
      !data.location ||
      !data.location_name ||
      data.type === "" ||
      data.title === "" ||
      data.description === "" ||
      data.location === "" ||
      data.location_name === ""
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Title, description, and type are required fields.",
      });
    }

    // Check organizer
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

    // Get event
    const event = await models.Event.findByPk(eventId);
    if (!event)
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found" });

    // Check Start and End Date Validity
    const newStartDate = data.start_date ? new Date(data.start_date) : null;
    const newEndDate = data.end_date ? new Date(data.end_date) : null;
    if (newStartDate && isNaN(newStartDate.getTime())) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid start date format.",
      });
    }

    // Check if end date is before start date
    if (newStartDate && newEndDate && newEndDate < newStartDate) {
      return res.status(400).json({
        status: "fail",
        message: "End date cannot be before start date.",
      });
    }

    // Handle theme file upload if provided
    if (themeFile) {
      const fileType = await fileTypeFromBuffer(themeFile.buffer);
      if (event.theme === null || event.theme === "") {
        const themeURL = await uploadFile(
          BUCKET_NAME.EVENT,
          themeFile.buffer,
          `${FOLDERS.THEME}/${eventId}.${fileType.ext}`,
          fileType.mime
        );
        event.theme = themeURL;
      } else {
        const themeURL = await replaceFile(
          BUCKET_NAME.EVENT,
          themeFile.buffer,
          `${FOLDERS.THEME}/${eventId}.${fileType.ext}`,
          fileType.mime
        );
        event.theme = themeURL;
      }
      await event.save();
    } else {
      // Delete theme from storage if themeFile is null and request has theme as empty string
      const themeCurrentURL = event.theme;
      const parts = themeCurrentURL.split(".");
      const extension = parts[parts.length - 1];
      await deleteFile(
        BUCKET_NAME.EVENT,
        `${FOLDERS.THEME}/${eventId}.${extension}`
      );
      event.theme = null;
      await event.save();
    }

    // Update event
    await event.update({
      title: data.title || event.title,
      description: data.description || event.description,
      type: data.type || event.type,
      status: data.status || event.status,
      start_date: data.start_date || event.start_date,
      end_date: data.end_date || event.end_date,
      location: data.location || event.location,
      location_name: data.location_name || event.location_name,
    });

    const newStart = new Date(data.start_date || event.start_date);
    const newEnd = new Date(data.end_date || event.end_date);

    // Delete sessions outside the new range
    await models.EventSession.destroy({
      where: {
        event_id: eventId,
        [Op.or]: [
          { session_date: { [Op.lt]: newStart } },
          { session_date: { [Op.gt]: newEnd } },
        ],
      },
    });

    // Generate missing sessions
    await generateDailySessionsForRange(eventId, newStart, newEnd);

    return res.status(200).json({
      status: "success",
      message: "Event updated successfully and sessions synchronized",
      data: { event },
    });
  } catch (err) {
    console.error("Update Event Error:", err);
    next(err);
  }
};

// Delete an event only for organizers that created the event
exports.deleteEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
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
    // Delete the event
    await models.Event.destroy({ where: { event_id: eventId } });
    return res.status(200).json({
      status: "success",
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);
    next(error);
  }
};

// ================== Manage Event Agenda ==================

// POST /api/v1/events/:event_id/agenda - Add agenda to an event (only for organizers)
exports.addAgendaToEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const agenda = req.file ? req.file : null;
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
    // Find the event
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }
    // Create new agenda
    const fileType = await fileTypeFromBuffer(agenda.buffer);
    const agendaURL = await uploadFile(
      BUCKET_NAME.EVENT,
      agenda.buffer,
      `${FOLDERS.AGENDA}/${eventId}.${fileType.ext}`,
      fileType.mime
    );

    const updateEvent = await models.Event.update(
      { agenda: agendaURL },
      { where: { event_id: eventId } }
    );

    if (!updateEvent) {
      return res.status(500).json({
        status: "fail",
        message: "Failed to add agenda to the event.",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Agenda added to event successfully.",
      data: { agenda: agendaURL },
    });
  } catch (error) {
    console.error("Add Agenda Error:", error);
    next(error);
  }
};

// PUT /api/v1/events/:event_id/agenda/:agenda_id - Update agenda of an event (only for organizers)

exports.updateAgendaOfEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const agenda = req.file ? req.file : null;
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
    // Find the event
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }
    // Create new agenda

    if (event.agenda === null || event.agenda === "") {
      const fileType = await fileTypeFromBuffer(agenda.buffer);
      const agendaURL = await uploadFile(
        BUCKET_NAME.EVENT,
        agenda.buffer,
        `${FOLDERS.AGENDA}/${eventId}.${fileType.ext}`,
        fileType.mime
      );
      event.agenda = agendaURL;
    } else {
      if (!agenda) {
        const match = event.agenda.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        const extension = match ? match[1] : null;
        await deleteFile(
          BUCKET_NAME.EVENT,
          `${FOLDERS.AGENDA}/${eventId}.${extension}`
        );
        event.agenda = null;
      } else {
        const fileType = await fileTypeFromBuffer(agenda.buffer);
        const agendaURL = await replaceFile(
          BUCKET_NAME.EVENT,
          agenda.buffer,
          `${FOLDERS.AGENDA}/${eventId}.${fileType.ext}`,
          fileType.mime
        );
        event.agenda = agendaURL;
      }
    }

    await event.save();

    return res.status(201).json({
      status: "success",
      message: "Agenda added to event successfully.",
      data: { agenda: event.agenda },
    });
  } catch (error) {
    console.error("Add Agenda Error:", error);
    next(error);
  }
};

// ================== Manage Event POST ==================
// Publish or unpublish an event (only for organizers)
exports.publishEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
    // Check if user is orginizer
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
    // Find the event
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }

    const eventTickets = await models.EventTicket.findAll({
      where: { event_id: eventId },
    });

    if (eventTickets.length === 0) {
      return res.status(400).json({
        status: "fail",
        message:
          "Cannot publish event without at least one event ticket. Please create an event ticket first.",
      });
    }

    for (const ticket of eventTickets) {
      if (ticket.price > 0) {
        const checkEventBakongExist = await models.EventBakong.findOne({
          where: { event_id: eventId },
        });
        if (!checkEventBakongExist) {
          return res.status(400).json({
            status: "fail",
            message: `Cannot publish paid event with ticket ID ${ticket.eventticket_id} without Bakong payment setup. Please set up Bakong payment.`,
          });
        }
      }
    }

    // Toggle publish status
    event.status = event.status === "public" ? "private" : "public";
    await event.save();

    return res.status(200).json({
      status: "success",
      message: `Event has been ${event.status}.`,
      data: {
        event: event,
      },
    });
  } catch (error) {
    console.error("Publish Event Error:", error);
    next(error);
  }
};

// Schedule an event only for organizers that created the event
exports.scheduleEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const { schedule_date, schedule_time } = req.body;
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
    // Check if the event exists and if the user is an organizer for that event
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }

    // Update event schedule
    await event.update({
      schedule_date: `${schedule_date} ${schedule_time}` || event.schedule_date,
      status: "schedule",
    });

    return res.status(200).json({
      status: "success",
      message: "Event schedule updated successfully.",
      data: {
        event: event,
      },
    });
  } catch (error) {
    console.error("Schedule Event Error:", error);
    next(error);
  }
};

// Delete an event (only for organizers)
exports.deleteEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
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
    // Find the event
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }
    // Soft delete the event

    await event.destroy();
    return res.status(200).json({
      status: "success",
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Event Error:", error);
    next(error);
  }
};

//Get all registrations for a specific event (for event organizers)
exports.getAllRegistrationsForEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
    // Check if the user has the 'Organizer' role
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role does not have permission to perform this action.",
      });
    }

    // Check if the user is the organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, req.params.event_id);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message:
          "You do not have permission to view registrations for this event.",
      });
    }
    const registrations = await models.Registration.findAll({
      where: { event_id: eventId },
      attributes: [
        "registration_id",
        "user_id",
        "portfolio_id",
        "status",
        "is_paid",
        "formResponseJson",
        "createdAt",
      ],
    });
    const registrationsData = await Promise.all(
      registrations.map(async (registration) => {
        const userData = await models.User.findByPk(registration.user_id, {
          attributes: ["full_name", "email", "phone_number"],
        });
        return {
          full_name: userData.full_name,
          email: userData.email,
          phone_number: userData.phone_number,
        };
      })
    );

    const registrationsWithUserData = registrations.map(
      (registration, index) => ({
        registration_id: registration.registration_id,
        portfolio_id: registration.portfolio_id,
        status: registration.status,
        registrate_date: registration.createdAt,
        payment_status: registration.is_paid,
        register_json: registration.formResponseJson,
        user: registrationsData[index],
      })
    );

    return res.status(200).json({
      status: "success",
      data: registrationsWithUserData,
    });
  } catch (error) {
    next(error);
  }
};

//PUT : Update registration status (approve/reject) (for event organizers)
exports.updateRegistrationStatus = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const registrationId = req.params.registration_id;
  try {
    // Check if the user has the 'Organizer' role
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role does not have permission to perform this action.",
      });
    }

    // Check if the user is the organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message:
          "You do not have permission to update registrations for this event.",
      });
    }
    const registrationData = await models.Registration.findByPk(registrationId);
    if (!registrationData) {
      return res
        .status(404)
        .json({ status: "fail", message: "Registration not found." });
    }

    // Find the registration to update
    const registration = await models.Registration.findOne({
      where: {
        registration_id: registrationId,
        event_id: eventId,
      },
    });

    if (!registration) {
      return res
        .status(404)
        .json({ status: "fail", message: "Registration not found." });
    }
    // Toggle publish status
    if (registrationData.status === "pending") {
      registration.status = "approved";
    } else {
      registration.status =
        registration.status === "approved" ? "rejected" : "approved";
    }
    await registration.save();
    return res.status(200).json({
      status: "success",
      message: "Registration status updated successfully.",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

//GET: Get event that participant has registered
exports.getEventsRegisteredByParticipant = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const registrations = await models.Registration.findAll({
      where: { user_id: userId },
      attributes: ["registration_id", "event_id", "status", "createdAt"],
    });
    const registrationsData = await Promise.all(
      registrations.map(async (registration) => {
        const eventData = await models.Event.findByPk(registration.event_id, {
          attributes: [
            "title",
            "description",
            "type",
            "theme",
            "start_date",
            "end_date",
            "location_name",
            "location",
          ],
          order: [["start_date", "DESC"]],
        });
        return {
          title: eventData.title,
          description: eventData.description,
          type: eventData.type,
          theme: eventData.theme,
          start_date: eventData.start_date,
          end_date: eventData.end_date,
          location_name: eventData.location_name,
          location: eventData.location,
        };
      })
    );

    const registrationsWithEventData = registrations.map(
      (registration, index) => ({
        registration_id: registration.registration_id,
        event_id: registration.event_id,
        status: registration.status,
        registrate_date: registration.createdAt,
        event: registrationsData[index],
      })
    );
    return res.status(200).json({
      status: "success",
      data: registrationsWithEventData,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/events/:event_id/email-reminders - Check AI-generated event reminders (for organizers)
exports.checkEmailReminderFeature = async (req, res, next) => {
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

    // Find the event
    const event = await models.Event.findByPk(eventId);
    return res.status(200).json({
      status: "success",
      allow_remind_email: event.allowRemindEmail,
    });
  } catch (error) {
    console.error("Check AI Reminder Feature Error:", error);
    next(error);
  }
};

// PUT /api/v1/events/:event_id/email-reminders - Enable/Disable AI-generated event reminders (for organizers)
exports.toggleEmailReminderFeature = async (req, res, next) => {
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

    const featureID = await checkUserPlanUtils.checkUserPlanUtils(userId);
    // Check if user's plan includes the AI reminder feature
    if (
      featureID !== "8c414757-0ce6-4f0d-89e4-97cb9746446e" &&
      featureID !== "8512e6f3-2bb2-4b9a-9af1-d967d5ffbdf1"
    ) {
      return res.status(403).json({
        status: "fail",
        message:
          "Your current plan does not include the AI-generated email reminder feature. Please upgrade your plan to access this feature.",
      });
    }

    // Find the event
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }
    // Update allowRemindEmail field
    event.allowRemindEmail = event.allowRemindEmail === true ? false : true;
    await event.save();
    return res.status(200).json({
      status: "success",
      allowRemindEmail: event.allowRemindEmail,
    });
  } catch (error) {
    console.error("Toggle AI Reminder Feature Error:", error);
    next(error);
  }
};

// exports.toggleParticipantEventApprove = async (req, res, next) => {
//   const userId = req.user.userId;
//   const eventId = req.params.event_id;
//   const registrationId = req.body.registration_id;
//   try {
//     // Check if user is participant
//     const checkOrganizer = await checkUserRoleOrganizer(userId);
//     if (checkOrganizer) {
//       return res.status(403).json({
//         status: "fail",
//         message: "Your role haven't permission to access api",
//       });
//     }

//     // Check if user is organizer of the event
//     const isOrganizer = await checkEventOrganizer(userId, eventId);
//     if (isOrganizer) {
//       return res.status(403).json({
//         status: "fail",
//         message: `Access denied. You're Not organizer in event ID ${eventId}.`,
//       });
//     }

//     // Find the event
//     const event = await models.Event.findByPk(eventId);
//     if (!event) {
//       return res
//         .status(404)
//         .json({ status: "fail", message: "Event not found." });
//     }

//     // Check if the participant is registered for the event
//     const registration = await models.Registration.findOne({
//       where: {
//         event_id: eventId,
//         registration_id: registrationId,
//       },
//     });
//     if (!registration) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Participant is not registered for this event.",
//       });
//     }

//     registration.status =
//       registration.status === "approved" ? "rejected" : "approved";

//     // if (registration.status === "approved") {
//     //   registration.registrationHash = hashJsonObject(registration);
//     // } else {
//     //   registration.registrationHash = null;
//     // }

//     await registration.save();

//     return res.status(200).json({
//       status: "success",
//       message: `Participant status has been ${registration.status}.`,
//       data: {
//         registration: registration,
//       },
//     });
//   } catch (error) {
//     console.error("Toggle Participant Status Error:", error);
//     next(error);
//   }
// };

exports.toggleParticipantEventApprove = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const registrationId = req.body.registration_id;

  try {
    // Check organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer)
      return res.status(403).json({
        status: "fail",
        message: "Your role does not have permission to access this API",
      });

    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer)
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're not the organizer of event ID ${eventId}.`,
      });

    // Find registration
    const registration = await models.Registration.findByPk(registrationId);
    if (!registration || registration.event_id !== eventId)
      return res.status(404).json({
        status: "fail",
        message: "Participant is not registered for this event.",
      });

    // Toggle status
    registration.status =
      registration.status === "approved" ? "rejected" : "approved";

    await registration.save();

    if (registration.status === "approved") {
      // Create attendance rows for all sessions of this event
      const sessions = await models.EventSession.findAll({
        where: { event_id: eventId },
      });

      for (const session of sessions) {
        await models.EventAttendance.findOrCreate({
          where: {
            event_session_id: session.event_session_id,
            registration_id: registrationId,
          },
          defaults: {
            attendance_status: "pending",
            check_in_time: null,
          },
        });
      }
    } else {
      // Remove all attendance records if rejected
      const sessionIds = (
        await models.EventSession.findAll({ where: { event_id: eventId } })
      ).map((s) => s.event_session_id);

      // Delete attendance records
      await models.EventAttendance.destroy({
        where: {
          registration_id: registrationId,
          event_session_id: { [Op.in]: sessionIds },
        },
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Participant status has been ${registration.status}.`,
    });
  } catch (error) {
    console.error("Toggle Participant Status Error:", error);
    next(error);
  }
};
