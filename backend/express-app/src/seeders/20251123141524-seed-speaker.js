"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Speakers",
      [
        {
          speaker_id: "47cec5e1-2f53-4d6c-8495-38376550dbf4",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          order: 1,
          speaker_name: "John Doe",
          title: "Keynote Speaker",
          description: "An expert in the field of technology and innovation.",
          photo_url: "https://example.com/photos/johndoe.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          speaker_id: "db0f20d2-b1f1-4727-b76d-41f86eb4454e",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          order: 2,
          speaker_name: "Jane Smith",
          title: "Guest Lecturer",
          description:
            "Renowned author and speaker on leadership and management.",
          photo_url: "https://example.com/photos/janesmith.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          speaker_id: "d0106113-3267-4546-a2ef-4b4cd28669ec",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          order: 3,
          speaker_name: "Alice Johnson",
          title: "Panelist",
          description:
            "Industry leader with over 20 years of experience in finance.",
          photo_url: "https://example.com/photos/alicejohnson.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          speaker_id: "c95c56d7-29fa-4ae1-a72c-77eae5362de0",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          order: 4,
          speaker_name: "Bob Brown",
          title: "Workshop Facilitator",
          description:
            "Experienced trainer specializing in team building and communication.",
          photo_url: "https://example.com/photos/bobbrown.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          speaker_id: "72343946-44b3-48e6-b1de-54f84f65bdbc",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          order: 5,
          speaker_name: "Carol White",
          title: "Technical Expert",
          description:
            "Specialist in full-stack development and cloud computing.",
          photo_url: "https://example.com/photos/carolwhite.jpg",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Speakers", null, {});
  },
};
