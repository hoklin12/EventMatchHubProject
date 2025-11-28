"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class ApplicationForm extends Model {
    static associate(models) {
      if (models.Portfolio) {
        ApplicationForm.belongsTo(models.Portfolio, {
          foreignKey: "portfolio_id",
          as: "Portfolios",
        });
      }
      if (models.User) {
        ApplicationForm.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "Users",
        });
      }
    }
  }
  ApplicationForm.init(
    {
      applicationform_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ApplicationForm",
      tableName: "ApplicationForms",
      timestamps: true,
      paranoid: false,
    }
  );
  return ApplicationForm;
};
