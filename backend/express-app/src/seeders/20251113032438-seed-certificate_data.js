"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CertificateDatas",
      [
        {
          certificatedata_id: "b3ad8236-e60d-4313-9862-0fd665134243",
          event_id: "7399c126-69d2-4f14-804a-22c663d5d407",
          template_id: "b2t48i8-4e6b-4f8a-hs52-1b2e3f4a5b6c",
          organizer_name:
            "Certificate of Participation - Annual Tech Conference 2025",
          description:
            "This certificate is awarded to Alice Nguyen for participating in the Annual Tech Conference 2025 held at Phnom Penh Convention Center.",
          issued_date: new Date("2025-08-15"),
          expiration_duration: 24,
          organizer_director_name: "Kao Vichet",
          organizer_role: "Director",
          signature_url:
            "https://e7.pngegg.com/pngimages/923/614/png-clipart-digital-signature-signature-block-signatures-angle-material-thumbnail.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          certificatedata_id: "939dca86-e2a0-43ff-8b07-e9195c0c029f",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          template_id: "ad0a3158-ad37-43b3-92a6-fb301b15bd36",
          organizer_name:
            "Certificate of Participation - Full-Stack Developer Workshop",
          description:
            "This certificate is awarded to Michael Chen for participating in the Full-Stack Developer Workshop held at TechLab Cambodia.",
          issued_date: new Date("2025-08-15"),
          expiration_duration: 24,
          organizer_director_name: "Kao Vichet",
          organizer_role: "Director",
          signature_url:
            "https://e7.pngegg.com/pngimages/923/614/png-clipart-digital-signature-signature-block-signatures-angle-material-thumbnail.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CertificateDatas", null, {});
  },
};
