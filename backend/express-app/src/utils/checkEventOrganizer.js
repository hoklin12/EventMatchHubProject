"use strict";
const models = require("../models");

const checkEventOrganizer = async function (userId, eventId) {
  const event = await models.Event.findOne({
    where: { event_id: eventId, user_id: userId },
  });
  if (event) {
    return false;
  }
  return true;
};

module.exports = { checkEventOrganizer };
