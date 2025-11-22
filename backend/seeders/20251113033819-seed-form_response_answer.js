"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("FormResponseAnswers", [
      {
        answer_id: "1ca8c1eb-ddb0-4a6f-93a0-6fe4d72cd76d",
        applicationform_id: "1f80b8bd-87ee-416e-a184-758a33960eed",
        formfield_id: "eea8a5cb-ed02-4dd3-bf5b-caad8cb1cacd",
        answer_text: "Emily Carter",
        selected_options_id: null,
        selected_options_ids: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        answer_id: "4073926f-0e9a-45f8-9da0-128a16275330",
        applicationform_id: "1f80b8bd-87ee-416e-a184-758a33960eed",
        formfield_id: "de8a7971-12d9-4913-8662-2886cd935b6c",
        answer_text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra convallis dapibus. Sed elementum placerat dui, eu condimentum mi congue sit amet. In velit est, mattis in mattis at, vehicula tempor sapien. Duis ac euismod libero, eu egestas arcu. Proin in posuere orci. Aliquam erat volutpat. Pellentesque at luctus risus. Sed ut augue nec ante accumsan tincidunt. Nullam malesuada dolor vel aliquet gravida. Praesent elit sem, pellentesque quis quam ac, placerat pellentesque nisi.",
        selected_options_id: null,
        selected_options_ids: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        answer_id: "8a4043af-5e17-4f13-b248-de86f94821ee",
        applicationform_id: "1f80b8bd-87ee-416e-a184-758a33960eed",
        formfield_id: "ca99dfa5-b901-4e4d-8f31-6d5ec6cc0451",
        answer_text: null,
        selected_options_id: "4da3a002-9ba6-4116-9fd7-f6d67fb42af7",
        selected_options_ids: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        answer_id: "53353a4d-403b-4d05-8454-aa06690b5381",
        applicationform_id: "1f80b8bd-87ee-416e-a184-758a33960eed",
        formfield_id: "09f31248-15ca-4830-8089-2a1f7846de72",
        answer_text: null,
        selected_options_id: null,
        selected_options_ids: JSON.stringify([
          "c6341d1b-53c0-47a4-b8f7-db332b32f6f9",
          "c3d0c1b5-1acc-463d-880f-86bbf82fcb32",
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        answer_id: "78173fa5-611a-488f-b9b6-5b74c9fccd44",
        applicationform_id: "1f80b8bd-87ee-416e-a184-758a33960eed",
        formfield_id: "51764724-5fa9-456f-b627-54550b0dbe1a",
        answer_text: null,
        selected_options_id: "3d93c0ea-2fb4-4e49-a36d-597afc66093f",
        selected_options_ids: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FormResponseAnswers", null, {});
  },
};
