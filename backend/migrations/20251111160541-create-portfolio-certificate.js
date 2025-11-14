"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Portfolio_Certificates", {
      portfolio_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Portfolios",
          key: "portfolio_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      certificate_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Certificates",
          key: "certificate_id",
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

    await queryInterface.addConstraint("Portfolio_Certificates", {
      fields: ["portfolio_id", "certificate_id"],
      type: "unique",
      name: "ux_portfolio_certificates_portfolio_id_certificate_id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Portfolio_Certificates");
  },
};
