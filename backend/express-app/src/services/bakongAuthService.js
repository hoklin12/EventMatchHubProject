const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.BAKONG_BASE_URL;

// IMPORTANT: These should be pre-populated in your .env after manual verification.
let currentToken = process.env.BAKONG_ACCESS_TOKEN;
let registeredEmail = process.env.BAKONG_EMAIL;
let tokenExpiry = new Date(process.env.BAKONG_TOKEN_EXPIRY || 0); // Default to expired

/**
 * Calls the /v1/renew_token API to refresh the access token.
 */
const renewToken = async () => {
  try {
    if (!registeredEmail) {
      throw new Error("BAKONG_EMAIL is missing in .env. Cannot renew token.");
    }

    const response = await axios.post(`${BASE_URL}/v1/renew_token`, {
      email: registeredEmail,
    });

    if (response.data.responseCode !== 0) {
      throw new Error(`Bakong Renew Failed: ${response.data.responseMessage}`);
    }

    const newToken = response.data.data.token;

    // **NOTE:** Since the API doesn't return expiry time, the expiry must be parsed
    // from the JWT payload (the 'exp' claim).
    // For the capstone, we assume the token is valid for 90 days (as per old docs)
    // or rely on a simple try/catch on failure.

    currentToken = newToken;
    // In a real app, you would parse the JWT for 'exp' claim, but here we estimate
    tokenExpiry = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    console.log("✅ Bakong Token Renewed Successfully.");
    return currentToken;
  } catch (error) {
    console.error(
      "Bakong Token Renewal Failed:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Critical: Failed to renew Bakong access token.");
  }
};

/**
 * Gets the current token, renewing it if necessary (based on a simple expiry check).
 */
const getAccessToken = async () => {
  // Check if token is within 24 hours of expiry or is missing
  const gracePeriod = 24 * 60 * 60 * 1000;

  if (!currentToken || tokenExpiry < new Date(Date.now() + gracePeriod)) {
    console.log("Bakong token near expiry/missing. Attempting renewal...");
    // Renew the token before proceeding
    return await renewToken();
  }
  return currentToken;
};

module.exports = { getAccessToken };
