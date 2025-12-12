const models = require("../models");

const checkUserPlanUtils = async function (userID) {
  try {
    const user = await models.User.findByPk(userID);
    switch (user.plan.toUpperCase()) {
      case "BASIC":
        return "fa846b73-58a0-4fa3-9f1a-8475ee5da1a2"; // Basic feature ID
      case "PREMIUM":
        return "8c414757-0ce6-4f0d-89e4-97cb9746446e"; // Premium feature ID
      case "ENTERPRISE":
        return "8512e6f3-2bb2-4b9a-9af1-d967d5ffbdf1"; // Enterprise feature ID
      default:
        return "fa846b73-58a0-4fa3-9f1a-8475ee5da1a2"; // Default to Basic feature ID
    }
  } catch (error) {
    console.error("Error checking user plan:", error);
    throw error;
  }
};

module.exports = { checkUserPlanUtils };
