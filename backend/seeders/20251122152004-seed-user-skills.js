"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const createLink = (userId, skillId) => ({
      user_id: userId,
      skill_id: skillId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert("User_Skills", [
      // ============================================================
      // 1. Alice Nguyen (BrightLabs Co.) - Full Stack Developer
      // ID: 7bc50b5b-05ce-4f13-bba9-64473878ac16
      // ============================================================
      createLink(
        "7bc50b5b-05ce-4f13-bba9-64473878ac16",
        "b3e0cf32-5ffc-458a-9b03-f345725aee00"
      ), // JavaScript
      createLink(
        "7bc50b5b-05ce-4f13-bba9-64473878ac16",
        "6f4ec8ea-3f38-4b93-b435-3d15292373ce"
      ), // React
      createLink(
        "7bc50b5b-05ce-4f13-bba9-64473878ac16",
        "130be34c-91ab-4a20-bd5c-a070e55dfcba"
      ), // Node.js
      createLink(
        "7bc50b5b-05ce-4f13-bba9-64473878ac16",
        "816eb526-20f1-4e00-a595-dae1d4f0584a"
      ), // MongoDB

      // ============================================================
      // 2. Michael Chen (FutureTech Solutions) - Backend/Cloud Eng
      // ID: 3c8db38d-9cc4-455b-bd24-60bfd9583087
      // ============================================================
      createLink(
        "3c8db38d-9cc4-455b-bd24-60bfd9583087",
        "723ac71f-cb8d-470b-9471-ce6d0ec23f01"
      ), // Java
      createLink(
        "3c8db38d-9cc4-455b-bd24-60bfd9583087",
        "1d169a2f-0e5a-486f-ac57-24a700af192b"
      ), // Go
      createLink(
        "3c8db38d-9cc4-455b-bd24-60bfd9583087",
        "b522f44e-1c29-4c8f-bf57-879f926b8c71"
      ), // AWS
      createLink(
        "3c8db38d-9cc4-455b-bd24-60bfd9583087",
        "8dc7c15d-0bfe-4d8f-96a9-1888d7f51de7"
      ), // PostgreSQL

      // ============================================================
      // 3. Sophea Lim (AquaIdeas Foundation) - Creative/Designer
      // ID: 0a8ed84f-4141-4c82-b68e-1c295845c9a1
      // ============================================================
      createLink(
        "0a8ed84f-4141-4c82-b68e-1c295845c9a1",
        "da7a21e4-8536-4a3e-8d5e-e7e30f501a33"
      ), // UI/UX Design
      createLink(
        "0a8ed84f-4141-4c82-b68e-1c295845c9a1",
        "6b4ff27d-3b40-4bb8-9dbe-6e00f0ca2805"
      ), // Figma
      createLink(
        "0a8ed84f-4141-4c82-b68e-1c295845c9a1",
        "35fc884f-605a-4c04-93e7-138b061589ea"
      ), // CSS
      createLink(
        "0a8ed84f-4141-4c82-b68e-1c295845c9a1",
        "dd244a9b-6d33-430e-86a0-8db679d4f265"
      ), // Communication

      // ============================================================
      // 4. David Kim (InnovAsia Technologies) - AI Engineer
      // ID: cd110769-3a7f-4fad-9461-d80e4342d950
      // ============================================================
      createLink(
        "cd110769-3a7f-4fad-9461-d80e4342d950",
        "ae99efc9-7aa5-4f97-9ca2-f5f7da76bf49"
      ), // Python
      createLink(
        "cd110769-3a7f-4fad-9461-d80e4342d950",
        "7ad73302-74da-4bfb-b3e5-fb80d728c3b8"
      ), // Machine Learning
      createLink(
        "cd110769-3a7f-4fad-9461-d80e4342d950",
        "3fd6f4c6-2e68-4fe7-9a73-44ebcbb7a0fc"
      ), // TensorFlow
      createLink(
        "cd110769-3a7f-4fad-9461-d80e4342d950",
        "2c9e3c55-6ca4-4fd7-a7db-df892d7b9cf5"
      ), // PyTorch

      // ============================================================
      // 5. Maria Lopez (GreenPulse Initiative) - Project Manager
      // ID: 101d0a11-80cc-4c95-ba41-75a4f27b6d11
      // ============================================================
      createLink(
        "101d0a11-80cc-4c95-ba41-75a4f27b6d11",
        "fd139cf4-c70b-497c-bd3f-10f41740d6b2"
      ), // Project Management
      createLink(
        "101d0a11-80cc-4c95-ba41-75a4f27b6d11",
        "af2e10bd-8eed-40b6-af28-071bb7c919e9"
      ), // Leadership
      createLink(
        "101d0a11-80cc-4c95-ba41-75a4f27b6d11",
        "2d195436-568c-4a31-9851-79e4d00b59e5"
      ), // Social Media Marketing

      // ============================================================
      // 6. Kao Vichet (Specter Coding) - Mobile Developer
      // ID: e57a5708-5b21-4a82-abd4-a4a4ac682486
      // ============================================================
      createLink(
        "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        "09440850-fe75-4f82-83c9-d070737c1d8c"
      ), // Flutter
      createLink(
        "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        "3e421143-b6c8-4f34-a96d-bd98a524c6ce"
      ), // React Native
      createLink(
        "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        "1cee21b0-2915-48ec-9ecf-cfe5039e8b65"
      ), // C#

      // ============================================================
      // 7. Emily Carter (LearnHub Academy) - Education/Soft Skills
      // ID: 8fa18b42-d2d4-47d6-8bc7-25e648cabbc7
      // ============================================================
      createLink(
        "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
        "0859ec81-37cc-402b-a1e1-6dc84743a435"
      ), // Public Speaking
      createLink(
        "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
        "dd244a9b-6d33-430e-86a0-8db679d4f265"
      ), // Communication
      createLink(
        "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
        "ae99efc9-7aa5-4f97-9ca2-f5f7da76bf49"
      ), // Python (Education)

      // ============================================================
      // 8. John Peterson (CrownBiz) - Business Analyst
      // ID: 91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0
      // ============================================================
      createLink(
        "91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0",
        "9cf413c6-1e7e-4b52-b92c-b0e8ccfeee28"
      ), // Business Analysis
      createLink(
        "91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0",
        "2a3e8d8e-9ac5-4e05-aa7a-1db2613e3fad"
      ), // MySQL
      createLink(
        "91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0",
        "b34087b7-b167-442c-aa29-dfd8b8f55ddc"
      ), // Teamwork

      // ============================================================
      // 9. Nary Sok (Khmer Digital Center) - Web Dev/Marketing
      // ID: b4db6d88-be03-4c5b-8119-5d4c44f13c7c
      // ============================================================
      createLink(
        "b4db6d88-be03-4c5b-8119-5d4c44f13c7c",
        "dca1dc52-504c-4e66-9bfe-dcc5031cae9c"
      ), // PHP
      createLink(
        "b4db6d88-be03-4c5b-8119-5d4c44f13c7c",
        "72788445-876e-44d3-9a26-4696fb639a57"
      ), // Laravel
      createLink(
        "b4db6d88-be03-4c5b-8119-5d4c44f13c7c",
        "595e665e-992f-49a6-8610-0a62d33b6b52"
      ), // SEO

      // ============================================================
      // 10. Jason Morales (TechForward Labs) - Systems/DevOps
      // ID: c27f1a66-11f4-4b5d-a879-9270cb44e5ff
      // ============================================================
      createLink(
        "c27f1a66-11f4-4b5d-a879-9270cb44e5ff",
        "8cb072bd-7419-4506-a33a-3489593b5377"
      ), // Rust
      createLink(
        "c27f1a66-11f4-4b5d-a879-9270cb44e5ff",
        "bd52d275-f02f-43d0-ab3f-602b673dd064"
      ), // C++
      createLink(
        "c27f1a66-11f4-4b5d-a879-9270cb44e5ff",
        "9bdeee51-c190-441e-9836-ab985f870ec6"
      ), // Azure
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("User_Skills", null, {});
  },
};
