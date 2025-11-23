"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class FormField extends Model {
    static associate(models) {
      if (models.Event) {
        FormField.belongsTo(models.Event, {
          foreignKey: "event_id",
          as: "Events",
        });
      }
    }
  }
  FormField.init(
    {
      formfield_id: {
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
      question: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      field_type: {
        type: DataTypes.ENUM(
          "short",
          "paragraph",
          "radio",
          "checkbox",
          "dropdown"
        ),
        allowNull: false,
      },
      is_required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      question_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FormField",
      tableName: "FormFields",
      timestamps: true,
      paranoid: false,
    }
  );
  return FormField;
};
