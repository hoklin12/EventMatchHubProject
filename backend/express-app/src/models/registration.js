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
        allowNull: true,
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
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
        allowNull: false,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_attended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // application_summary: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      // },
      formResponseJson: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "formResponseJson",
      },
      is_reminded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      registrationHash: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: true,
        field: "registrationHash",
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
