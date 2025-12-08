const authService = require("../services/authService"); // Assuming this is correct
const models = require("../models");

// --- 1. Helper for quick HTML response ---
function simpleHtmlResponse(isSuccess, title, message) {
  const color = isSuccess ? "#4CAF50" : "#F44336";
  return `
        <!DOCTYPE html>
        <html>
        <head><title>${title}</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 50px;">
            <div style="max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-top: 5px solid ${color};">
                <h1 style="color: ${color};">${title}</h1>
                <p>${message}</p>
                <p style="margin-top: 25px; color: #777;">Thank you for using Event Match Hub.</p>
            </div>
        </body>
        </html>
    `;
}
// --------------------------------------------------------------------------

// Export the necessary utilities
module.exports = {
  simpleHtmlResponse,
};
