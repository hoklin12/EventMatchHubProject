"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RegisterTransactions", {
      registertransaction_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      // user_id: {
      //   type: Sequelize.UUID,
      //   allowNull: false,
      //   references: {
      //     model: "Users",
      //     key: "user_id",
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "CASCADE",
      // },
      registration_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Registrations",
          key: "registration_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Events",
          key: "event_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      method_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Payment_Methods",
          key: "method_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      transactionMD5: {
        type: Sequelize.STRING(32),
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "completed", "failed", "refunded"),
        allowNull: false,
        defaultValue: "pending",
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      failReason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      externalRef: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      created_at: {
        allowNull: true,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RegisterTransactions");
  },
};
