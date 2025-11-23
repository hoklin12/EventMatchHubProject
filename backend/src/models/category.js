"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.User, {
        through: "EventCategory", // Junction table name
        foreignKey: "category_id",
        otherKey: "event_id",
        as: "Events",
      });
    }
  }
  Category.init(
    {
      type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // As recommended
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categories", // Matches SQL table name
      timestamps: true,
      paranoid: false, // Enables deleted_at
    }
  );
  return Category;
};
