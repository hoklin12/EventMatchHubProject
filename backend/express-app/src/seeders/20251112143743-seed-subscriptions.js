"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Subscriptions", [
      {
        subscription_id: "2056dd52-23f0-4c77-b732-b62c8ce1080a",
        transaction_id: "b5c74ecd-dd3c-4af7-affd-11f396cb3de8",
        user_id: "101d0a11-80cc-4c95-ba41-75a4f27b6d11",
        status: "active",
        starts_at: new Date(),
        expires_at: new Date(
          new Date(new Date().setMonth(new Date().getMonth() + 1))
        ), // 1 year later
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        subscription_id: "2cc41be8-6b93-438b-b785-11f67a051d5b",
        transaction_id: "b93b08ea-bcf5-406e-b8d3-52be3b3a7b80",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        status: "expired",
        starts_at: new Date(),
        expires_at: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month later
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subscriptions", null, {});
  },
};
