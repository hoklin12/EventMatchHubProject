// services/qrService.js
const crypto = require("crypto");
const models = require("../models");

class QRService {
  static generateToken() {
    return crypto.randomBytes(16).toString("hex");
  }

  static async updateSessionQR(eventSessionId) {
    const token = this.generateToken();
    const expiry = new Date(Date.now() + 1000 * 60 * 30); // 30 mins

    await models.EventSession.update(
      {
        qr_token: token,
        qr_expires_at: expiry,
      },
      { where: { event_session_id: eventSessionId } }
    );

    return {
      token,
      expiry,
    };
  }
}

module.exports = QRService;
