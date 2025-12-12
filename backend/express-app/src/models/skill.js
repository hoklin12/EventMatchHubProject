"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      Skill.belongsToMany(models.User, {
        through: "UserSkills", // Junction table name
        foreignKey: "skill_id",
        otherKey: "user_id",
        as: "Users", // Alias for accessing users from a role
      });
    }
  }
  Skill.init(
    {
      skill_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      skill_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // As recommended
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Skill",
      tableName: "Skills", // Matches SQL table name
      timestamps: true,
      paranoid: false, // Enables deleted_at
    }
  );
  return Skill;
};
