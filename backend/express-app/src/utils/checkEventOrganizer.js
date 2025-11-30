"use strict";
const models = require("../models");

const checkEventOrganizer = async function (userId, eventId) {
  const event = await models.Event.findByPk(eventId);
  if (!event || event.user_id !== userId) {
    return false;
  }
};

module.exports = { checkEventOrganizer };
