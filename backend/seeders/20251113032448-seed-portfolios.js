"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Portfolios",
      [
        {
          portfolio_id: "dc574496-ff1c-4bb2-aca4-652ed7d6c524",
          portfolio_items_id: 1,
          user_id: "7bc50b5b-05ce-4f13-bba9-64473878ac16",
          title: "Sample Portfolio Item",
          description: "This is a sample portfolio item for seeding purposes.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          portfolio_id: "e4149667-f494-4e45-b72a-a0de408ee4d7",
          portfolio_items_id: 1,
          user_id: "3c8db38d-9cc4-455b-bd24-60bfd9583087",
          title: "Another Portfolio Item",
          description:
            "This is another sample portfolio item for seeding purposes.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Portfolios", null, {});
  },
};
