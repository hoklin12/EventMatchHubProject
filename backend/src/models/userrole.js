"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      UserRoles.belongsTo(models.User, { foreignKey: "user_id", as: "User" });
      UserRoles.belongsTo(models.Role, { foreignKey: "role_id", as: "Role" });
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
      // This is a pure join table — avoid timestamps unless your migrations created them.
      // Setting timestamps: false prevents Sequelize from querying/expecting created_at/updated_at columns.
      timestamps: false,
      paranoid: false,
      // Composite primary key is automatically handled by defining user_id and role_id as PKs
      // and marking them as part of the primary key in the init structure.
      // If explicit constraint naming is needed, it's done via options passed to init or addConstraint in migrations.
    }
  );
  return UserRoles;
};
