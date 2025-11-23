"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CategorySkill extends Model {
    static associate(models) {
      CategorySkill.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "Categories",
      });
      CategorySkill.belongsTo(models.Skill, {
        foreignKey: "skill_id",
        as: "Skills",
      });
    }
  }
  CategorySkill.init(
    {
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Categories", key: "category_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Skills", key: "skill_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CategorySkill",
      tableName: "Category_Skills", // Matches SQL table name
      timestamps: false,
      paranoid: false,
    }
  );
  return CategorySkill;
};
