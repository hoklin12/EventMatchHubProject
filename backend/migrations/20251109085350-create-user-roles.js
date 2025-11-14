"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User_Roles", {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
          key: "role_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    // Use a composite UNIQUE constraint to prevent duplicate user-role rows
    // (some dialects/databases can error when adding a table-level PRIMARY KEY
    // after table creation; unique enforces the same uniqueness without PK conflicts)
    await queryInterface.addConstraint("User_Roles", {
      fields: ["user_id", "role_id"],
      type: "unique",
      name: "ux_user_role_user_id_role_id",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the table directly. Dropping the table will remove any constraints/indexes
    // MySQL can block dropping an index if it's referenced by a foreign key; dropping the table
    // avoids that issue during rollback.
    await queryInterface.dropTable("User_Roles");
  },
};
