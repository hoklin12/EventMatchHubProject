"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Event_Attendances", {
      attendance_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      event_session_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // unique: true,
        references: {
          model: "Event_Sessions",
          key: "event_session_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      registration_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // unique: true,
        references: {
          model: "Registrations",
          key: "registration_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attendance_status: {
        type: Sequelize.ENUM("present", "late", "absent", "pending"),
        allowNull: false,
        defaultValue: "pending",
      },
      check_in_time: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Event_Attendances");
  },
};
