"use strict";
const models = require("../../models");

// NOTE: We assume 'res' is available in the context where the controller calls this,
// OR that we modify the controller call signature.
// Since we can't access 'res' globally, we must pass it in.

const checkUserRoleOrganizer = async function (userID) {
  //Check User is Organizer
  const organizerId = await models.Role.findOne({
    where: { role_name: "organizer" },
    attributes: ["role_id"],
  });
  const isOrganizerRole = await models.UserRoles.findOne({
    where: {
      user_id: userID,
      role_id: organizerId.role_id,
    },
  });
  if (!isOrganizerRole) {
    return false;
  }
};

const checkUserRoleParticipant = async function (userID) {
  //Check User is Participant
  const participantRoleId = await models.Role.findOne({
    where: { role_name: "participant" },
    attributes: ["role_id"],
  });
  const isParticipantRole = await models.UserRoles.findOne({
    where: {
      user_id: userID,
      role_id: participantRoleId.role_id,
    },
  });
  if (!isParticipantRole) {
    return false;
  }
};

// Exporting an object containing both functions
module.exports = {
  checkUserRoleOrganizer,
  checkUserRoleParticipant,
};
