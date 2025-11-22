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
        {
          user_id: "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
          full_name: "Emily Carter",
          email: "emily.carter@learnhub.edu",
          password_hash: hashedPassword,
          organization_name: "LearnHub Academy",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0",
          full_name: "John Peterson",
          email: "john.peterson@crownbiz.com",
          password_hash: hashedPassword,
          organization_name: "CrownBiz Corporation",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "b4db6d88-be03-4c5b-8119-5d4c44f13c7c",
          full_name: "Nary Sok",
          email: "nary.sok@khmerdigital.org",
          password_hash: hashedPassword,
          organization_name: "Khmer Digital Center",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "c27f1a66-11f4-4b5d-a879-9270cb44e5ff",
          full_name: "Jason Morales",
          email: "jason.morales@techforward.io",
          password_hash: hashedPassword,
          organization_name: "TechForward Labs",
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
