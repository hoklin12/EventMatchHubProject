"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class EventSession extends Model {
    static associate(models) {
      // Define associations here if needed
      if (models.Event) {
        EventSession.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }

      if (models.EventAttendance) {
        EventSession.hasMany(models.EventAttendance, {
          foreignKey: "event_session_id",
          as: "EventAttendances",
        });
      }
    }
  }
  EventSession.init(
    {
      event_session_id: {
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
      session_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      qr_token: {
        type: DataTypes.STRING,
        allowNull: true, // token generated/activated later
        unique: true,
      },
      qr_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "EventSession",
      tableName: "Event_Sessions",
      timestamps: true,
      paranoid: false,
      indexes: [
        {
          fields: ["event_id"],
        },
      ],
    }
  );
  return EventSession;
};
