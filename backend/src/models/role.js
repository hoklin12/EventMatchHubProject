"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: "UserRoles", // Junction table name
        foreignKey: "role_id",
        otherKey: "user_id",
        as: "Users", // Alias for accessing users from a role
      });
    }
  }
  Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // As recommended
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Roles", // Matches SQL table name
      timestamps: true,
      paranoid: false, // Enables deleted_at
    }
  );
  return Role;
};
