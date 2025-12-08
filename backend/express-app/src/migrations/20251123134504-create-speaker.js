"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Speakers",
      {
        speaker_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
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
        order: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        speaker_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        photo_hash: {
          type: Sequelize.STRING(32),
          allowNull: true,
        },
        photo_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        created_at: {
          allowNull: true,
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
      },
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Speakers");
  },
};
