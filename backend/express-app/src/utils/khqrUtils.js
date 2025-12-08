const QRCode = require("qrcode");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

/**
 * 1. Generates the raw KHQR payload string using the KHQR SDK.
 * @param {string} transactionRef - Our unique internal ID (used as BillNumber).
 * @param {number} amount - The transaction amount.
 * @returns {{khqrString: string, md5Hash: string}} The payload string and its MD5 hash.
 */
function generateKhqrPayload(transactionRef, data) {
  // Import khqrData to access currency enums
  const { BakongKHQR, khqrData, MerchantInfo } = require("bakong-khqr");
  const KHQR_GENERATOR = new BakongKHQR();

  // 2. SET UP MERCHANT & INDIVIDUAL INFO
  const merchantInfo = {
    merchantID: transactionRef,
    bakongAccountID: data.bakongAccountID,
    merchantName: data.merchantName,
    acquiringBank: data.acquiringBank,
    merchantCity: data.merchantCity,
    currency: khqrData.currency.usd,
    amount: data.price,
    // amount: data.amount,
    mobileNumber: data.mobileNumber,
    storeLabel: data.storeLabel,
    terminalLabel: data.plan_name,
  };

  // 3. GENERATE THE KHQR
  const khqrResponse = KHQR_GENERATOR.generateMerchant(merchantInfo);

  if (khqrResponse.status.code !== 0) {
    throw new Error(`KHQR SDK Error: ${khqrResponse.status.message}`);
  }

  return {
    khqrString: khqrResponse.data.qr,
    md5Hash: khqrResponse.data.md5,
  };
}

async function createQrCodeImage(string) {
  const qrBase64 = await QRCode.toDataURL(string);
  return qrBase64;
}

/**
 * Creates a QR stand image by overlaying QR and text onto a base template.
 * @param {string} bufferImage - Base64 Data URL of the QR code image.
 * @param {string} holder_name - The text to be displayed below the QR (e.g., Organizer Name).
 * @returns {Promise<string>} Base64 Data URL of the final composite image.
 */

async function createQRStand(bufferImage, holder_name) {
  const baseImagePath = "./public/images/Bakong_Stand.png";
  const baseImageBuffer = fs.readFileSync(baseImagePath);

  // 1. Prepare Base64 QR Image Buffer
  const cleanBase64 = bufferImage.replace(/^data:image\/\w+;base64,/, "");
  const overlayBuffer = Buffer.from(cleanBase64, "base64");

  // 2. Resize QR image to EXACT px (no decimals)
  const resizedOverlay = await sharp(overlayBuffer)
    .resize({
      width: 564,
      height: 564,
      fit: "cover",
    })
    .png()
    .toBuffer();

  // 3. Create SVG Text (center aligned)
  const textSvg = `
    <svg width="1274" height="120">
      <style>
        .title {
          font-family: Arial, sans-serif;
          font-size: 80px;
          font-weight: bold;
          fill: black;
        }
      </style>
      <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" class="title">
        ${holder_name}
      </text>
    </svg>
  `;

  const textBuffer = Buffer.from(textSvg);

  // 4. Composite QR and Text onto Base Image
  const finalImage = await sharp(baseImageBuffer)
    .composite([
      {
        input: resizedOverlay,
        left: Math.round(460.2), // 460px
        top: Math.round(662.6), // 663px
      },
      {
        input: textBuffer,
        left: Math.round(98.3), // text area left
        top: Math.round(1369.2), // text area top
      },
    ])
    .png()
    .toBuffer();

  return `data:image/png;base64,${finalImage.toString("base64")}`;
}

const MAX_TEXT_WIDTH_PX = 1273.4; // Maximum width for the text block (from your design)
const FONT_SIZE = 75;
const FONT_NAME = "Lora-Bold";
const FONT_PATH = path.resolve("./public/fonts/Lora-Bold.ttf");

// Utility to split text into lines based on max characters per line
function wrapText(text, maxCharsPerLine) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function createAttendanceQRStand(bufferImage, eventTitle) {
  const baseImagePath = "./public/images/Event_Attendance_Stand.png";
  const baseImageBuffer = fs.readFileSync(baseImagePath);

  // Load custom font and convert to Base64
  const fontPath = path.resolve("./public/fonts/Lora-Bold.ttf");
  const fontData = fs.readFileSync(fontPath);
  const fontBase64 = fontData.toString("base64");

  // Prepare QR image
  const cleanBase64 = bufferImage.replace(/^data:image\/\w+;base64,/, "");
  const overlayBuffer = Buffer.from(cleanBase64, "base64");
  const resizedQR = await sharp(overlayBuffer)
    .resize({ width: 777, height: 777, fit: "cover" })
    .png()
    .toBuffer();

  // Wrap event title
  const maxCharsPerLine = 23;
  const lines = wrapText(eventTitle, maxCharsPerLine);
  const fontSize = 75;
  const lineHeight = fontSize * 1.2; // spacing between lines
  const totalHeight = lines.length * lineHeight;

  // Generate SVG with <tspan> for proper line breaks and centered text
  let svgText = `<svg width="1274" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style type="text/css">
        @font-face {
          font-family: 'Lora-Bold';
          src: url('data:font/ttf;base64,${fontBase64}') format('truetype');
        }
        .title {
          font-family: 'Lora-Bold';
          font-size: ${fontSize}px;
          font-weight: bold;
          fill: white;
        }
      </style>
    </defs>
    <text x="50%" y="0" class="title" text-anchor="middle">`;

  lines.forEach((line, index) => {
    const y = (index + 1) * lineHeight; // line spacing
    svgText += `<tspan x="55%" y="${y}" text-anchor="middle">${line}</tspan>`;
  });

  svgText += `</text></svg>`;

  const textBuffer = Buffer.from(svgText);

  // Composite QR and text onto base image
  const finalImage = await sharp(baseImageBuffer)
    .composite([
      {
        input: resizedQR,
        left: Math.round(348.1),
        top: Math.round(650.9),
      },
      {
        input: textBuffer,
        left: 0,
        top: Math.round(286.1),
      },
    ])
    .png()
    .toBuffer();

  return `data:image/png;base64,${finalImage.toString("base64")}`;
}

module.exports = {
  generateKhqrPayload,
  createQrCodeImage,
  createQRStand,
  createAttendanceQRStand,
};
