"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Helper function to keep the code clean
    const createLink = (eventId, categoryId) => ({
      event_id: eventId,
      category_id: categoryId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await queryInterface.bulkInsert("Event_Categories", [
      // ==========================================================
      // 1. Annual Tech Conference 2025
      // ID: 7399c126-69d2-4f14-804a-22c663d5d407
      // Desc: Developers, designers, tech trends
      // ==========================================================
      createLink(
        "7399c126-69d2-4f14-804a-22c663d5d407",
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9"
      ), // Technology
      createLink(
        "7399c126-69d2-4f14-804a-22c663d5d407",
        "ec45e1c8-1479-4ba3-8405-09776d19f7e6"
      ), // Career Development
      createLink(
        "7399c126-69d2-4f14-804a-22c663d5d407",
        "121fcb02-2760-43b6-8242-db636a4ede92"
      ), // Art & Design (since it mentions designers)

      // ==========================================================
      // 2. Full-Stack Developer Workshop
      // ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
      // Desc: Hands-on coding, Node.js, React
      // ==========================================================
      createLink(
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9"
      ), // Technology
      createLink(
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "fa1ad8eb-290c-4a68-a8a0-8711c93c82dc"
      ), // Education & Training

      // ==========================================================
      // 3. Innovation Hackathon 2025
      // ID: cd110769-3a7f-4fad-9461-d80e4342d950
      // Desc: Solving real-world problems, innovation
      // ==========================================================
      createLink(
        "cd110769-3a7f-4fad-9461-d80e4342d950",
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9"
      ), // Technology
      createLink(
        "cd110769-3a7f-4fad-9461-d80e4342d950",
        "f1b3e8da-2b1d-4f6f-a6e7-dcae3e7f4d44"
      ), // Entrepreneurship
      createLink(
        "cd110769-3a7f-4fad-9461-d80e4342d950",
        "f650aa26-b68a-4e04-9e6e-f8f1db25a0ee"
      ), // Engineering & Robotics

      // ==========================================================
      // 4. ACET Innovation Hackathon 2025
      // ID: 79c4a02d-5f8c-4793-9983-04b7ff123dda
      // Desc: ACET event, innovation, real-world problems
      // ==========================================================
      createLink(
        "79c4a02d-5f8c-4793-9983-04b7ff123dda",
        "88b86831-1b32-49aa-aa27-e6f3c7584bd9"
      ), // Technology
      createLink(
        "79c4a02d-5f8c-4793-9983-04b7ff123dda",
        "07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe"
      ), // AI & Machine Learning
      createLink(
        "79c4a02d-5f8c-4793-9983-04b7ff123dda",
        "f1b3e8da-2b1d-4f6f-a6e7-dcae3e7f4d44"
      ), // Entrepreneurship
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Event_Categories", null, {});
  },
};
