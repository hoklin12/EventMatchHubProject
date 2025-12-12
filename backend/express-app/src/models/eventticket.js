"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class EventTicket extends Model {
    static associate(models) {
      if (models.Event) {
        EventTicket.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }
    }
  }
  EventTicket.init(
    {
      eventticket_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Events",
          key: "event_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ticket_type: {
        type: DataTypes.ENUM(
          "general",
          "vip",
          "early_bird",
          "student",
          "other"
        ),
        defaultValue: "general",
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_sale_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_sale_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "EventTicket",
      tableName: "EventTickets",
      timestamps: true,
      paranoid: false,
    }
  );
  return EventTicket;
};
