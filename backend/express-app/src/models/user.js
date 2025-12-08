"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Only create associations if the target models exist to avoid startup errors
      if (models.Role) {
        User.belongsToMany(models.Role, {
          through: "UserRoles",
          foreignKey: "user_id",
          otherKey: "role_id",
          as: "Roles",
        });
      }
      if (models.Skill) {
        User.belongsToMany(models.Skill, {
          through: "UserSkills",
          foreignKey: "user_id",
          otherKey: "skill_id",
          as: "Skills",
        });
      }

      if (models.Portfolio) {
        User.hasMany(models.Portfolio, {
          foreignKey: "user_id",
          as: "Portfolios",
        });
      }

      if (models.Registration) {
        User.hasMany(models.Registration, {
          foreignKey: "user_id",
          as: "Registrations",
        });
      }

      if (models.Events) {
        User.hasMany(models.Events, {
          foreignKey: "user_id",
          as: "OrganizedEvents",
        });
      }

      if (models.Subscription) {
        User.hasMany(models.Subscription, {
          foreignKey: "user_id",
          as: "Subscriptions",
        });
      }
    }

    async comparePassword(password) {
      return bcrypt.compare(password, this.password_hash);
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      full_name: { type: DataTypes.STRING(255), allowNull: false },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone_number: {
        // Matches your SQL email
        type: DataTypes.STRING(191),
        allowNull: false,
        // unique: true,
        validate: {
          is: /^[0-9+\-() ]+$/i, // Basic phone number validation
        },
      },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      profile: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      organization_name: { type: DataTypes.STRING(40) },
      position: {
        // Matches your SQL position
        type: DataTypes.STRING(100),
        allowNull: true, // Allow NULL
      },
      plan: {
        // Foreign key to Plans table
        type: DataTypes.ENUM("Basic", "Enterprise", "Premium"),
        allowNull: false,
        defaultValue: "Basic",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "banned"),
        allowNull: false,
        defaultValue: "inactive",
      },
      // created_at: DataTypes.DATE,
      // updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      paranoid: false,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password_hash) {
            user.password_hash = await bcrypt.hash(user.password_hash, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password_hash") && user.password_hash) {
            user.password_hash = await bcrypt.hash(user.password_hash, 10);
          }
        },
      },
    }
  );
  return User;
};
