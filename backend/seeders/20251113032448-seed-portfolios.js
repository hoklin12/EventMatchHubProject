"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Portfolios",
      [
        {
          portfolio_id: "dc574496-ff1c-4bb2-aca4-652ed7d6c524",
          portfolio_items_id: 1,
          user_id: "7bc50b5b-05ce-4f13-bba9-64473878ac16",
          title: "Sample Portfolio Item",
          description: "This is a sample portfolio item for seeding purposes.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          portfolio_id: "e4149667-f494-4e45-b72a-a0de408ee4d7",
          portfolio_items_id: 1,
          user_id: "3c8db38d-9cc4-455b-bd24-60bfd9583087",
          title: "Another Portfolio Item",
          description:
            "This is another sample portfolio item for seeding purposes.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          portfolio_id: "13b9c200-e5f6-4a7b-8c9d-67hsta3b4c5d",
          portfolio_items_id: 1,
          user_id: "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
          title: "Emily's First Project Showcase",
          description:
            "A comprehensive overview of Emily Carter's contributions to the Q3 development cycle.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          portfolio_id: "tsh58haj-f6a7-4b8c-9d0e-1f2a3b4c5d6e", // !!! Replace with a real UUID generator result if needed !!!
          portfolio_items_id: 2,
          user_id: "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
          title: "Emily's Design Concepts",
          description:
            "Sketches and finalized UI/UX mockups for the new application interface.",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // User: John Peterson (91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0)
        {
          portfolio_id: "098jhy53-a7b8-4c9d-0e1f-2a3b4c5d6e7f", // !!! Replace with a real UUID generator result if needed !!!
          portfolio_items_id: 1,
          user_id: "91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0",
          title: "John Peterson - Marketing Strategy",
          description:
            "Detailed analysis of the Q4 marketing campaign performance metrics.",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // User: Nary Sok (b4db6d88-be03-4c5b-8119-5d4c44f13c7c)
        {
          portfolio_id: "09kj65td-b8c9-4d0e-1f2a-3b4c5d6e7f8a", // !!! Replace with a real UUID generator result if needed !!!
          portfolio_items_id: 1,
          user_id: "b4db6d88-be03-4c5b-8119-5d4c44f13c7c",
          title: "Nary Sok - Community Outreach Report",
          description:
            "Documentation of the recent digital literacy workshops organized by Khmer Digital Center.",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // User: Jason Morales (c27f1a66-11f4-4b5d-a879-9270cb44e5ff)
        {
          portfolio_id: "0099yt43-c9d0-4e1f-2a3b-4c5d6e7f8a9b", // !!! Replace with a real UUID generator result if needed !!!
          portfolio_items_id: 1,
          user_id: "c27f1a66-11f4-4b5d-a879-9270cb44e5ff",
          title: "Jason Morales - AI Integration Proposal",
          description:
            "Technical document outlining the proposed integration of machine learning models into the main platform.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Portfolios", null, {});
  },
};
