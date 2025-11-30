"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      UserRoles.belongsTo(models.User, { foreignKey: "user_id", as: "Users" });
      UserRoles.belongsTo(models.Role, { foreignKey: "role_id", as: "Roles" });
    }
  }
  UserRoles.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Users", key: "user_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Part of composite PK
        references: { model: "Roles", key: "role_id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserRoles",
      tableName: "User_Roles", // Matches SQL table name
      timestamps: false,
      paranoid: false,
    }
  );
  return UserRoles;
};
