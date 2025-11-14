"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Certificates",
      [
        {
          certificate_id: "02a98e3f-6c97-4887-b1d9-3b32333d70c6",
          event_id: "7399c126-69d2-4f14-804a-22c663d5d407",
          user_id: "7bc50b5b-05ce-4f13-bba9-64473878ac16",
          title: "Certificate of Participation - Annual Tech Conference 2025",
          description:
            "This certificate is awarded to Alice Nguyen for participating in the Annual Tech Conference 2025 held at Phnom Penh Convention Center.",
          issued_date: new Date("2025-08-15"),
          expiration_duration: 24,
          verification_code: "EMH-2025-B7XJ8D9F",
          verification_hash:
            "e9ea3670c6cb0846083b19c2d5e09a00b6d3192a6656c00d5ac1681d5a8ac65e",
          file_link:
            "https://example.com/certificates/02a98e3f-6c97-4887-b1d9-3b32333d70c6.pdf",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          certificate_id: "30bba404-e83c-44d6-8fec-499e72b97374",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          user_id: "3c8db38d-9cc4-455b-bd24-60bfd9583087",
          title: "Certificate of Participation - Full-Stack Developer Workshop",
          description:
            "This certificate is awarded to Michael Chen for participating in the Full-Stack Developer Workshop held at TechLab Cambodia.",
          issued_date: new Date("2025-08-15"),
          expiration_duration: 24,
          verification_code: "EMH-2025-B7XJ8D9D",
          verification_hash:
            "e9ea3670c6cb0846083b19c2d5e09a00b6d3192a6656c00d5ac1681d5a8ac65e",
          file_link:
            "https://example.com/certificates/02a98e3f-6c97-4887-b1d9-3b32333d70c6.pdf",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Certificates", null, {});
  },
};
