"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class CertificateTemplate extends Model {
    static associate(models) {}
  }
  CertificateTemplate.init(
    {
      template_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("appreciation", "completion"),
        allowNull: false,
      },
      example: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      template: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
      metadata: {
        type: DataTypes.STRING(512),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CertificateTemplate",
      tableName: "CertificateTemplates",
      timestamps: true,
      paranoid: false,
    }
  );
  return CertificateTemplate;
};
