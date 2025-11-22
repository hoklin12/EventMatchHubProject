"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Types", [
      {
        type_id: "88b86831-1b32-49aa-aa27-e6f3c7584bd9",
        type_name: "Technology",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "dfc97397-7b4e-4e6b-9df8-885972b2bc79",
        type_name: "Business & Management",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "4ad24a24-bcdd-4dc0-a4d2-3496bccd2e68",
        type_name: "Digital Marketing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "fa1ad8eb-290c-4a68-a8a0-8711c93c82dc",
        type_name: "Education & Training",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "60ff1c79-93fb-4586-9d3b-05cf8cad5b02",
        type_name: "Healthcare & Medicine",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "83a18ef8-1f4a-4410-ab30-483cab0b42d3",
        type_name: "Finance & Banking",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "2fc64caf-e3f6-4ad9-a0ad-57a222f5a13c",
        type_name: "Sales & Customer Service",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "f650aa26-b68a-4e04-9e6e-f8f1db25a0ee",
        type_name: "Engineering & Robotics",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "07da2bcc-f841-4cc8-ae8b-8dd9bdb53dfe",
        type_name: "AI & Machine Learning",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "21e07961-fa61-4a6d-9ee6-724a45bd53ef",
        type_name: "Cybersecurity",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "ea374522-fa9e-4aa9-a6d1-90268bff0c53",
        type_name: "Cloud & DevOps",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "121fcb02-2760-43b6-8242-db636a4ede92",
        type_name: "Art & Design",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "c65af3cd-fe43-4fe8-a5d2-d1b8d2bb8a9a",
        type_name: "Photography & Media",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "ba7e8a83-bbc8-4aba-bc21-a6ff02424d34",
        type_name: "Community & Volunteering",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "d487add8-4a63-4ca6-b595-83d71ed96b95",
        type_name: "Sports & Fitness",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "ec45e1c8-1479-4ba3-8405-09776d19f7e6",
        type_name: "Career Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "f1b3e8da-2b1d-4f6f-a6e7-dcae3e7f4d44",
        type_name: "Entrepreneurship",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "a4b2c3d4-1e5f-4b6d-8a9b-2c3d4e5f6a7b",
        type_name: "Environment & Sustainability",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "b5c6d7e8-9f01-4a2b-8c3d-4e5f6a7b8c9d",
        type_name: "Legal & Compliance",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type_id: "c6d7e8f9-0a12-4b3c-9d4e-5f6a7b8c9d0e",
        type_name: "Human Resources",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Types", null, {});
  },
};
