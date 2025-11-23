"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Helper to create a record cleanly
    const createLink = (categoryID, skillId) => ({
      category_id: categoryID,
      skill_id: skillId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert("Category_Skills", [
      // ===============================================
      // 1. TYPE: Technology (General Tech)
      // ID: 88b86831-1b32-49aa-aa27-e6f3c7584bd9
      // ===============================================
      createLink(
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        "b3e0cf32-5ffc-458a-9b03-f345725aee00"
      ), // JavaScript
      createLink(
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        "ae99efc9-7aa5-4f97-9ca2-f5f7da76bf49"
      ), // Python
      createLink(
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        "723ac71f-cb8d-470b-9471-ce6d0ec23f01"
      ), // Java
      createLink(
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        "1d169a2f-0e5a-486f-ac57-24a700af192b"
      ), // Go
      createLink(
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        "6f4ec8ea-3f38-4b93-b435-3d15292373ce"
      ), // React
      createLink(
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        "130be34c-91ab-4a20-bd5c-a070e55dfcba"
      ), // Node.js

      // ===============================================
      // 2. TYPE: AI & Machine Learning
      // ID: 07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe
      // ===============================================
      createLink(
        "07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe",
        "ae99efc9-7aa5-4f97-9ca2-f5f7da76bf49"
      ), // Python
      createLink(
        "07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe",
        "7ad73302-74da-4bfb-b3e5-fb80d728c3b8"
      ), // Machine Learning
      createLink(
        "07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe",
        "cb61db47-f479-4769-b6d7-bcb0a3e2ee44"
      ), // Deep Learning
      createLink(
        "07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe",
        "3fd6f4c6-2e68-4fe7-9a73-44ebcbb7a0fc"
      ), // TensorFlow

      // ===============================================
      // 3. TYPE: Cloud & DevOps
      // ID: ea374522-fa9e-4aa9-a6d1-90268bff0c53
      // ===============================================
      createLink(
        "ea374522-fa9e-4aa9-a6d1-90268bff0c53",
        "b522f44e-1c29-4c8f-bf57-879f926b8c71"
      ), // AWS
      createLink(
        "ea374522-fa9e-4aa9-a6d1-90268bff0c53",
        "9bdeee51-c190-441e-9836-ab985f870ec6"
      ), // Azure
      createLink(
        "ea374522-fa9e-4aa9-a6d1-90268bff0c53",
        "b4aa87e8-8180-4fd7-a7f0-7b7fbfc4a146"
      ), // Google Cloud

      // ===============================================
      // 4. TYPE: Art & Design
      // ID: 121fcb02-2760-43b6-8242-db636a4ede92
      // ===============================================
      createLink(
        "121fcb02-2760-43b6-8242-db636a4ede92",
        "da7a21e4-8536-4a3e-8d5e-e7e30f501a33"
      ), // UI/UX Design
      createLink(
        "121fcb02-2760-43b6-8242-db636a4ede92",
        "6b4ff27d-3b40-4bb8-9dbe-6e00f0ca2805"
      ), // Figma
      createLink(
        "121fcb02-2760-43b6-8242-db636a4ede92",
        "35fc884f-605a-4c04-93e7-138b061589ea"
      ), // CSS

      // ===============================================
      // 5. TYPE: Business & Management
      // ID: dfc97397-7b4e-4e6b-9df8-885972b2bc79
      // ===============================================
      createLink(
        "dfc97397-7b4e-4e6b-9df8-885972b2bc79",
        "fd139cf4-c70b-497c-bd3f-10f41740d6b2"
      ), // Project Management
      createLink(
        "dfc97397-7b4e-4e6b-9df8-885972b2bc79",
        "9cf413c6-1e7e-4b52-b92c-b0e8ccfeee28"
      ), // Business Analysis
      createLink(
        "dfc97397-7b4e-4e6b-9df8-885972b2bc79",
        "af2e10bd-8eed-40b6-af28-071bb7c919e9"
      ), // Leadership

      // ===============================================
      // 6. TYPE: Digital Marketing
      // ID: 4ad24a24-bcdd-4dc0-a4d2-3496bccd2e68
      // ===============================================
      createLink(
        "4ad24a24-bcdd-4dc0-a4d2-3496bccd2e68",
        "595e665e-992f-49a6-8610-0a62d33b6b52"
      ), // SEO
      createLink(
        "4ad24a24-bcdd-4dc0-a4d2-3496bccd2e68",
        "2d195436-568c-4a31-9851-79e4d00b59e5"
      ), // Social Media Marketing

      // ===============================================
      // 7. TYPE: Engineering & Robotics
      // ID: f650aa26-b68a-4e04-9e6e-f8f1db25a0ee
      // ===============================================
      createLink(
        "f650aa26-b68a-4e04-9e6e-f8f1db25a0ee",
        "bd52d275-f02f-43d0-ab3f-602b673dd064"
      ), // C++
      createLink(
        "f650aa26-b68a-4e04-9e6e-f8f1db25a0ee",
        "8cb072bd-7419-4506-a33a-3489593b5377"
      ), // Rust
      createLink(
        "f650aa26-b68a-4e04-9e6e-f8f1db25a0ee",
        "ae99efc9-7aa5-4f97-9ca2-f5f7da76bf49"
      ), // Python

      // ===============================================
      // 8. TYPE: Career Development
      // ID: ec45e1c8-1479-4ba3-8405-09776d19f7e6
      // ===============================================
      createLink(
        "ec45e1c8-1479-4ba3-8405-09776d19f7e6",
        "dd244a9b-6d33-430e-86a0-8db679d4f265"
      ), // Communication
      createLink(
        "ec45e1c8-1479-4ba3-8405-09776d19f7e6",
        "0859ec81-37cc-402b-a1e1-6dc84743a435"
      ), // Public Speaking

      // ===============================================
      // 9. TYPE: Human Resources
      // ID: c6d7e8f9-0a12-4b3c-9d4e-5f6a7b8c9d0e
      // ===============================================
      createLink(
        "c6d7e8f9-0a12-4b3c-9d4e-5f6a7b8c9d0e",
        "dd244a9b-6d33-430e-86a0-8db679d4f265"
      ), // Communication
      createLink(
        "c6d7e8f9-0a12-4b3c-9d4e-5f6a7b8c9d0e",
        "674a48af-8cae-4502-82f4-a5d74dfa9a48"
      ), // Recruitment (NEW UUID)

      // ===============================================
      // 10. TYPE: Entrepreneurship
      // ID: f1b3e8da-2b1d-4f6f-a6e7-dcae3e7f4d44
      // ===============================================
      createLink(
        "f1b3e8da-2b1d-4f6f-a6e7-dcae3e7f4d44",
        "af2e10bd-8eed-40b6-af28-071bb7c919e9"
      ), // Leadership
      createLink(
        "f1b3e8da-2b1d-4f6f-a6e7-dcae3e7f4d44",
        "fd139cf4-c70b-497c-bd3f-10f41740d6b2"
      ), // Project Management

      // ===============================================
      // 11. TYPE: Education & Training (Previously Empty)
      // ID: fa1ad8eb-290c-4a68-a8a0-8711c93c82dc
      // ===============================================
      createLink(
        "fa1ad8eb-290c-4a68-a8a0-8711c93c82dc",
        "21a15904-33e0-4c4d-af43-17da5c43d67b"
      ), // Teaching & Mentoring (NEW UUID)
      createLink(
        "fa1ad8eb-290c-4a68-a8a0-8711c93c82dc",
        "0859ec81-37cc-402b-a1e1-6dc84743a435"
      ), // Public Speaking

      // ===============================================
      // 12. TYPE: Healthcare & Medicine (Previously Empty)
      // ID: 60ff1c79-93fb-4586-9d3b-05cf8cad5b02
      // ===============================================
      createLink(
        "60ff1c79-93fb-4586-9d3b-05cf8cad5b02",
        "59ee3002-3da4-4536-8ac8-445bebd5a518"
      ), // Patient Care (NEW UUID)
      createLink(
        "60ff1c79-93fb-4586-9d3b-05cf8cad5b02",
        "748a7f49-55ab-4bd3-9745-39000a15c1cd"
      ), // Medical Research (NEW UUID)

      // ===============================================
      // 13. TYPE: Finance & Banking (Previously Empty)
      // ID: 83a18ef8-1f4a-4410-ab30-483cab0b42d3
      // ===============================================
      createLink(
        "83a18ef8-1f4a-4410-ab30-483cab0b42d3",
        "35e1ca92-64a9-48a1-ba3c-1593e2b3f024"
      ), // Financial Analysis (NEW UUID)
      createLink(
        "83a18ef8-1f4a-4410-ab30-483cab0b42d3",
        "423b850e-9a32-4db5-ac50-250e0c4c6122"
      ), // Accounting (NEW UUID)

      // ===============================================
      // 14. TYPE: Sales & Customer Service (Previously Empty)
      // ID: 2fc64caf-e3f6-4ad9-a0ad-57a222f5a13c
      // ===============================================
      createLink(
        "2fc64caf-e3f6-4ad9-a0ad-57a222f5a13c",
        "4f2df213-2cf4-4419-9552-3b9a5daa090e"
      ), // Negotiation (NEW UUID)
      createLink(
        "2fc64caf-e3f6-4ad9-a0ad-57a222f5a13c",
        "6ccc6a91-dd32-44a6-94e0-03a5c2ac6eef"
      ), // CRM Software (NEW UUID)

      // ===============================================
      // 15. TYPE: Cybersecurity (Previously Empty)
      // ID: 21e07961-fa61-4a6d-9ee6-724a45bd53ef
      // ===============================================
      createLink(
        "21e07961-fa61-4a6d-9ee6-724a45bd53ef",
        "9b987a44-ec6e-4dad-b0af-81960ecfe33b"
      ), // Network Security (NEW UUID)
      createLink(
        "21e07961-fa61-4a6d-9ee6-724a45bd53ef",
        "3f25d7ad-a610-46ac-9a7a-f8023e855a26"
      ), // Ethical Hacking (NEW UUID)

      // ===============================================
      // 16. TYPE: Photography & Media (Previously Empty)
      // ID: c65af3cd-fe43-4fe8-a5d2-d1b8d2bb8a9a
      // ===============================================
      createLink(
        "c65af3cd-fe43-4fe8-a5d2-d1b8d2bb8a9a",
        "70f47542-7c28-4da9-ade4-de1f99c42bb1"
      ), // Photography (NEW UUID)
      createLink(
        "c65af3cd-fe43-4fe8-a5d2-d1b8d2bb8a9a",
        "5c73f096-d814-4f86-badf-8bbd4132226f"
      ), // Video Editing (NEW UUID)

      // ===============================================
      // 17. TYPE: Community & Volunteering (Previously Empty)
      // ID: ba7e8a83-bbc8-4aba-bc21-a6ff02424d34
      // ===============================================
      createLink(
        "ba7e8a83-bbc8-4aba-bc21-a6ff02424d34",
        "42380dc6-9b2a-4b76-b2ea-26b5f9b5c4a5"
      ), // Event Planning (NEW UUID)
      createLink(
        "ba7e8a83-bbc8-4aba-bc21-a6ff02424d34",
        "45d734b1-4819-4d24-a3e0-609afafb6be5"
      ), // Fundraising (NEW UUID)
      createLink(
        "ba7e8a83-bbc8-4aba-bc21-a6ff02424d34",
        "b34087b7-b167-442c-aa29-dfd8b8f55ddc"
      ), // Teamwork

      // ===============================================
      // 18. TYPE: Sports & Fitness (Previously Empty)
      // ID: d487add8-4a63-4ca6-b595-83d71ed96b95
      // ===============================================
      createLink(
        "d487add8-4a63-4ca6-b595-83d71ed96b95",
        "b34087b7-b167-442c-aa29-dfd8b8f55ddc"
      ), // Teamwork
      createLink(
        "d487add8-4a63-4ca6-b595-83d71ed96b95",
        "af2e10bd-8eed-40b6-af28-071bb7c919e9"
      ), // Leadership

      // ===============================================
      // 19. TYPE: Environment & Sustainability (Previously Empty)
      // ID: a4b2c3d4-1e5f-4b6d-8a9b-2c3d4e5f6a7b
      // ===============================================
      createLink(
        "a4b2c3d4-1e5f-4b6d-8a9b-2c3d4e5f6a7b",
        "104245bc-b199-4442-a904-b24f2613c35f"
      ), // Environmental Science (NEW UUID)
      createLink(
        "a4b2c3d4-1e5f-4b6d-8a9b-2c3d4e5f6a7b",
        "fd139cf4-c70b-497c-bd3f-10f41740d6b2"
      ), // Project Management

      // ===============================================
      // 20. TYPE: Legal & Compliance (Previously Empty)
      // ID: b5c6d7e8-9f01-4a2b-8c3d-4e5f6a7b8c9d
      // ===============================================
      createLink(
        "b5c6d7e8-9f01-4a2b-8c3d-4e5f6a7b8c9d",
        "f5a1557f-5e7f-4940-9418-896f1482f50e"
      ), // Legal Compliance (NEW UUID)
      createLink(
        "b5c6d7e8-9f01-4a2b-8c3d-4e5f6a7b8c9d",
        "dd244a9b-6d33-430e-86a0-8db679d4f265"
      ), // Communication
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.bulkDelete("Category_Skills", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};
