"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FormFieldOptions", {
      option_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      formfield_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "FormFields",
          key: "formfield_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      option_text: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      option_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FormFieldOptions");
  },
};
