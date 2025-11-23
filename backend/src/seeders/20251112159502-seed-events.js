"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Events", [
      {
        event_id: "7399c126-69d2-4f14-804a-22c663d5d407",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        title: "Annual Tech Conference 2025",
        description:
          "A large-scale event bringing together developers, designers, and tech enthusiasts to discuss the latest trends in technology.",
        type: "conference",
        status: "upcoming",
        event_date: new Date("2025-02-15T09:00:00"),
        location: "Phnom Penh Convention Center",
        fee_amount: 25.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        user_id: "101d0a11-80cc-4c95-ba41-75a4f27b6d11",
        title: "Full-Stack Developer Workshop",
        description:
          "A 2-day hands-on coding workshop focusing on building and deploying full-stack applications using Node.js and React.",
        type: "workshop",
        status: "upcoming",
        event_date: new Date("2025-03-10T08:30:00"),
        location: "TechLab Cambodia",
        fee_amount: 10.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        event_id: "cd110769-3a7f-4fad-9461-d80e4342d950",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        title: "Innovation Hackathon 2025",
        description:
          "A 48-hour hackathon where teams collaborate to build innovative solutions to real-world problems.",
        type: "meetup",
        status: "ongoing",
        event_date: new Date("2025-05-20T07:00:00"),
        location: "National University of Management, Phnom Penh",
        fee_amount: 0.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        event_id: "79c4a02d-5f8c-4793-9983-04b7ff123dda",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486",
        title: "ACET Innovation Hackathon 2025",
        description:
          "ACET's 48-hour hackathon where teams collaborate to build innovative solutions to real-world problems.",
        type: "meetup",
        status: "ongoing",
        event_date: new Date("2025-05-20T07:00:00"),
        location: "National University of Management, Phnom Penh",
        fee_amount: 0.0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
