"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventCategory extends Model {
    static associate(models) {
      EventCategory.belongsTo(models.Event, {
        foreignKey: "event_id",
        as: "Events",
      });
      EventCategory.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "Categories",
      });
    }
  }
  EventCategory.init(
    {
      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Events", key: "event_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Categories", key: "category_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "EventCategory",
      tableName: "Event_Categories", // Matches SQL table name
      timestamps: false,
      paranoid: false,
    }
  );
  return EventCategory;
};
