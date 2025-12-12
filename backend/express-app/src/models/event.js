"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Define associations here if needed
      if (models.User) {
        Event.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "Users",
        });
      }
      if (models.Category) {
        Event.belongsTo(models.Category, {
          foreignKey: "category_id",
          as: "Categories",
        });
      }

      if (models.Ticket) {
        Event.hasMany(models.EventTicket, {
          foreignKey: "event_id",
          as: "Tickets",
        });
      }

      if (models.CertificateData) {
        Event.hasMany(models.CertificateData, {
          foreignKey: "event_id",
          as: "CertificateDatas",
        });
      }

      if (models.FormField) {
        Event.hasMany(models.FormField, {
          foreignKey: "event_id",
          as: "FormFields",
        });
      }

      if (models.Registration) {
        Event.hasMany(models.Registration, {
          foreignKey: "event_id",
          as: "Registrations",
        });
      }

      if (models.EventSession) {
        Event.hasMany(models.EventSession, {
          foreignKey: "event_id",
          as: "EventSessions",
        });
      }
    }
  }
  Event.init(
    {
      event_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      theme: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "category_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: DataTypes.ENUM(
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
        type: DataTypes.ENUM(
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
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      agenda: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      schedule_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      allowRemindEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "allowRemindEmail",
      },
      attendance_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      attendance_token_start: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      attendance_token_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
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
