"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CertificateTemplates",
      [
        {
          template_id: "b2t48i8-4e6b-4f8a-hs52-1b2e3f4a5b6c",
          title: "template_001",
          type: "completion",
          example:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/completion/template_001/example.png",
          template:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/completion/template_001/template.png",
          metadata:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/completion/template_001/metadata.json",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          template_id: "ad0a3158-ad37-43b3-92a6-fb301b15bd36",
          title: "template_001",
          type: "appreciation",
          example:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/appreciation/template_001/example.png",
          template:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/appreciation/template_001/template.png",
          metadata:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/appreciation/template_001/metadata.json",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          template_id: "619c5924-fec2-43cf-8ff7-3759d236aa7b",
          title: "template_002",
          type: "appreciation",
          example:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/appreciation/template_002/example.png",
          template:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/appreciation/template_002/template.png",
          metadata:
            "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/template/appreciation/template_002/metadata.json",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CertificateTemplates", null, {});
  },
};
