"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Registrations",
      [
        {
          registration_id: "808c33f2-0de2-44eb-9915-78910500ada3",
          applicationform_id: "f11e4d76-1172-49cd-b8d2-5421a7c33048",
          event_id: "cd110769-3a7f-4fad-9461-d80e4342d950",
          status: "approved",
          registration_date: new Date("2025-05-01T10:00:00"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "fc13eeda-86cc-4e88-8382-8af6b0cd5799",
          applicationform_id: "c9bc1a14-9b1d-4388-9e8a-eebb8361413c",
          event_id: "79c4a02d-5f8c-4793-9983-04b7ff123dda",
          status: "approved",
          registration_date: new Date("2025-05-01T10:00:00"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "ff4a3e23-b33e-4259-88da-7cd5d6e04a93",
          applicationform_id: "1f80b8bd-87ee-416e-a184-758a33960eed",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          status: "approved",
          registration_date: new Date("2025-05-01T10:00:00"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "3df7594f-7ef6-4da1-a5fe-2e17173ee9d5",
          applicationform_id: "7dce57c8-5ce0-4a28-8033-0846f2b3de8c",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          status: "approved",
          registration_date: new Date("2025-05-01T10:00:00"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "2fab8f25-c42d-4b6f-be68-ce8f6f8fabfc",
          applicationform_id: "071d8c75-f1ce-4831-8691-7221509f6d24",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          status: "approved",
          registration_date: new Date("2025-05-01T10:00:00"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_id: "4c615f19-b029-4ad8-af4b-627babc6d5b5",
          applicationform_id: "1bc8c60a-6410-425d-9e16-8c681a6732fd",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          status: "rejected",
          registration_date: new Date("2025-05-01T10:00:00"),
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
