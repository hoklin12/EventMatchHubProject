"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CertificateTemplates", {
      template_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("appreciation", "completion"),
        allowNull: false,
      },
      example: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      template: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      metadata: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CertificateTemplates");
  },
};
