"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "User_Roles",
      [
        {
          user_id: "7bc50b5b-05ce-4f13-bba9-64473878ac16", // Alice Nguyen
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "3c8db38d-9cc4-455b-bd24-60bfd9583087", // Michael Chen
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "0a8ed84f-4141-4c82-b68e-1c295845c9a1", // Sophea Lim
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "cd110769-3a7f-4fad-9461-d80e4342d950", // David Kim
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "101d0a11-80cc-4c95-ba41-75a4f27b6d11", // Maria Lopez
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486", // Kao Vichet
          role_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User_Roles", null, {});
  },
};
