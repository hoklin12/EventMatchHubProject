"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PlanTransaction extends Model {
    static associate(models) {
      if (models.User) {
        PlanTransaction.hasMany(models.User, {
          foreignKey: "user_id",
          as: "Users",
        });
      }

      if (models.PaymentMethod) {
        PlanTransaction.belongsTo(models.PaymentMethod, {
          foreignKey: "method_id",
          as: "PaymentMethods",
        });
      }

      if (models.Plan) {
        PlanTransaction.belongsTo(models.Plan, {
          foreignKey: "plan_id",
          as: "Plans",
        });
      }
    }
  }
  PlanTransaction.init(
    {
      transaction_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      method_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Payment_Methods",
          key: "method_id",
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
      plan_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Plans",
          key: "plan_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transactionMD5: {
        type: DataTypes.TEXT(32),
        allowNull: false,
        unique: true,
        field: "transactionMD5",
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
        allowNull: false,
        defaultValue: "pending",
      },
      transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      failReason: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "failReason",
      },
      externalRef: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "externalRef",
        unique: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PlanTransaction",
      tableName: "Plan_Transactions",
      timestamps: true,
      paranoid: false,
    }
  );
  return PlanTransaction;
};
