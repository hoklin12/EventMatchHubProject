// src/controllers/userController.js
const models = require("../../models");
const bcrypt = require("bcryptjs"); // For password comparison on update

exports.getCurrentUser = async (req, res, next) => {
  try {
    // req.user is populated by authMiddleware
    const user = await models.User.findByPk(req.user.userId, {
      attributes: { exclude: ["password_hash"] }, // Exclude sensitive data
      include: [{ model: models.Role, as: "Roles", attributes: ["role_name"] }], // Include roles
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found." });
    }

    // Format response to be clean
    res.json({
      status: "success",
      user: {
        user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        organization_name: user.organization_name,
        skills: user.skills,
        roles: user.Roles.map((r) => r.role_name),
      },
    });
  } catch (error) {
    console.error("Get Current User Error:", error);
    next(error);
  }
};

exports.updateCurrentUser = async (req, res, next) => {
  const userId = req.user.userId; // Get ID from authenticated user
  const { full_name, contact_info, skills, organization_name, password_hash } =
    req.body;

  try {
    const user = await models.User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found." });
    }

    // Update fields. Sequelize's update will only save changed fields.
    // The 'password_hash' hook in the model handles hashing if it's changed.
    await user.update({
      full_name,
      contact_info,
      skills,
      organization_name,
      password_hash, // If password_hash is sent, the hook will hash it.
    });

    res.json({
      status: "success",
      message: "User profile updated successfully.",
    });
  } catch (error) {
    console.error("Update User Error:", error);
    next(error);
  }
};

exports.deleteCurrentUser = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    await models.User.destroy({
      where: { user_id: userId },
      force: true,
    });
    res.json({ status: "success", message: "User deleted successfully." });
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

exports.createPortfolio = async (req, res, next) => {
  const userId = req.user.userId;
  const { title, description, certificates } = req.body;
  try {
    const all_certificate_id = [];
    const certificateRecords = await models.Certificate.findAll({
      where: { user_id: userId },
    });
    certificates.forEach((item, index) => {
      if (certificateRecords.find((c) => c.certificate_id === item)) {
        all_certificate_id.push(item);
      }
    });

    const portfolioItemNumber = await models.Portfolio.count({
      where: { user_id: userId },
    });

    const newPortfolio = await models.Portfolio.create({
      portfolio_items_id: portfolioItemNumber + 1,
      user_id: userId,
      title,
      description,
    });

    all_certificate_id.forEach(async (certId) => {
      await newPortfolio.addCertificates(certId);
    });

    // const portfolio = await models.Portfolio.findOne({
    //   where: { user_id: userId },
    //   include: [
    //     {
    //       model: models.Certificate,
    //       as: "Certificates",
    //       attributes: [
    //         "title",
    //         "description",
    //         "issued_date",
    //         "expiration_duration",
    //         "file_link",
    //       ],
    //     },
    //   ],
    // });

    const certificateDetails = [];
    all_certificate_id.forEach((certId) => {
      const cert = certificateRecords.find((c) => c.certificate_id === certId);
      if (cert) {
        certificateDetails.push({
          title: cert.title,
          description: cert.description,
          issued_date: cert.issued_date,
          expiration_duration: cert.expiration_duration,
          file_link: cert.file_link,
        });
      }
    });

    res.json({
      status: "success",
      portfolio: {
        title: newPortfolio.title,
        description: newPortfolio.description,
        certification: certificateDetails,
      },
    });
  } catch (error) {
    console.error("Create Portfolio Error:", error);
    next(error);
  }
};

exports.getAllPortfolios = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const portfolios = await models.Portfolio.findAll({
      where: { user_id: userId },
      include: [
        {
          model: models.Certificate,
          as: "Certificates",
          attributes: [
            "certificate_id",
            "title",
            "description",
            "issued_date",
            "expiration_duration",
            "file_link",
          ],
        },
      ],
    });

    // If user has no portfolios
    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No portfolios found for this user.",
      });
    }

    // Respond with all portfolio details
    res.json({
      status: "success",
      count: portfolios.length,
      portfolios: portfolios
        .sort((a, b) => a.portfolio_items_id - b.portfolio_items_id) // ✅ Order by portfolio_items_id (ascending)
        .map((p) => ({
          portfolio_items_id: p.portfolio_items_id,
          title: p.title,
          description: p.description,
          certificates: p.Certificates.map((c) => ({
            certificate_id: c.certificate_id,
            title: c.title,
            description: c.description,
            issued_date: c.issued_date,
            expiration_duration: c.expiration_duration,
            file_link: c.file_link,
          })),
        })),
    });
  } catch (error) {
    console.error("Read Portfolio Error:", error);
    next(error);
  }
};

exports.deletePortfolio = async (req, res, next) => {
  const userId = req.user.userId;
  const portfolioId = req.params.portf_id;
  try {
    const deletedCount = await models.Portfolio.destroy({
      where: { user_id: userId, portfolio_id: portfolioId },
      force: true,
    });

    if (!deletedCount) {
      return res
        .status(404)
        .json({ status: "fail", message: "Portfolio not found." });
    }

    res.json({ status: "success", message: "Portfolio deleted successfully." });
  } catch (error) {
    console.error("Delete Portfolio Error:", error);
    next(error);
  }
};
