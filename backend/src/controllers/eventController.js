const { where } = require("sequelize");
const models = require("../../models");

exports.userRegisterForEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const { portfolioId, title, description } = req.body;
  try {
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
    res.status(201).json({
      status: "success",
      message: "User registered for event successfully.",
      data: {
        registration: newRegistration,
      },
    });
  } catch (error) {
    console.error("User Register for Event Error:", error);
    next(error);
  }
};

exports.listEvents = async (req, res, next) => {
  try {
    const events = await models.Event.findAll();
    res.json({
      status: "success",
      data: events,
    });
  } catch (error) {
    console.error("List Events Error:", error);
    next(error);
  }
};

exports.viewSpecificEvent = async (req, res, next) => {
  const eventId = req.params.event_id;
  try {
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }
    res.json({
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

exports.viewEventParticipants = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
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

    // 1. Get all portfolio_ids first
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

    // 3. Fetch certificates for each user only once
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
              "title",
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
    // 4. Build final response
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
      return res.json({
        status: "fail",
        message: "No participants registered for this event.",
      });
    }
    res.json({
      status: "success",
      data: participants,
    });
  } catch (error) {
    console.error("View Event Participants Error:", error);
    next(error);
  }
};

exports.generateCertificate = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const { title, description, expiration_duration } = req.body;
  try {
    // Verify that the user is registered for the event
  } catch (error) {
    console.error("Generate Certificate Error:", error);
    next(error);
  }
};
