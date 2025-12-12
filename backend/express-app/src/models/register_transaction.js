"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RegisterTransactions extends Model {
    static associate(models) {
      // if (models.User) {
      //   RegisterTransactions.hasMany(models.User, {
      //     foreignKey: "user_id",
      //     as: "Users",
      //   });
      // }

      if (models.PaymentMethod) {
        RegisterTransactions.belongsTo(models.PaymentMethod, {
          foreignKey: "method_id",
          as: "PaymentMethods",
        });
      }

      if (models.Event) {
        RegisterTransactions.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }

      if (models.Registration) {
        RegisterTransactions.belongsTo(models.Registration, {
          foreignKey: "registration_id",
          as: "Registrations",
        });
      }
    }
  }
  RegisterTransactions.init(
    {
      registertransaction_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // user_id: {
      //   type: DataTypes.UUID,
      //   allowNull: false,
      //   references: {
      //     model: "Users",
      //     key: "user_id",
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // },
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
      registration_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Registrations",
          key: "registration_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      transactionMD5: {
        type: DataTypes.STRING(32),
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
        unique: true,
        field: "externalRef",
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "RegisterTransactions",
      tableName: "RegisterTransactions",
      timestamps: true,
      paranoid: false,
    }
  );
  return RegisterTransactions;
};
