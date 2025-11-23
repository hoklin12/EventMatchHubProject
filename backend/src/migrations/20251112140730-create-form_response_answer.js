"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FormResponseAnswers", {
      answer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      applicationform_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "ApplicationForms",
          key: "applicationform_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      answer_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      selected_options_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "FormFieldOptions",
          key: "option_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      selected_options_ids: {
        type: Sequelize.JSON,
        allowNull: true,
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
    await queryInterface.dropTable("FormResponseAnswers");
  },
};
