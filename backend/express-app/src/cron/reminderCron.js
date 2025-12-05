const cron = require("node-cron");
const { sendUpcomingEventReminders } = require("../services/reminderService");
const {
  autoCheckPaymentStatus,
  autoCheckExpiredSubscriptions,
} = require("../services/bakongApiService");

// Schedule a daily job at 8:00 AM to send event reminders ("0 8 * * *", async () => {})

// Run every 60 minutes
const eventReminderJob = cron.schedule(
  "*/60 * * * *",
  async () => {
    console.log("Reminder check completed at", new Date());
    try {
      await sendUpcomingEventReminders();
    } catch (err) {
      console.error("CRON ERROR: Event Reminder:", err);
    }
  },
  { scheduled: false }
); // Set to false initially

// const intervalId = setInterval(async () => {
//   try {
//     await sendUpcomingEventReminders();
//     console.log("Reminder check completed at", new Date());
//   } catch (err) {
//     console.error("Error running reminder check:", err);
//   }
// }, 10 * 1000);

// Run every 10 minutes
const autoCheckPayment = cron.schedule(
  "*/10 * * * *",
  async () => {
    try {
      await autoCheckPaymentStatus();
      console.log("Payment status check completed at", new Date());
    } catch (err) {
      console.error("Error running payment status check:", err);
    }
  },
  { scheduled: false }
); // Set to false initially

// Check for expired subscriptions every day at midnight
// "0 0 * * *"
const autoCheckExpiredSubscriptionsJob = cron.schedule(
  "0 0 * * *",
  async () => {
    try {
      await autoCheckExpiredSubscriptions();
      console.log("Expired subscription check completed at", new Date());
    } catch (err) {
      console.error("Error running expired subscription check:", err);
    }
  },
  { scheduled: false }
); // Set to false initially

const startAllCronJobs = () => {
  eventReminderJob.start();
  autoCheckPayment.start();
  autoCheckExpiredSubscriptionsJob.start();
};

module.exports = { startAllCronJobs };
