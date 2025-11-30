const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");
const mime = require("mime-types");
const { uploadFile } = require("../services/storageService");
const { FOLDERS, BUCKET_NAME } = require("../config/supabaseConfig");

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
  // title, description, type, category, status, event_date,start_time, end_time,location_name, location, agenda, schedule_date,
  const data = JSON.parse(req.body.data);
  const themeFile = req.file ? req.file : null;
  try {
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    //Check Event Date Validity
    const eventDateObj = new Date(data.event_date);
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
      event_date: data.event_date,
      start_time: data.start_time,
      end_time: data.end_time,
      location_name: data.location_name,
      location: data.location,
    });

    const mimeType =
      mime.lookup(themeFile.originalname) || "application/octet-stream";

    const themeURL = await uploadFile(
      BUCKET_NAME.EVENT,
      themeFile.buffer,
      `${FOLDERS.THEME}/${newEvent.event_id}`,
      mimeType
    );
    newEvent.theme = themeURL;
    await newEvent.save();

    if (newEvent) {
      //Create Event Default Event Ticket
      const eventTicket = await models.EventTicket.create({
        event_id: newEvent.event_id,
        price: 0.0,
        quantity: 100,
        start_sale_date: new Date(),
        end_sale_date: newEvent.event_date,
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
      for (const optionText of optionsQ1) {
        await models.FormFieldOption.create({
          formfield_id: question_1.formfield_id,
          option_text: optionText,
          order: optionsQ1.indexOf(optionText) + 1,
        });
      }
      // Create options for question 4
      const optionsQ4 = ["XS", "S", "M", "L", "XL", "XXL"];
      for (const optionText of optionsQ4) {
        await models.FormFieldOption.create({
          formfield_id: question_4.formfield_id,
          option_text: optionText,
          order: optionsQ4.indexOf(optionText) + 1,
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
        date: event.event_date,
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
  const { title, description, type, status, event_date, location, fee_amount } =
    req.body;
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
    if (event.user_id !== userId) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in event ID ${eventId}.`,
      });
    }
    // Update event details
    await event.update({
      title: title || event.title,
      description: description || event.description,
      type: type || event.type,
      status: status || event.status,
      event_date: event_date || event.event_date,
      location: location || event.location,
      fee_amount: fee_amount || event.fee_amount,
    });
    return res.status(200).json({
      status: "success",
      message: "Event updated successfully.",
      data: {
        event: event,
      },
    });
  } catch (error) {
    console.error("Update Event Error:", error);
    next(error);
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
