"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed the Roles table with the basic roles
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          role_name: "participant",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_name: "organizer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role_name: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // This function will be executed if you run `npx sequelize-cli db:seed:undo:all` or `undo` for this specific seeder.
    // It removes the records that were inserted by the 'up' function.
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
