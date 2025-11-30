"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PortfolioCertificates extends Model {
    static associate(models) {
      PortfolioCertificates.belongsTo(models.Certificate, {
        foreignKey: "certificate_id",
        as: "Certificates",
      });
      PortfolioCertificates.belongsTo(models.Portfolio, {
        foreignKey: "portfolio_id",
        as: "Portfolios",
      });
    }
  }
  PortfolioCertificates.init(
    {
      portfolio_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Portfolios", key: "portfolio_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      certificate_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Certificates", key: "certificate_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PortfolioCertificates",
      tableName: "Portfolio_Certificates", // Matches SQL table name
      // This is a pure join table — avoid timestamps unless your migrations created them.
      // Setting timestamps: false prevents Sequelize from querying/expecting created_at/updated_at columns.
      timestamps: false,
      paranoid: false,
      // Composite primary key is automatically handled by defining user_id and role_id as PKs
      // and marking them as part of the primary key in the init structure.
      // If explicit constraint naming is needed, it's done via options passed to init or addConstraint in migrations.
    }
  );
  return PortfolioCertificates;
};
