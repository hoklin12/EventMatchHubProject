"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Registrations", {
      registration_id: {
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
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Events",
          key: "event_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        allowNull: false,
      },
      registration_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      // application_summary: {
      //   type: Sequelize.TEXT,
      //   allowNull: true,
      // },
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
    await queryInterface.dropTable("Registrations");
  },
};
