"use strict";

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "User_Skills",

      {
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Users",
            key: "user_id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        skill_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Skills",
            key: "skill_id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ),
        },
      }
    );
    await queryInterface.addConstraint("User_Skills", {
      fields: ["user_id", "skill_id"],
      type: "unique",
      name: "ux_user_skills_user_id_skill_id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("User_Skills");
  },
};
