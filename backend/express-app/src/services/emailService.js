const transporter = require("../utils/email");
const marked = require("marked");

exports.sendEmail = async (to, subject, body) => {
  try {
    if (!body) {
      console.warn("Email body is undefined. Skipping sending email.");
      return; // Exit early if no content
    }

    const textData = body.replace(/\n/g, "\n\n");
    const htmlContent = marked.parse(textData);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}!`);
  } catch (error) {
    console.error("Email error:", error);
  }
};
