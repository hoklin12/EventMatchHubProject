const crypto = require("crypto");
const fs = require("fs");
const axios = require("axios");
const QRCode = require("qrcode");

/**
 * Generates a unique, human-readable verification code for a certificate.
 * @param {number|string} eventId - The ID of the event.
 * @param {number|string} userId - The ID of the participant.
 * @returns {string} The verification code (e.g., EMH-2024-ABC123DEF456).
 */
function generateVerificationCode(eventId, userId) {
  const currentYear = new Date().getFullYear().toString();

  // Create a consistent, unique hash from the event and user IDs
  const hash = crypto
    .createHash("sha256")
    .update(`${eventId}-${userId}-${process.env.CERTIFICATE_SECRET}`) // Add a secret for more security
    .digest("hex")
    .slice(0, 12)
    .toUpperCase();

  return `EMH-${currentYear}-${hash}`;
}

/**
 * Calculates the expiration date of a certificate.
 * @param {Date} issuedDate - The date the certificate was issued.
 * @param {number} durationInMonths - The validity period in months.
 * @returns {Date} The calculated expiration date.
 */

//Short URL for Certificate Verification
async function shortenURL(longUrl) {
  try {
    const response = await axios.get(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    return response.data;
  } catch (err) {
    console.error("Error shortening URL:", err);
    throw err;
  }
}

//Generate QR Code Payload for Certificate https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/generated/{event_id}/{user_id}.png

/**
 * Generate QR code as base64
 * @param {string} eventId
 * @param {string} userId
 * @returns {Promise<string>} base64 string
 */
async function generateQRCodePayload(eventId, userId) {
  const baseUrl =
    process.env.CERTIFICATE_QR_BASE_URL ||
    `https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/generated/${eventId}/${userId}.png`;
  url = await shortenURL(baseUrl);
  try {
    const qrDataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 300,
      margin: 1,
    });
    const base64 = qrDataUrl.split(",")[1];

    return base64;
  } catch (err) {
    console.error("QR code generation error:", err);
    throw err;
  }
}

// Export the functions so they can be used elsewhere
module.exports = {
  generateVerificationCode,
  generateQRCodePayload,
};
