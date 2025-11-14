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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Registrations", null, {});
  },
};
