"use strict";
const models = require("../../models");

// NOTE: We assume 'res' is available in the context where the controller calls this,
// OR that we modify the controller call signature.
// Since we can't access 'res' globally, we must pass it in.

const checkUserRoleOrganizer = async function (user, res) {
  // <-- Added 'res'
  //Check User is Organizer
  const organizerId = await models.Role.findOne({
    where: { role_name: "organizer" },
    attributes: ["role_id"],
  });
  const isOrganizerRole = await models.UserRoles.findOne({
    where: {
      user_id: user.userId,
      role_id: organizerId.role_id,
    },
  });
  if (!isOrganizerRole) {
    // Return the response directly if the check fails
    return res.status(403).json({
      // Changed status to 403 (Forbidden)
      status: "fail",
      message: "User is not an organizer.",
    });
  }
  // Return nothing/null if successful, so controller knows to proceed
};

const checkUserRoleParticipant = async function (user, res) {
  // <-- Added 'res'
  //Check User is Participant
  const participantRoleId = await models.Role.findOne({
    where: { role_name: "participant" },
    attributes: ["role_id"],
  });
  const isParticipantRole = await models.UserRoles.findOne({
    where: {
      user_id: user.userId,
      role_id: participantRoleId.role_id,
    },
  });
  if (!isParticipantRole) {
    // Return the response directly if the check fails
    return res.status(403).json({
      // Changed status to 403 (Forbidden)
      status: "fail",
      message: "User is not a participant.", // Corrected message
    });
  }
};

// Exporting an object containing both functions
module.exports = {
  checkUserRoleOrganizer,
  checkUserRoleParticipant,
};
