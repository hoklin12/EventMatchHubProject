"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Speaker extends Model {
    static associate(models) {
      Speaker.belongsTo(models.Event, {
        foreignKey: "event_id",
        as: "Events",
      });
    }
  }
  Speaker.init(
    {
      speaker_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "events",
          key: "event_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      speaker_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photo_hash: {
        type: DataTypes.STRING(32),
        allowNull: true,
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Speaker",
      tableName: "Speakers", // Matches SQL table name
      timestamps: true,
      paranoid: false, // Enables deleted_at
    }
  );
  return Speaker;
};
