"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class EventAttendance extends Model {
    static associate(models) {
      // Define associations here if needed
      if (models.EventSession) {
        EventAttendance.belongsTo(models.EventSession, {
          foreignKey: "event_session_id",
          as: "EventSessions",
        });
      }
      if (models.Registration) {
        EventAttendance.belongsTo(models.Registration, {
          foreignKey: "registration_id",
          as: "Registrations",
        });
      }
    }
  }
  EventAttendance.init(
    {
      attendance_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      event_session_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Event_Sessions",
          key: "event_session_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      registration_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Registrations",
          key: "registration_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attendance_status: {
        type: DataTypes.ENUM("present", "late", "absent", "pending"),
        allowNull: false,
        defaultValue: "pending",
      },
      check_in_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "EventAttendance",
      tableName: "Event_Attendances",
      timestamps: true,
      paranoid: false,
      indexes: [
        {
          unique: true,
          fields: ["event_session_id", "registration_id"],
          name: "unique_attendance_per_session",
        },
      ],
    }
  );
  return EventAttendance;
};
