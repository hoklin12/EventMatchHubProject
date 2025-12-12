"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Plans", [
      {
        plan_id: "fa846b73-58a0-4fa3-9f1a-8475ee5da1a2",
        plan_name: "Basic Plan",
        price: 0.0,
        currency: "USD",
        duration_in_months: 1,
        participant_limit: 50,
        is_unlimited: false,
        allow_ai_reminders: false,
        allow_event_payments: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        plan_id: "8c414757-0ce6-4f0d-89e4-97cb9746446e",
        plan_name: "Premium Plan",
        price: 1.99,
        currency: "USD",
        duration_in_months: 1,
        participant_limit: 250,
        is_unlimited: false,
        allow_ai_reminders: true,
        allow_event_payments: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        plan_id: "8512e6f3-2bb2-4b9a-9af1-d967d5ffbdf1",
        plan_name: "Enterprise Plan",
        price: 4.99,
        currency: "USD",
        duration_in_months: 1,
        participant_limit: 0,
        is_unlimited: true,
        allow_ai_reminders: true,
        allow_event_payments: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Plans", null, {});
  },
};
