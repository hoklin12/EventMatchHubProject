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

exports.viewAllCertificates = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
    const organizerId = await models.Role.findOne({
      where: { role_name: "organizer" },
      attributes: ["role_id"],
    });
    const isOrganizerRole = await models.UserRoles.findOne({
      where: {
        user_id: userId,
        role_id: organizerId.role_id,
      },
    });
    if (!isOrganizerRole) {
      return res.status(404).json({
        status: "fail",
        message: "User is not an organizer.",
      });
    }
    const isOrganizer = await models.Event.findOne({
      where: { event_id: eventId, user_id: userId },
    });
    if (!isOrganizer) {
      return res.status(404).json({
        status: "fail",
        message: "User is not an organizer of this event.",
      });
    }

    const certificate = await models.Certificate.findAll({
      where: {
        event_id: eventId,
      },
      order: [["updated_at", "DESC"]],
    });

    if (!certificate) {
      return res
        .status(404)
        .json({ status: "fail", message: "Certificate not found." });
    }
    return res.status(200).json({
      status: "success",
      data: certificate,
    });
  } catch (error) {
    console.error("View Certificate Error:", error);
    next(error);
  }
};

exports.viewSpecificCertificate = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const certId = req.params.cert_id;
  try {
    // Check if the user is an organizer for that event or participant with the certificate
    const organizerId = await models.Role.findOne({
      where: { role_name: "organizer" },
      attributes: ["role_id"],
    });
    const isOrganizerRole = await models.UserRoles.findOne({
      where: {
        user_id: userId,
        role_id: organizerId.role_id,
      },
    });

    const isParticipantRole = await models.Certificate.findOne({
      where: {
        certificate_id: certId,
        event_id: eventId,
        user_id: userId,
      },
    });

    if (!isOrganizerRole && !isParticipantRole) {
      return res.status(404).json({
        status: "fail",
        message:
          "User is not an organizer this event or participant with this certificate.",
      });
    }

    const certificate = await models.Certificate.findByPk(certId);

    return res.status(200).json({
      status: "success",
      data: certificate,
    });
  } catch (error) {
    console.error("View Specific Certificate Error:", error);
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
