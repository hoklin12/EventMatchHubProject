const models = require("../models");
const certificateService = require("../services/certificateService");
const { hashJsonObject } = require("../utils/encryptUtils");

const {
  generateVerificationCode,
  generateQRCodePayload,
} = require("../utils/certificateUtils");

const {
  getExpirationDate,
  formatDateCertificate,
} = require("../utils/dateTimeUtils");

const { checkUserRoleOrganizer } = require("../utils/checkUserRole");

exports.createCertificates = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const data = JSON.parse(req.body.data);
  const signatureFile = req.files["signature"]
    ? req.files["signature"][0]
    : null;

  // 1. Validate
  if (!signatureFile) {
    return res.status(400).json({
      status: "fail",
      message: "Signature image is required.",
    });
  }

  // console.log(
  //   "Files received:",
  //   signatureFile?.originalname ? signatureFile.originalname : "No file"
  // );

  try {
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
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
        organizer_name: data.organizer_name,
        description: data.description,
        issued_date: new Date(),
        expiration_duration: data.expiration_duration,
        verification_code: generateVerificationCode(eventId, participantId),
        file_link: "",
      });

      const participant = await models.User.findByPk(participantId);
      const metadata = await models.CertificateTemplate.findByPk(data.metadata);

      // // Validate base64 QR payload before sending to Python
      // const isBase64 = (str) => {
      //   if (!str || typeof str !== "string") return false;
      //   const cleaned = str.replace(/\s+/g, "");
      //   try {
      //     const buf = Buffer.from(cleaned, "base64");
      //     return buf.toString("base64") === cleaned;
      //   } catch (e) {
      //     return false;
      //   }
      // };

      // let qrPayload = "";
      // if (data.qr_code && isBase64(data.qr_code)) {
      //   qrPayload = data.qr_code;
      // } else if (data.qr_code) {
      //   console.warn(
      //     "Invalid QR base64 provided; skipping QR for participant",
      //     participantId
      //   );
      // }

      const qrPayload = await generateQRCodePayload(
        eventId,
        participant.user_id
      );

      const pythonInput = {
        metadata: {
          template: metadata.template,
          metadata: metadata.metadata,
          event_id: eventId,
        },
        userData: {
          user_id: participant.user_id,
          participant_name: participant.full_name,
          organizer_name: data.organizer_name,
          description: data.description,
          date_certified: formatDateCertificate(newCertificate.issued_date),
          valid_through: formatDateCertificate(
            getExpirationDate(
              newCertificate.issued_date,
              data.expiration_duration
            )
          ),
          // valid_through: newCertificate.issued_date.toISOString().split("T")[0],
          certificate_id: newCertificate.verification_code,
          signature: signatureFile.buffer.toString("base64"),
          qr_code: qrPayload,
          organizer_directer: data.organizer_directer,
          organizer_role: data.organizer_role,
        },
      };

      const certificateResult = await certificateService.generateCertificate(
        pythonInput
      );

      // Update the certificate record with the file path returned by the Python script (if any)
      if (certificateResult.success && certificateResult.url) {
        newCertificate.file_link = certificateResult.url;
      }
      const verification_hash = hashJsonObject(newCertificate);
      newCertificate.verification_hash = verification_hash;
      await newCertificate.save();

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
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
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

// Get certificate template (accessible only to organizers)
exports.getCertificateTemplate = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    // Return a predefined certificate template
    const template = await models.CertificateTemplate.findAll({
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({ status: "success", data: template });
  } catch (error) {
    console.error("Get Certificate Template Error:", error);
    next(error);
  }
};
