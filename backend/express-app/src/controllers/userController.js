// src/controllers/userController.js
const models = require("../models");
const bcrypt = require("bcryptjs"); // For password comparison on update
const { checkUserRoleParticipant } = require("../utils/checkUserRole");
const {
  uploadFile,
  replaceFile,
  deleteFile,
} = require("../services/storageService");
const { FOLDERS, BUCKET_NAME } = require("../config/supabaseConfig");
const { fileTypeFromBuffer } = require("file-type");
const axios = require("axios");

// Get current authenticated user's profile
exports.getCurrentUser = async (req, res, next) => {
  try {
    // req.user is populated by authMiddleware
    const user = await models.User.findByPk(req.user.userId, {
      attributes: { exclude: ["password_hash"] }, // Exclude sensitive data
      include: [{ model: models.Role, as: "Roles", attributes: ["role_name"] }], // Include roles
    });
    const skill = await models.UserSkills.findAll({
      where: { user_id: req.user.userId },
      attributes: ["skill_id"],
    });
    const skills = skill.map((s) => s.skill_id);
    const skillNames = [];
    for (const skillItem of skills) {
      const skillDetail = await models.Skill.findByPk(skillItem, {
        attributes: ["skill_name"],
      });
      skillNames.push(skillDetail.skill_name);
    }

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found." });
    }

    // Format response to be clean
    return res.status(200).json({
      status: "success",
      user: {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
        organization_name: user.organization_name,
        roles: user.Roles.map((r) => r.role_name),
        skills: skillNames,
      },
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    next(error);
  }
};

// Update current authenticated user's profile
exports.updateCurrentUser = async (req, res, next) => {
  const userId = req.user.userId; // Get ID from authenticated user
  const userData = JSON.parse(req.body.data);
  const profileFile = req.files["profile"] ? req.files["profile"][0] : null;

  try {
    const user = await models.User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found." });
    }

    const existingUserData = await models.User.findByPk(userId);
    existingUserData.full_name = userData.full_name;
    existingUserData.phone_number = userData.phone_number;
    existingUserData.organization_name = userData.organization_name;
    existingUserData.position = userData.position;

    let fileType;
    if (profileFile != null) {
      fileType = await fileTypeFromBuffer(profileFile.buffer);
    } else {
      if (user.profile != null) {
        const response = await axios.get(user.profile, {
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(response.data);
        const fileType = await fileTypeFromBuffer(buffer);
        await deleteFile(
          BUCKET_NAME.USER,
          `${FOLDERS.PROFILE}/${userId}.${fileType.ext}`
        );
        existingUserData.profile = null;
      }
    }
    if (user.profile === null) {
      // Upload new profile picture
      if (profileFile) {
        const uploadResult = await uploadFile(
          BUCKET_NAME.USER,
          profileFile.buffer,
          `${FOLDERS.PROFILE}/${userId}.${fileType.ext}`,
          fileType.mime
        );
        existingUserData.profile = uploadResult;
      }
    } else {
      // Replace existing profile picture
      if (profileFile) {
        const replaceResult = await replaceFile(
          BUCKET_NAME.USER,
          profileFile.buffer,
          `${FOLDERS.PROFILE}/${userId}.${fileType.ext}`,
          fileType.mime
        );
        existingUserData.profile = replaceResult;
      }
    }

    await models.User.update(
      {
        full_name: existingUserData.full_name,
        phone_number: existingUserData.phone_number,
        organization_name: existingUserData.organization_name,
        position: existingUserData.position,
        profile: existingUserData.profile,
      },
      { where: { user_id: userId } }
    );

    // Update skills if provided
    await models.UserSkills.destroy({ where: { user_id: userId } });

    // Then, add new skills
    for (const skillId of userData.skills) {
      await models.UserSkills.create({
        user_id: userId,
        skill_id: skillId,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User profile updated successfully.",
    });
  } catch (error) {
    console.error("Update User Error:", error);
    next(error);
  }
};

// Delete current authenticated user's profile
exports.deleteCurrentUser = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    await models.User.destroy({
      where: { user_id: userId },
      force: true,
    });
    return res
      .status(200)
      .json({ status: "success", message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete User Error:", error);
    next(error);
  }
};

// exports.getUserProfilePublic = async (req, res, next) => {
//   const userId = req.params.id;
//   try {
//     const user = await models.User.findByPk(userId, {
//       attributes: {
//         exclude: [
//           "password_hash",
//           "email",
//           "contact_info",
//           "created_at",
//           "updated_at",
//         ],
//       }, // Exclude sensitive data
//       include: [
//         {
//           model: models.Role,
//           as: "Roles",
//           attributes: ["role_name"],
//           // You might filter roles shown publicly if desired
//           // where: { role_name: 'participant' }
//         },
//         // Include public portfolio items if that's how you model it
//         // {
//         //   model: models.Portfolio,
//         //   as: 'Portfolios',
//         //   attributes: ['title', 'description', 'date_achieved'],
//         //   // Include only verified certificates if applicable and public
//         // }
//       ],
//     });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ status: "fail", message: "User profile not found." });
//     }

//     // Filtered user object for public view
//     res.json({
//       status: "success",
//       user: {
//         user_id: user.user_id,
//         full_name: user.full_name,
//         organization_name: user.organization_name,
//         roles: user.Roles.map((r) => r.role_name),
//         skills: user.skills, // Decide if skills are public
//         // publicPortfolioData: user.Portfolios ...
//       },
//     });
//   } catch (error) {
//     console.error("Get Public User Profile Error:", error);
//     next(error);
//   }
// };
