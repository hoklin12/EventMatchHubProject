"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Plan_Transactions", [
      {
        transaction_id: "b5c74ecd-dd3c-4af7-affd-11f396cb3de8",
        method_id: "f945099a-f606-42d6-9ef8-fa5034fec61c",
        user_id: "101d0a11-80cc-4c95-ba41-75a4f27b6d11",
        plan_id: "fa846b73-58a0-4fa3-9f1a-8475ee5da1a2",
        transactionMD5: "0dbe08d3829a8b6b59844e51aa38a4e2",
        status: "completed",
        externalRef: "100FT36154647953",
        transaction_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        transaction_id: "b93b08ea-bcf5-406e-b8d3-52be3b3a7b80",
        method_id: "a22329e6-e08e-41a7-81e2-332b379b1093",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        plan_id: "8c414757-0ce6-4f0d-89e4-97cb9746446e",
        transactionMD5: "7b0e5c36486d7155eb3ee94997fe9bfb",
        status: "failed",
        transaction_date: new Date(),
        failReason: "Insufficient funds",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Plan_Transactions", null, {});
  },
};
