"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Registrations",
      [
        {
          registration_id: "ff4a3e23-b33e-4259-88da-7cd5d6e04a93",
          portfolio_id: "13b9c200-e5f6-4a7b-8c9d-67hsta3b4c5d",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          user_id: "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
          status: "approved",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "3df7594f-7ef6-4da1-a5fe-2e17173ee9d5",
          portfolio_id: "098jhy53-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          user_id: "91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0",
          status: "approved",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "2fab8f25-c42d-4b6f-be68-ce8f6f8fabfc",
          portfolio_id: "09kj65td-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          user_id: "b4db6d88-be03-4c5b-8119-5d4c44f13c7c",
          status: "approved",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "4c615f19-b029-4ad8-af4b-627babc6d5b5",
          portfolio_id: "0099yt43-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          user_id: "c27f1a66-11f4-4b5d-a879-9270cb44e5ff",
          status: "rejected",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Registrations", null, {});
  },
};
