const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");

// Create a new event only for organizers
exports.createEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const { title, description, type, status, event_date, location, fee_amount } =
    req.body;
  try {
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    //Check Event Date Validity
    const eventDateObj = new Date(event_date);
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
      title: title,
      description: description,
      type: type,
      status: status,
      event_date: event_date,
      location: location,
      fee_amount: fee_amount,
    });
    return res.status(201).json({
      status: "success",
      message: "Event created successfully.",
      data: {
        event: newEvent,
      },
    });
  } catch (error) {
    console.error("Create Event Error:", error);
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
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
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
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
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
    // Delete the event
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

// User register for an event (only for participants)
exports.userRegisterForEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const { portfolioId, title, description } = req.body;
  try {
    // Check if user is participant
    const checkParticipant = await checkUserRoleParticipant(userId);
    if (checkParticipant === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    //checking event existence
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }

    const getApplicationFormUser = await models.ApplicationForm.findOne({
      where: { user_id: userId },
      attributes: ["applicationform_id"],
    });
    if (getApplicationFormUser != null) {
      const existingRegistration = await models.Registration.findOne({
        where: {
          applicationform_id: getApplicationFormUser.applicationform_id,
        },
      });
      if (!existingRegistration) {
        return res.status(400).json({
          status: "fail",
          message: "User is already registered for this event.",
        });
      }
    }

    // Checking user already has an application form
    const userApplicationForm = await models.ApplicationForm.findAll({
      where: { user_id: userId },
      attributes: ["applicationform_id"],
    });
    let existedRegister = null;
    userApplicationForm.forEach((form) => {
      existedRegister = models.Registration.findOne({
        where: {
          applicationform_id: form.applicationform_id,
          event_id: eventId,
        },
      });
    });
    if (existedRegister) {
      return res.status(400).json({
        status: "fail",
        message: "User already registered for this event.",
      });
    }

    // Create a new application form for the user
    const newApplicationForm = await models.ApplicationForm.create({
      portfolio_id: portfolioId,
      user_id: userId,
      title: title,
      description: description,
    });

    // Create a new registration linking the user to the event via the application form
    const newRegistration = await models.Registration.create({
      applicationform_id: newApplicationForm.applicationform_id,
      event_id: eventId,
      status: "pending",
      registration_date: new Date(),
    });
    return res.status(201).json({
      status: "success",
      message: "User registered for event successfully.",
      data: {
        registration: newRegistration,
      },
    });
  } catch (error) {
    // console.error("User Register for Event Error:", error);
    next(error);
  }
};

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

// View participants of an event (only for organizers)
exports.viewEventParticipants = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    // Check if the event exists and if the user is an organizer for that event
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }
    const isOrganizer = await models.Event.findOne({
      where: { event_id: eventId, user_id: userId },
    });
    if (!isOrganizer) {
      return res
        .status(403)
        .json({ status: "fail", message: "Access denied. Not an organizer." });
    }
    // Fetch participants registered for the event
    const registrations = await models.Registration.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: models.ApplicationForm,
          as: "ApplicationForm",
          include: [
            {
              model: models.User,
              as: "User",
              attributes: ["user_id", "full_name", "email"],
            },
            {
              model: models.Portfolio,
              as: "Portfolio",
              attributes: ["portfolio_id", "title", "description"],
            },
          ],
        },
      ],
    });

    const portCertMap = {};

    // 1. Get portfolio IDs from registrations
    const portfolioIds = registrations.map(
      (r) => r.ApplicationForm.Portfolio.portfolio_id
    );

    // 2. Get all certificate_ids related to those portfolios
    const allCertificateIDs = await Promise.all(
      portfolioIds.map(async (id) => {
        const portfolioCerts = await models.PortfolioCertificates.findAll({
          where: { portfolio_id: id },
          attributes: ["certificate_id"],
        });

        // Map to just certificate_id
        return portfolioCerts.map((pc) => pc.certificate_id);
      })
    );

    // 3. Combine portfolio IDs with their certificates
    const combinedPortfolioCertificate = {};
    portfolioIds.forEach((id, index) => {
      combinedPortfolioCertificate[id] = allCertificateIDs[index] || [];
    });

    // 4. Fetch certificates for each user only once
    await Promise.all(
      registrations.map(async (item) => {
        const portfolioId = item.ApplicationForm.Portfolio.portfolio_id;

        if (!portCertMap[portfolioId]) {
          const certs = await models.Certificate.findAll({
            where: {
              certificate_id: combinedPortfolioCertificate[portfolioId],
            },
            attributes: [
              "certificate_id",
              "event_id",
              "organizer_name",
              "description",
              "issued_date",
              "expiration_duration",
              "verification_code",
              "file_link",
            ],
          });

          portCertMap[portfolioId] = certs;
        }
      })
    );
    // 5. Build final response
    const participants = registrations
      .map((item) => {
        const user = item.ApplicationForm.User;

        return {
          status: item.status,
          registration_date: item.registration_date,
          updated_at: item.updated_at, // <-- include for sort
          user: user,

          application_form: {
            applicationform_id: item.ApplicationForm.applicationform_id,
            title: item.ApplicationForm.title,
            description: item.ApplicationForm.description,
            portfolio: {
              portfolio_id: item.ApplicationForm.Portfolio.portfolio_id,
              title: item.ApplicationForm.Portfolio.title,
              description: item.ApplicationForm.Portfolio.description,
              certifications:
                portCertMap[item.ApplicationForm.Portfolio.portfolio_id] || [],
            },
          },
        };
      })
      // SORT BY updated_at DESC (newest first)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (participants.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No participants registered for this event.",
      });
    }
    return res.status(200).json({
      status: "success",
      data: participants,
    });
  } catch (error) {
    console.error("View Event Participants Error:", error);
    next(error);
  }
};
