"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Event_Types", {
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
    await queryInterface.addConstraint("Event_Types", {
      fields: ["event_id", "type_id"],
      type: "unique",
      name: "ux_event_types_event_id_type_id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Event_Types");
  },
};
