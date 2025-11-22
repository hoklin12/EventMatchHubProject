"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Skills", [
      // ==========================
      // 💻 PROGRAMMING LANGUAGES
      // ==========================
      {
        skill_id: "b3e0cf32-5ffc-458a-9b03-f345725aee00",
        skill_name: "JavaScript",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "ae99efc9-7aa5-4f97-9ca2-f5f7da76bf49",
        skill_name: "Python",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "723ac71f-cb8d-470b-9471-ce6d0ec23f01",
        skill_name: "Java",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "1cee21b0-2915-48ec-9ecf-cfe5039e8b65",
        skill_name: "C#",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "bd52d275-f02f-43d0-ab3f-602b673dd064",
        skill_name: "C++",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "dca1dc52-504c-4e66-9bfe-dcc5031cae9c",
        skill_name: "PHP",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "1d169a2f-0e5a-486f-ac57-24a700af192b",
        skill_name: "Go",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "8cb072bd-7419-4506-a33a-3489593b5377",
        skill_name: "Rust",
        category: "Programming",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 🌐 WEB DEVELOPMENT
      // ==========================
      {
        skill_id: "9f3c19bd-8f3c-4c1e-b871-5fa414d430bf",
        skill_name: "HTML",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "35fc884f-605a-4c04-93e7-138b061589ea",
        skill_name: "CSS",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "6f4ec8ea-3f38-4b93-b435-3d15292373ce",
        skill_name: "React",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "ca98a2a2-40ae-4605-99e8-a7f8a1f51337",
        skill_name: "Vue.js",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "2a4f6ae9-fc97-444a-ba82-17e5e4ce033e",
        skill_name: "Angular",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "130be34c-91ab-4a20-bd5c-a070e55dfcba",
        skill_name: "Node.js",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "5c82f3f2-e5de-4af7-aaf7-cd607d99551e",
        skill_name: "Express.js",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "72788445-876e-44d3-9a26-4696fb639a57",
        skill_name: "Laravel",
        category: "Web Development",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 📱 MOBILE DEVELOPMENT
      // ==========================
      {
        skill_id: "09440850-fe75-4f82-83c9-d070737c1d8c",
        skill_name: "Flutter",
        category: "Mobile Development",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "3e421143-b6c8-4f34-a96d-bd98a524c6ce",
        skill_name: "React Native",
        category: "Mobile Development",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 🧠 AI & MACHINE LEARNING
      // ==========================
      {
        skill_id: "7ad73302-74da-4bfb-b3e5-fb80d728c3b8",
        skill_name: "Machine learning",
        category: "Artificial Intelligence",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "cb61db47-f479-4769-b6d7-bcb0a3e2ee44",
        skill_name: "Deep learning",
        category: "Artificial Intelligence",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "3fd6f4c6-2e68-4fe7-9a73-44ebcbb7a0fc",
        skill_name: "TensorFlow",
        category: "Artificial Intelligence",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "2c9e3c55-6ca4-4fd7-a7db-df892d7b9cf5",
        skill_name: "PyTorch",
        category: "Artificial Intelligence",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 📊 DATABASE
      // ==========================
      {
        skill_id: "2a3e8d8e-9ac5-4e05-aa7a-1db2613e3fad",
        skill_name: "MySQL",
        category: "Database",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "8dc7c15d-0bfe-4d8f-96a9-1888d7f51de7",
        skill_name: "PostgreSQL",
        category: "Database",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "816eb526-20f1-4e00-a595-dae1d4f0584a",
        skill_name: "MongoDB",
        category: "Database",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // ☁️ CLOUD SKILLS
      // ==========================
      {
        skill_id: "b522f44e-1c29-4c8f-bf57-879f926b8c71",
        skill_name: "AWS",
        category: "Cloud",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "9bdeee51-c190-441e-9836-ab985f870ec6",
        skill_name: "Azure",
        category: "Cloud",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "b4aa87e8-8180-4fd7-a7f0-7b7fbfc4a146",
        skill_name: "Google Cloud",
        category: "Cloud",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 🎨 DESIGN & CREATIVE
      // ==========================
      {
        skill_id: "da7a21e4-8536-4a3e-8d5e-e7e30f501a33",
        skill_name: "UI/UX Design",
        category: "Design",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "6b4ff27d-3b40-4bb8-9dbe-6e00f0ca2805",
        skill_name: "Figma",
        category: "Design",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 📢 DIGITAL MARKETING
      // ==========================
      {
        skill_id: "595e665e-992f-49a6-8610-0a62d33b6b52",
        skill_name: "SEO",
        category: "Digital Marketing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "2d195436-568c-4a31-9851-79e4d00b59e5",
        skill_name: "Social media marketing",
        category: "Digital Marketing",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 🧠 SOFT SKILLS
      // ==========================
      {
        skill_id: "dd244a9b-6d33-430e-86a0-8db679d4f265",
        skill_name: "Communication",
        category: "Soft Skill",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "b34087b7-b167-442c-aa29-dfd8b8f55ddc",
        skill_name: "Teamwork",
        category: "Soft Skill",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "af2e10bd-8eed-40b6-af28-071bb7c919e9",
        skill_name: "Leadership",
        category: "Soft Skill",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "0859ec81-37cc-402b-a1e1-6dc84743a435",
        skill_name: "Public speaking",
        category: "Soft Skill",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "22fd6343-9d22-4d65-9f34-a4a1df59baf7",
        skill_name: "Time management",
        category: "Soft Skill",
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ==========================
      // 📊 BUSINESS & MANAGEMENT
      // ==========================
      {
        skill_id: "fd139cf4-c70b-497c-bd3f-10f41740d6b2",
        skill_name: "Project management",
        category: "Management",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        skill_id: "9cf413c6-1e7e-4b52-b92c-b0e8ccfeee28",
        skill_name: "Business analysis",
        category: "Management",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Skills", null, {});
  },
};
