"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Helper to create a record cleanly
    const createLink = (typeId, skillId) => ({
      type_id: typeId,
      skill_id: skillId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert("Type_Skills", [
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
      createLink(
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        "2a3e8d8e-9ac5-4e05-aa7a-1db2613e3fad"
      ), // MySQL

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
      createLink(
        "07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe",
        "2c9e3c55-6ca4-4fd7-a7db-df892d7b9cf5"
      ), // PyTorch

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
      createLink(
        "ea374522-fa9e-4aa9-a6d1-90268bff0c53",
        "1d169a2f-0e5a-486f-ac57-24a700af192b"
      ), // Go

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
      createLink(
        "ec45e1c8-1479-4ba3-8405-09776d19f7e6",
        "22fd6343-9d22-4d65-9f34-a4a1df59baf7"
      ), // Time Management

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
        "b34087b7-b167-442c-aa29-dfd8b8f55ddc"
      ), // Teamwork

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
      createLink(
        "f1b3e8da-2b1d-4f6f-a6e7-dcae3e7f4d44",
        "22fd6343-9d22-4d65-9f34-a4a1df59baf7"
      ), // Time Management
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Type_Skills", null, {});
  },
};
