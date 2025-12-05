"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      if (models.PlanTransaction) {
        Plan.hasMany(models.PlanTransaction, {
          foreignKey: "plan_id",
          as: "PlanTransactions",
        });
      }
    }
  }
  Plan.init(
    {
      plan_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      plan_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "USD",
      },
      participant_limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_unlimited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      allow_ai_reminders: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      allow_event_payments: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Plan",
      tableName: "Plans",
      timestamps: true,
      paranoid: false,
    }
  );
  return Plan;
};
