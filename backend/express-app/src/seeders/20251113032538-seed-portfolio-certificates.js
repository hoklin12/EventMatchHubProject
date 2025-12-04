"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Helper function to create the link object
    const createLink = (portfolioId, certificateId) => ({
      portfolio_id: portfolioId,
      certificate_id: certificateId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert("Portfolio_Certificates", [
      // Link 1
      createLink(
        "dc574496-ff1c-4bb2-aca4-652ed7d6c524",
        "02a98e3f-6c97-4887-b1d9-3b32333d70c6"
      ),

      // Link 2
      createLink(
        "e4149667-f494-4e45-b72a-a0de408ee4d7",
        "30bba404-e83c-44d6-8fec-499e72b97374"
      ),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Portfolio_Certificates", null, {});
  },
};
