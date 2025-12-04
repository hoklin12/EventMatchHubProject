const cron = require("node-cron");
const { sendUpcomingEventReminders } = require("../services/reminderService");

// Runs every 60 minutes
cron.schedule("*/60 * * * *", async () => {
  try {
    await sendUpcomingEventReminders();
    console.log("Reminder check completed at", new Date());
  } catch (err) {
    console.error("Error running reminder cron:", err);
  }
});

// For testing purposes, run every 10 seconds
// setInterval(async () => {
//   try {
//     await sendUpcomingEventReminders();
//     console.log("Reminder check completed at", new Date());
//   } catch (err) {
//     console.error("Error running reminder check:", err);
//   }
// }, 10 * 1000);
