"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Events", [
      // =======================================================
      // 1. Annual Tech Conference
      // =======================================================
      {
        event_id: "7399c126-69d2-4f14-804a-22c663d5d407",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486", // Kao Vichet
        title: "Annual Tech Conference 2025",
        theme:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Tech-Conference-Theme.jpg",
        description:
          "A large-scale event bringing together developers, designers, and tech enthusiasts to discuss the latest trends in technology.",
        category_id: "88b86831-1b32-49aa-aa27-e6f3c7584bd9", // Technology Category
        type: "conference",
        status: "draft",
        start_date: "2025-02-15 09:00:00",
        end_date: "2025-02-16 17:00:00",
        location_name: "Phnom Penh Convention Center", // Required
        location: "Diamond Island, Building A, Phnom Penh",
        // fee_amount: 25.0,
        // capacity: 500,
        agenda:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Sample-pdf.pdf",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // =======================================================
      // 2. Full-Stack Developer Workshop
      // =======================================================
      {
        event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        user_id: "101d0a11-80cc-4c95-ba41-75a4f27b6d11", // Maria Lopez
        theme:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Tech-Conference-Theme.jpg",
        title: "Full-Stack Developer Workshop",
        description:
          "A 2-day hands-on coding workshop focusing on building and deploying full-stack applications using Node.js and React.",
        category_id: "88b86831-1b32-49aa-aa27-e6f3c7584bd9", // Technology Category
        type: "workshop",
        status: "public",
        start_date: "2025-03-10 09:00:00",
        end_date: "2025-03-11 17:00:00",
        location_name: "TechLab Cambodia",
        location: "Russian Blvd, Room 204, Phnom Penh",
        // fee_amount: 10.0,
        // capacity: 30,
        agenda:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Sample-pdf.pdf",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // =======================================================
      // 3. Innovation Hackathon
      // =======================================================
      {
        event_id: "cd110769-3a7f-4fad-9461-d80e4342d950",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486", // Kao Vichet
        theme:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Tech-Conference-Theme.jpg",
        title: "Innovation Hackathon 2025",
        description:
          "A 48-hour hackathon where teams collaborate to build innovative solutions to real-world problems.",

        category_id: "88b86831-1b32-49aa-aa27-e6f3c7584bd9", // Technology Category
        type: "competition",
        status: "completed",
        start_date: "2025-04-05 08:00:00",
        end_date: "2025-04-07 20:00:00",
        location_name: "National University of Management",
        location: "Main Campus Hall, Phnom Penh",
        // fee_amount: 0.0,
        // capacity: 100,
        agenda:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Sample-pdf.pdf",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // =======================================================
      // 4. ACET Innovation Hackathon
      // =======================================================
      {
        event_id: "79c4a02d-5f8c-4793-9983-04b7ff123dda",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486", // Kao Vichet
        theme:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Tech-Conference-Theme.jpg",
        title: "ACET Innovation Hackathon 2025",
        description:
          "ACET's 48-hour hackathon where teams collaborate to build innovative solutions to real-world problems.",
        category_id: "88b86831-1b32-49aa-aa27-e6f3c7584bd9", // Technology Category
        type: "meetup",
        status: "public",
        start_date: "2025-05-20 07:00:00",
        end_date: "2025-05-20 19:00:00",
        location_name: "National University of Management",
        location: "ACET Lab, Phnom Penh",
        // fee_amount: 0.0,
        // capacity: 100,
        agenda:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Sample-pdf.pdf",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        event_id: "cde50c11-c9db-4251-9b53-fa2f7bcae98a",
        user_id: "e57a5708-5b21-4a82-abd4-a4a4ac682486", // Kao Vichet
        theme:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Tech-Conference-Theme.jpg",
        title: "Asianet Innovation Hackathon 2025",
        description:
          "Asianet's 48-hour hackathon where teams collaborate to build innovative solutions to real-world problems.",
        category_id: "88b86831-1b32-49aa-aa27-e6f3c7584bd9", // Technology Category
        type: "competition",
        status: "schedule",
        start_date: "2025-09-20 09:00:00",
        end_date: "2025-09-20 15:00:00",
        location_name: "National University of Management",
        location: "Asianet Lab, Phnom Penh",
        // fee_amount: 0.0,
        // capacity: 200,
        agenda:
          "https://www.eks-intec.com/wp-content/uploads/2025/01/Sample-pdf.pdf",
        schedule_date: "2026-01-02 09:00:00",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
