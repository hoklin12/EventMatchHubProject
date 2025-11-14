"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Define associations here if needed
      if (models.Certificate) {
        Event.hasMany(models.Certificate, {
          foreignKey: "event_id",
          as: "Certificates",
        });
      }
    }
  }
  Event.init(
    {
      event_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Users", key: "user_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM(
          "conference",
          "workshop",
          "webinar",
          "meetup",
          "other"
        ),
        defaultValue: "conference",
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("upcoming", "ongoing", "completed", "cancelled"),
        defaultValue: "upcoming",
        allowNull: false,
      },
      event_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      fee_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "Events",
      timestamps: true,
      paranoid: false,
    }
  );
  return Event;
};
