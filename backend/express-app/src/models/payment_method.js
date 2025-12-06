"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    static associate(models) {
      if (models.PlanTransaction) {
        PaymentMethod.hasMany(models.PlanTransaction, {
          foreignKey: "method_id",
          as: "PlanTransactions",
        });
      }
    }
  }
  PaymentMethod.init(
    {
      method_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      method_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PaymentMethod",
      tableName: "Payment_Methods",
      timestamps: true,
      paranoid: false,
    }
  );
  return PaymentMethod;
};
