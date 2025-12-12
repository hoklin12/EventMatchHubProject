"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Helper function
    const createLink = (userId, roleId) => ({
      user_id: userId,
      role_id: roleId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert("User_Roles", [
      // ==========================
      // ROLE ID 1 (e.g., User/Member)
      // ==========================
      createLink("7bc50b5b-05ce-4f13-bba9-64473878ac16", 1), // Alice Nguyen
      createLink("3c8db38d-9cc4-455b-bd24-60bfd9583087", 1), // Michael Chen
      createLink("0a8ed84f-4141-4c82-b68e-1c295845c9a1", 1), // Sophea Lim
      createLink("cd110769-3a7f-4fad-9461-d80e4342d950", 1), // David Kim
      createLink("8fa18b42-d2d4-47d6-8bc7-25e648cabbc7", 1), // Emily Carter
      createLink("91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0", 1), // John Peterson
      createLink("b4db6d88-be03-4c5b-8119-5d4c44f13c7c", 1), // Nary Sok
      createLink("c27f1a66-11f4-4b5d-a879-9270cb44e5ff", 1), // Jason Morales

      // ==========================
      // ROLE ID 2 (e.g., Admin/Organizer)
      // ==========================
      createLink("101d0a11-80cc-4c95-ba41-75a4f27b6d11", 2), // Maria Lopez
      createLink("e57a5708-5b21-4a82-abd4-a4a4ac682486", 2), // Kao Vichet
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User_Roles", null, {});
  },
};
