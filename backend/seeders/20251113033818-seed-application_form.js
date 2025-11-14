"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ApplicationForm",
      [
        {
          applicationform_id: "f11e4d76-1172-49cd-b8d2-5421a7c33048",
          portfolio_id: "dc574496-ff1c-4bb2-aca4-652ed7d6c524",
          user_id: "7bc50b5b-05ce-4f13-bba9-64473878ac16",
          title: "Job Application Form",
          description: "A form for job applications.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          applicationform_id: "c9bc1a14-9b1d-4388-9e8a-eebb8361413c",
          portfolio_id: "e4149667-f494-4e45-b72a-a0de408ee4d7",
          user_id: "3c8db38d-9cc4-455b-bd24-60bfd9583087",
          title: "Event Registration Form",
          description: "A form for event registrations.",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ApplicationForm", null, {});
  },
};
