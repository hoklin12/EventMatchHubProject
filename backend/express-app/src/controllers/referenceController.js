const models = require("../models");

exports.listSkills = async (req, res, next) => {
  try {
    const categorySkill = [];
    const categories = await models.Skill.findAll({
      attributes: [
        [
          models.sequelize.fn("DISTINCT", models.sequelize.col("category")),
          "category",
        ],
      ],
      order: [["category", "ASC"]],
    });
    for (const categoryObj of categories) {
      const category = categoryObj.get("category");
      const skills = await models.Skill.findAll({
        where: { category },
        attributes: ["skill_id", "skill_name"],
        order: [["skill_name", "ASC"]],
      });
      categorySkill.push({ category, skills });
    }
    res.status(200).json({ status: "success", data: categorySkill });
  } catch (error) {
    next(error);
  }
};

exports.listTypes = async (req, res, next) => {
  try {
    const types = await models.Type.findAll({
      attributes: ["type_id", "type_name"],
      order: [["type_name", "ASC"]],
    });
    res.status(200).json({ status: "success", data: types });
  } catch (error) {
    next(error);
  }
};

// List all type-skill links
exports.listTypeSkills = async (req, res, next) => {
  try {
    const typeSkills = await models.TypeSkill.findAll({
      attributes: ["type_id", "skill_id"],
      order: [
        ["type_id", "ASC"],
        ["skill_id", "ASC"],
      ],
    });
    res.status(200).json({ status: "success", data: typeSkills });
  } catch (error) {
    next(error);
  }
};
