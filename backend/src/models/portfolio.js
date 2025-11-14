"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    static associate(models) {
      if (models.Role) {
        Portfolio.belongsToMany(models.Certificate, {
          through: "Portfolio_Certificates",
          foreignKey: "portfolio_id",
          otherKey: "certificate_id",
          as: "Certificates",
        });
      }
    }
  }
  Portfolio.init(
    {
      portfolio_id: {
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
      portfolio_items_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Portfolio",
      tableName: "Portfolios",
      timestamps: true,
      paranoid: false,
    }
  );
  return Portfolio;
};
