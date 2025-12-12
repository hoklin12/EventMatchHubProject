"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class FormResponseAnswer extends Model {
    static associate(models) {
      if (models.Registration) {
        FormResponseAnswer.belongsTo(models.Registration, {
          foreignKey: "registration_id",
          as: "Registrations",
        });
      }
      if (models.FormField) {
        FormResponseAnswer.belongsTo(models.FormField, {
          foreignKey: "formfield_id",
          as: "FormFields",
        });
      }
    }
  }
  FormResponseAnswer.init(
    {
      answer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      formfield_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "FormFields",
          key: "formfield_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      answer_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      selected_options_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "FormFieldOptions",
          key: "option_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      selected_options_ids: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FormResponseAnswer",
      tableName: "FormResponseAnswers",
      timestamps: true,
      paranoid: false,
    }
  );
  return FormResponseAnswer;
};
