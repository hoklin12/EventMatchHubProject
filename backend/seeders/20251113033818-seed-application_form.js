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

        //New Application Forms
        {
          applicationform_id: "1f80b8bd-87ee-416e-a184-758a33960eed",
          portfolio_id: "13b9c200-e5f6-4a7b-8c9d-67hsta3b4c5d",
          user_id: "8fa18b42-d2d4-47d6-8bc7-25e648cabbc7",
          title: "Event Registration Form",
          description: "A form for event registrations.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          applicationform_id: "7dce57c8-5ce0-4a28-8033-0846f2b3de8c",
          portfolio_id: "098jhy53-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
          user_id: "91b3d00e-1c2d-4ad8-b07c-e45e9a151bb0",
          title: "Event Registration Form",
          description: "A form for event registrations.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          applicationform_id: "071d8c75-f1ce-4831-8691-7221509f6d24",
          portfolio_id: "09kj65td-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
          user_id: "b4db6d88-be03-4c5b-8119-5d4c44f13c7c",
          title: "Event Registration Form",
          description: "A form for event registrations.",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          applicationform_id: "1bc8c60a-6410-425d-9e16-8c681a6732fd",
          portfolio_id: "0099yt43-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
          user_id: "c27f1a66-11f4-4b5d-a879-9270cb44e5ff",
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
