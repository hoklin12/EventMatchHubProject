"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserSkills extends Model {
    static associate(models) {
      UserSkills.belongsTo(models.User, { foreignKey: "user_id", as: "Users" });
      UserSkills.belongsTo(models.Skill, {
        foreignKey: "skill_id",
        as: "Skills",
      });
    }
  }
  UserSkills.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Users", key: "user_id" },
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
      modelName: "UserSkills",
      tableName: "User_Skills",
      timestamps: false,
      paranoid: false,
    }
  );
  return UserSkills;
};
