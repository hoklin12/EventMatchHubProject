"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    static associate(models) {
      if (models.Portfolio) {
        Registration.belongsTo(models.Portfolio, {
          foreignKey: "portfolio_id",
          as: "Portfolios",
        });
      }
      if (models.Event) {
        Registration.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }
      if (models.User) {
        Registration.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "Users",
        });
      }
      Registration.hasMany(models.FormResponseAnswer, {
        foreignKey: "registration_id",
        as: "FormResponseAnswers",
      });
    }
  }
  Registration.init(
    {
      registration_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      portfolio_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Portfolios",
          key: "portfolio_id",
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
