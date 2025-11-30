"use strict";

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "FormFieldOptions",
      [
        {
          option_id: "4da3a002-9ba6-4116-9fd7-f6d67fb42af7",
          formfield_id: "ca99dfa5-b901-4e4d-8f31-6d5ec6cc0451",
          option_text: "Morning Session (9 AM - 12 PM)",
          option_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "04584737-1947-4805-bdec-ee9b5d39569e",
          formfield_id: "ca99dfa5-b901-4e4d-8f31-6d5ec6cc0451",
          option_text: "Afternoon Session (1 PM - 4 PM)",
          option_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "26e444cc-0c49-4f5b-b88a-c0ea418ffcca",
          formfield_id: "ca99dfa5-b901-4e4d-8f31-6d5ec6cc0451",
          option_text: "Evening Session (5 PM - 8 PM)",
          option_order: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "c6341d1b-53c0-47a4-b8f7-db332b32f6f9",
          formfield_id: "09f31248-15ca-4830-8089-2a1f7846de72",
          option_text: "Vegetarian",
          option_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "c3d0c1b5-1acc-463d-880f-86bbf82fcb32",
          formfield_id: "09f31248-15ca-4830-8089-2a1f7846de72",
          option_text: "Vegan",
          option_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "b7294797-3a89-4c74-897b-38d9ca198045",
          formfield_id: "09f31248-15ca-4830-8089-2a1f7846de72",
          option_text: "Gluten-Free",
          option_order: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "3d93c0ea-2fb4-4e49-a36d-597afc66093f",
          formfield_id: "51764724-5fa9-456f-b627-54550b0dbe1a",
          option_text: "Social Media",
          option_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "ff170e7a-d947-4381-9580-82ef90b1c96a",
          formfield_id: "51764724-5fa9-456f-b627-54550b0dbe1a",
          option_text: "Friend or Colleague",
          option_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "066d9b8e-9a0c-48db-bb3b-fa5c06ed07a2",
          formfield_id: "51764724-5fa9-456f-b627-54550b0dbe1a",
          option_text: "Advertisement",
          option_order: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          option_id: "b50aee54-028a-4414-9e1c-47dc9eed6754",
          formfield_id: "51764724-5fa9-456f-b627-54550b0dbe1a",
          option_text: "Other",
          option_order: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FormFieldOptions", null, {});
  },
};
