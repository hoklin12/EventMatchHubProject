"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Payment_Methods", [
      {
        method_id: "0b7aee6b-efff-4a82-b330-4b34d1a43e66",
        method_name: "Credit Card",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        method_id: "a22329e6-e08e-41a7-81e2-332b379b1093",
        method_name: "ABA Payway",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        method_id: "f945099a-f606-42d6-9ef8-fa5034fec61c",
        method_name: "KHQR",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payment_Methods", null, {});
  },
};
