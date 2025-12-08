// src/services/authService.js
const jwt = require("jsonwebtoken");
const { sendEmail, sendEmailHTMLFormat } = require("./emailService");
require("dotenv").config();
const models = require("../models"); // Your Sequelize models

const EMAIL_VERIFICATION_SECRET = process.env.EMAIL_VERIFICATION_SECRET;
const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://127.0.0.1:3000/api/v1"; // e.g., http://localhost:5000/api

exports.sendVerificationEmail = async (user) => {
  if (!user || !user.user_id || !user.email) {
    throw new Error("User data is incomplete for verification email.");
  }

  const token = jwt.sign(
    { userId: user.user_id, email: user.email },
    EMAIL_VERIFICATION_SECRET,
    { expiresIn: "24h" }
  );

  // Link points to the backend verification endpoint
  const verificationLink = `${BACKEND_API_URL}/auth/verify-email?token=${token}`;

  const bodyContent = `
<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color:#f4f4f7; padding: 40px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td align="center" style="font-size: 26px; font-weight: bold; color: #2d2d2d;">
            Welcome to Event Match Hub 🎉
          </td>
        </tr>

        <tr><td height="20"></td></tr>

        <!-- Subtitle -->
        <tr>
          <td align="center" style="font-size: 16px; color: #555;">
            Verify your email to activate your account
          </td>
        </tr>

        <tr><td height="30"></td></tr>

        <!-- Button -->
        <tr>
          <td align="center">
            <a 
              href="${verificationLink}" 
              style="
                background-color: #4F46E5;
                color: #fff;
                text-decoration: none;
                padding: 14px 28px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 6px;
                display: inline-block;
              "
            >
              Verify My Email
            </a>
          </td>
        </tr>

        <tr><td height="30"></td></tr>

        <!-- Text -->
        <tr>
          <td style="font-size: 15px; color: #444; line-height: 1.6;">
            If the button above doesn't work, copy and paste the link below into your browser:
            <br><br>
            <a href="${verificationLink}" style="color:#4F46E5; word-break: break-all;">
              ${verificationLink}
            </a>
          </td>
        </tr>

        <tr><td height="20"></td></tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="font-size: 13px; color: #777;">
            This verification link expires in <strong>24 hours</strong>.
            <br><br>
            © ${new Date().getFullYear()} Event Match Hub. All rights reserved.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`;

  await sendEmailHTMLFormat(
    user.email,
    "Action Required: Verify Your Event Match Hub Email",
    bodyContent
  );
};

exports.verifyUserEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, EMAIL_VERIFICATION_SECRET);
    const userId = decoded.userId;

    const user = await models.User.findByPk(userId);
    if (!user) {
      throw new Error("User not found or token is invalid.");
    }

    if (user.is_verified) {
      return { message: "Account already verified." };
    }

    // Update the user's status in the database
    await user.update({ status: "active" });

    return {
      message:
        "Email successfully verified. Your account is now active. You may close this window.",
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error(
        "Verification link expired. Please log in to request a new one."
      );
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid verification link.");
    }
    throw error;
  }
};
