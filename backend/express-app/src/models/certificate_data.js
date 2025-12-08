"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class CertificateData extends Model {
    static associate(models) {
      if (models.Event) {
        CertificateData.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }
      if (models.CertificateTemplate) {
        CertificateData.belongsTo(models.CertificateTemplate, {
          foreignKey: "template_id",
          as: "CertificateTemplates",
        });
      }
    }
  }
  CertificateData.init(
    {
      certificatedata_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
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
      template_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: "ad0a3158-ad37-43b3-92a6-fb301b15bd36",
        references: {
          model: "CertificateTemplates",
          key: "template_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      organizer_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(123),
        allowNull: false,
      },
      issued_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiration_duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      organizer_director_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      signature_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      signature_file_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      organizer_role: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CertificateData",
      tableName: "CertificateDatas",
      timestamps: true,
      paranoid: false,
    }
  );
  return CertificateData;
};
