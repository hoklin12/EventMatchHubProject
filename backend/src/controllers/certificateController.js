const models = require("../../models");
const crypto = require("crypto");

// Generate certificates for event participants (only for organizers that created the event)
function generateVerificationCode(eventID, userID) {
  const hash = crypto
    .createHash("sha256")
    .update(`${eventID}-${userID}`)
    .digest("hex")
    .slice(0, 12)
    .toUpperCase();

  return `EMH-${hash}`;
}

exports.createCertificates = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const { organizer_name, description, expiration_duration } = req.body;
  try {
    // Check if the event exists and if the user is an organizer for that event
    const isOrganizer = await models.Event.findOne({
      where: { event_id: eventId, user_id: userId },
    });
    if (!isOrganizer) {
      return res.status(404).json({
        status: "fail",
        message: "User is not an organizer of this event.",
      });
    }
    // Fetch participants registered for the event
    const registrations = await models.Registration.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: models.ApplicationForm,
          as: "ApplicationForm",
          attributes: ["applicationform_id", "user_id"],
        },
      ],
    });
    // Generate certificates for each participant
    const generatedCertificates = [];
    for (const registration of registrations) {
      const participantId = registration.ApplicationForm.user_id;
      //Check user has been issued a certificate already
      const existingCertificate = await models.Certificate.findOne({
        where: {
          event_id: eventId,
          user_id: participantId,
        },
      });

      if (existingCertificate) {
        continue;
      }

      const newCertificate = await models.Certificate.create({
        event_id: eventId,
        user_id: participantId,
        organizer_name: organizer_name,
        description: description,
        issued_date: new Date(),
        expiration_duration: expiration_duration,
        verification_code: generateVerificationCode(eventId, participantId),
        file_link: "",
      });
      generatedCertificates.push(newCertificate);
    }
    return res.status(201).json({
      status: "success",
      message: "Certificates generated successfully for event participants.",
      data: generatedCertificates,
    });
  } catch (error) {
    console.error("Generate Certificates Error:", error);
    next(error);
  }
};

// View all certificates for an event (only for organizers that created the event)
exports.viewAllCertificates = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
    // Check if the event exists and if the user is an organizer for that event
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

// View specific certificate details
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

// Get specific Certificate by cert_id only for participant role
exports.getCertificateById = async (req, res, next) => {
  const userId = req.user.userId;
  const certId = req.params.cert_id;
  try {
    // Find certificate by user_id and cert_id
    const certificate = await models.Certificate.findOne({
      where: { user_id: userId, certificate_id: certId },
    });
    if (!certificate) {
      return res
        .status(404)
        .json({ status: "fail", message: "Certificate not found." });
    }
    return res.status(200).json({
      status: "success",
      certificate: {
        certificate_id: certificate.certificate_id,
        organizer_name: certificate.organizer_name,
        description: certificate.description,
        issued_date: certificate.issued_date,
        expiration_duration: certificate.expiration_duration,
        file_link: certificate.file_link,
      },
    });
  } catch (error) {
    console.error("Get Certificate By ID Error:", error);
    next(error);
  }
};
