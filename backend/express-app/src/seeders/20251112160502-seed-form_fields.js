"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "FormFields",
      [
        {
          formfield_id: "eea8a5cb-ed02-4dd3-bf5b-caad8cb1cacd",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          question: "What is your full name?",
          field_type: "short",
          is_required: true,
          question_order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          formfield_id: "de8a7971-12d9-4913-8662-2886cd935b6c",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          question: "Please provide a brief bio about yourself.",
          field_type: "paragraph",
          is_required: false,
          question_order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          formfield_id: "ca99dfa5-b901-4e4d-8f31-6d5ec6cc0451",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          question: "What is your preferred session time?",
          field_type: "dropdown",
          is_required: true,
          question_order: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          formfield_id: "09f31248-15ca-4830-8089-2a1f7846de72",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          question: "Do you have any dietary restrictions?",
          field_type: "checkbox",
          is_required: false,
          question_order: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          formfield_id: "51764724-5fa9-456f-b627-54550b0dbe1a",
          event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          question: "How did you hear about this event?",
          field_type: "radio",
          is_required: true,
          question_order: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FormFields", null, {});
  },
};
