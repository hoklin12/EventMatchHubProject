"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      if (models.User) {
        Subscription.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "Users",
        });
      }

      if (models.PlanTransaction) {
        Subscription.belongsTo(models.PlanTransaction, {
          foreignKey: "transaction_id",
          as: "PlanTransactions",
        });
      }
    }
  }
  Subscription.init(
    {
      subscription_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      transaction_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Plan_Transactions",
          key: "transaction_id",
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
      status: {
        type: DataTypes.ENUM("active", "inactive", "canceled", "expired"),
        allowNull: false,
        defaultValue: "active",
      },
      starts_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Subscription",
      tableName: "Subscriptions",
      timestamps: true,
      paranoid: false,
    }
  );
  return Subscription;
};
