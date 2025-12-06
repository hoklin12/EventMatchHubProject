const models = require("../models");
const { Event } = models;
const { Op } = require("sequelize");
const { sendEmail } = require("./emailService");
const axios = require("axios");

async function sendUpcomingEventReminders() {
  const now = new Date();
  const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const events = await Event.findAll({
    where: {
      event_date: { [Op.between]: [now, next24h] },
      status: "public",
      allowRemindEmail: true,
    },
  });

  for (const event of events) {
    const registrations = await models.Registration.findAll({
      where: { event_id: event.event_id, is_reminded: false },
    });
    for (const reg of registrations) {
      if (reg.formResponseJson != null) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/gemini/generate-email",
          { formRegisterID: reg.formResponseJson }
        );

        if (
          response.data.status_code !== 200 ||
          !response.data.detail.success
        ) {
          console.error(
            `Failed to generate email content for registration_id: ${reg.registration_id}`
          );
          continue;
        }
        // Mark as sent
        reg.is_reminded = true;
        await reg.save();
        const userData = await models.User.findByPk(reg.user_id);
        const emailContent = response.data.detail.data;
        await sendEmail(
          userData.email,
          `Reminder: ${event.title} that you have registered for is starting soon!`,
          emailContent
        );
      } else {
        console.log(
          `No formResponseJson for registration_id: ${reg.registration_id}, skipping email generation.`
        );
        reg.is_reminded = true;
        await reg.save();
      }
    }
  }
}

module.exports = { sendUpcomingEventReminders };
