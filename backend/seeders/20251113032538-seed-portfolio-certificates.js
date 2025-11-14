"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Portfolio_Certificates",
      [
        {
          portfolio_id: "dc574496-ff1c-4bb2-aca4-652ed7d6c524",
          certificate_id: "02a98e3f-6c97-4887-b1d9-3b32333d70c6",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          portfolio_id: "e4149667-f494-4e45-b72a-a0de408ee4d7",
          certificate_id: "30bba404-e83c-44d6-8fec-499e72b97374",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Portfolio_Certificates", null, {});
  },
};
