const models = require("../models");
const QRService = require("../services/qrService");
const {
  EventAttendanceService,
} = require("../services/eventAttendanceService");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");
const { checkUserRoleOrganizer } = require("../utils/checkUserRole");
const {
  createQrCodeImage,
  createAttendanceQRStand,
} = require("../utils/khqrUtils");

// -----------------------------
// Refresh QR Token
// -----------------------------
exports.regenerateQR = async (req, res, next) => {
  try {
    const sessionId = req.params.session_id;
    const userId = req.user.userId;

    const session = await models.EventSession.findByPk(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Check organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, session.event_id);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in event ID ${session.event_id}.`,
      });
    }

    const { token, expires_at } = await QRService.updateSessionQR(sessionId);
    const qrCodeImage = await createQrCodeImage(token);

    const eventName = await models.Event.findByPk(session.event_id, {
      attributes: ["title"],
    });

    const qrStandImage = await createAttendanceQRStand(
      qrCodeImage,
      eventName.title
    );

    return res.json({
      message: "QR refreshed",
      qr_token: token,
      qr_code_image: qrStandImage,
      expires_at: expires_at,
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------
// Participant check-in
// -----------------------------
exports.checkIn = async (req, res) => {
  try {
    const { qr_token } = req.body;
    const userId = req.user.userId;

    const result = await EventAttendanceService.checkInByQR(qr_token, userId);

    return res.json({
      status: "success",
      ...result,
    });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: err.message });
  }
};
