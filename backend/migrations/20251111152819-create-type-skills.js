"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Type_Skills", {
      type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Types",
          key: "type_id",
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
    });
    await queryInterface.addConstraint("Type_Skills", {
      fields: ["type_id", "skill_id"],
      type: "unique",
      name: "ux_type_skills_type_id_skill_id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Type_Skills");
  },
};
