"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
      if (models.ApplicationForm) {
        Registration.belongsTo(models.ApplicationForm, {
          foreignKey: "applicationform_id",
          as: "ApplicationForms",
        });
      }
      if (models.Event) {
        Registration.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }
    }
  }
  Registration.init(
    {
      registration_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      applicationform_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "ApplicationForms",
          key: "applicationform_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      registration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Registration",
      tableName: "Registrations",
      timestamps: true,
      paranoid: false,
    }
  );
  return Registration;
};
