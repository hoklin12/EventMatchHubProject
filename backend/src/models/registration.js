"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
      if (models.ApplicationForm) {
        Registration.belongsTo(models.ApplicationForm, {
          foreignKey: "applicationform_id",
          as: "ApplicationForm",
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
      },
      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      registration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
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
