"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      if (models.Role) {
        Certificate.belongsToMany(models.Portfolio, {
          through: "PortfolioCertificates",
          foreignKey: "certificate_id",
          otherKey: "portfolio_id",
          as: "Portfolios",
        });
      }
      if (models.User) {
        Certificate.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "Users",
        });
      }
    }
  }
  Certificate.init(
    {
      certificate_id: {
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
      certificatedata_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "CertificateDatas",
          key: "certificatedata_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      verification_code: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      verification_hash: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      file_link: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Certificate",
      tableName: "Certificates",
      timestamps: true,
      paranoid: false,
    }
  );
  return Certificate;
};
