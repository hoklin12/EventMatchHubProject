const models = require("../models");
const certificateService = require("../services/certificateService");
const { hashJsonObject } = require("../utils/encryptUtils");
const { uploadFile, replaceFile } = require("../services/storageService");
const { FOLDERS, BUCKET_NAME } = require("../config/supabaseConfig");
const { getSignatureBase64 } = require("../utils/urlImageUtils");
const { Op } = require("sequelize");

const { fileTypeFromBuffer } = require("file-type");
const {
  generateVerificationCode,
  generateQRCodePayload,
} = require("../utils/certificateUtils");

const {
  getExpirationDate,
  formatDateCertificate,
} = require("../utils/dateTimeUtils");

const { checkUserRoleOrganizer } = require("../utils/checkUserRole");

exports.updateCertificateData = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const data = JSON.parse(req.body.data);
  const signatureFile = req.files["signature"]
    ? req.files["signature"][0]
    : null;
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
    // Update or create certificate data for the event
    const certificateData = await models.CertificateData.findOne({
      where: { event_id: eventId },
    });

    if (
      certificateData.signature_url == null ||
      certificateData.signature_file_name == null
    ) {
      if (!signatureFile) {
        return res.status(400).json({
          status: "fail",
          message: "Signature image is required.",
        });
      }
    }
    const fileType = await fileTypeFromBuffer(signatureFile.buffer);
    console.log("Uploaded signature file type:", fileType.mime);

    if (data.template_id != null) {
      const template = await models.CertificateTemplate.findByPk(
        data.template_id
      );
      if (!template) {
        return res.status(404).json({
          status: "fail",
          message: "Certificate template not found.",
        });
      }
    }

    if (certificateData) {
      // Update existing record
      certificateData.template_id = data.template_id;
      certificateData.organizer_name = data.organizer_name;
      certificateData.description = data.description;
      certificateData.issued_date = data.issued_date;
      certificateData.expiration_duration = data.expiration_duration;
      certificateData.organization_director_name =
        data.organization_director_name;
      certificateData.organizer_role = data.organizer_role;
      if (
        certificateData.signature_url != null ||
        certificateData.signature_file_name != null
      ) {
        if (signatureFile) {
          // Upload signature to Supabase
          const uploadResult = await replaceFile(
            BUCKET_NAME.CERTIFICATE,
            signatureFile.buffer,
            `${FOLDERS.SIGNATURE}/${eventId}.${fileType.ext}`,
            fileType.mime
          );
          certificateData.signature_file_name = signatureFile.originalname;
          certificateData.signature_url = uploadResult;
        }
      }
      await certificateData.save();
    } else {
      const uploadResult = await uploadFile(
        BUCKET_NAME.CERTIFICATE,
        signatureFile.buffer,
        `${FOLDERS.SIGNATURE}/${eventId}.${fileType.ext}`,
        fileType.mime
      );
      const signature_file_name = signatureFile.originalname;
      const signature_url = uploadResult;
      // Create new record
      await models.CertificateData.create({
        event_id: eventId,
        template_id: data.template_id,
        organization_name: data.organization_name,
        description: data.description,
        issued_date: data.issued_date,
        expiration_duration: data.expiration_duration,
        organization_director_name: data.organization_director_name,
        organizer_role: data.organizer_role,
        signature_file_name,
        signature_url,
      });
    }

    return res.status(200).json({
      status: "success",
      data: certificateData,
    });
  } catch (error) {
    console.error("Update Certificate Template Error:", error);
    next(error);
  }
};

exports.createCertificates = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const data = JSON.parse(req.body.data);

  // 1. Validate
  const certificateData = await models.CertificateData.findOne({
    where: { event_id: eventId },
  });
  if (!certificateData) {
    return res.status(400).json({
      status: "fail",
      message: "Please set up certificate data before generating certificates.",
    });
  }

  const signatureFile = await getSignatureBase64(certificateData.signature_url);

  if (!signatureFile) {
    return res.status(400).json({
      status: "fail",
      message: "Signature image is required.",
    });
  }

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
      where: {
        event_id: eventId,
        status: "approved",
        // end_date: { [Op.lte]: new Date() },
      },
    });
    if (registrations.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No participants registered for this event.",
      });
    }

    // Fetch all sessions for the event
    const sessions = await models.EventSession.findAll({
      where: { event_id: eventId },
      attributes: ["event_session_id"],
    });
    const sessionIds = sessions.map((s) => s.event_session_id);

    // Generate certificates for each participant
    const generatedCertificates = [];
    for (const registration of registrations) {
      // Check full attendance
      const participantId = registration.user_id;
      const attendanceCount = await models.EventAttendance.count({
        where: {
          registration_id: registration.registration_id,
          event_session_id: sessionIds,
          attendance_status: "present",
        },
      });

      // Skip participant if not attended all sessions
      if (attendanceCount !== sessionIds.length) continue;

      //Check user has been issued a certificate already
      const existingCertificate = await models.Certificate.findOne({
        where: {
          user_id: participantId,
          certificatedata_id: certificateData.certificatedata_id,
        },
      });

      if (existingCertificate) {
        continue;
      }

      const newCertificate = await models.Certificate.create({
        certificatedata_id: certificateData.certificatedata_id,
        user_id: participantId,
        verification_code: generateVerificationCode(eventId, participantId),
        file_link: "",
      });

      const qrPayload = await generateQRCodePayload(eventId, participantId);
      const participant = await models.User.findByPk(participantId);
      const metadata = await models.CertificateTemplate.findByPk(data.metadata);
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
          date_certified: formatDateCertificate(certificateData.issued_date),
          valid_through: formatDateCertificate(
            getExpirationDate(
              new Date(certificateData.issued_date),
              Number(certificateData.expiration_duration)
            )
          ),

          // valid_through: newCertificate.issued_date.toISOString().split("T")[0],
          certificate_id: newCertificate.verification_code,
          signature: signatureFile,
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
      // data: signatureFile,
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
