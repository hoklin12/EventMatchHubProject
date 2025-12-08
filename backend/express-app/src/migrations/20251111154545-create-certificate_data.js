"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CertificateDatas", {
      certificatedata_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      template_id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: "ad0a3158-ad37-43b3-92a6-fb301b15bd36",
        references: {
          model: "CertificateTemplates",
          key: "template_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      organizer_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(123),
        allowNull: false,
      },
      issued_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expiration_duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      organizer_director_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      organizer_role: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      signature_file_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      signature_url: {
        type: Sequelize.TEXT,
        allowNull: true,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("CertificateDatas");
  },
};
