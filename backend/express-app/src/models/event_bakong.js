"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class EventBakong extends Model {
    static associate(models) {
      // Define associations here if needed
      if (models.Event) {
        EventBakong.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }
    }
  }
  EventBakong.init(
    {
      eventbakong_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Events",
          key: "event_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      bakongAccountID: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "bakongAccountID",
      },
      merchantName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "merchantName",
      },
      eventticket_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "EventTickets",
          key: "eventticket_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      acquiringBank: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "acquiringBank",
      },
      merchantCity: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "merchantCity",
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "mobileNumber",
      },
      storeLabel: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "storeLabel",
      },
      plan_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "EventBakong",
      tableName: "EventBakong",
      timestamps: true,
      paranoid: false,
    }
  );
  return EventBakong;
};
