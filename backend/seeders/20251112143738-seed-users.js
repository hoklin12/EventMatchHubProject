// Password 'password123'

"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_id: "7bc50b5b-05ce-4f13-bba9-64473878ac16",
          full_name: "Alice Nguyen",
          email: "alice.nguyen@brightlabs.com",
          password_hash: hashedPassword,
          organization_name: "BrightLabs Co.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "3c8db38d-9cc4-455b-bd24-60bfd9583087",
          full_name: "Michael Chen",
          email: "michael.chen@futuretech.io",
          password_hash: hashedPassword,
          organization_name: "FutureTech Solutions",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "0a8ed84f-4141-4c82-b68e-1c295845c9a1",
          full_name: "Sophea Lim",
          email: "sophea.lim@aquaideas.org",
          password_hash: hashedPassword,
          organization_name: "AquaIdeas Foundation",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "cd110769-3a7f-4fad-9461-d80e4342d950",
          full_name: "David Kim",
          email: "david.kim@innovasia.tech",
          password_hash: hashedPassword,
          organization_name: "InnovAsia Technologies",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "101d0a11-80cc-4c95-ba41-75a4f27b6d11",
          full_name: "Maria Lopez",
          email: "maria.lopez@greenpulse.org",
          password_hash: hashedPassword,
          organization_name: "GreenPulse Initiative",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486",
          full_name: "Kao Vichet",
          email: "kaovichet@gmail.com",
          password_hash: hashedPassword,
          organization_name: "Specter Coding",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
