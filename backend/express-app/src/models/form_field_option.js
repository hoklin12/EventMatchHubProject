"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class FormFieldOption extends Model {
    static associate(models) {
      if (models.FormField) {
        FormFieldOption.belongsTo(models.FormField, {
          foreignKey: "formfield_id",
          as: "FormFields",
        });
      }
    }
  }
  FormFieldOption.init(
    {
      option_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      option_text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      option_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FormFieldOption",
      tableName: "FormFieldOptions",
      timestamps: true,
      paranoid: false,
    }
  );
  return FormFieldOption;
};
