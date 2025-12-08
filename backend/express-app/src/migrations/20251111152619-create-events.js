"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Events", {
      event_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
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
      theme: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "category_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM(
          "conference",
          "workshop",
          "webinar",
          "meetup",
          "competition",
          "other"
        ),
        defaultValue: "conference",
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          "draft",
          "public",
          "private",
          "schedule",
          "completed"
        ),
        defaultValue: "draft",
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      // fee_amount: {
      //   type: Sequelize.DECIMAL(10, 2),
      //   allowNull: true,
      // },
      // capacity: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      // },
      agenda: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      schedule_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      allowRemindEmail: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      attendance_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      attendance_token_start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      attendance_token_expiry: {
        type: Sequelize.DATE,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Events");
  },
};
