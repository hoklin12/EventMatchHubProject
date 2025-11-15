// src/controllers/userController.js
const models = require("../../models");
const bcrypt = require("bcryptjs"); // For password comparison on update

// Get current authenticated user's profile
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
    return res.status(200).json({
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

// Update current authenticated user's profile
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

// Create Portfolio only for participant role
exports.createPortfolio = async (req, res, next) => {
  const userId = req.user.userId;
  const { title, description, certificates } = req.body;
  try {
    //Check only participant role can create portfolio
    await checkUserRoleParticipant(req.user);

    //Check certificate duplicates and belong to the user
    const hasDuplicate =
      new Set(certificates.map((c) => c.certificate_id)).size !==
      certificates.length;

    const isCertificateBelongToUser = await models.Certificate.findAll({
      where: { user_id: userId },
    });

    if (hasDuplicate || !isCertificateBelongToUser) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid certificates provided.",
      });
    }

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

    return res.status(201).json({
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

// Get all portfolios only for the organizer role
exports.getAllPortfolios = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    //Check only organizer role can get all portfolios
    await checkUserRoleOrganizer(req.user);

    // Fetch all portfolios with associated certificates
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
    return res.status(200).json({
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

// Get specific Portfolio by portfolio_id only for participant role and organizer of event that participant join
exports.getPortfolioById = async (req, res, next) => {
  const userId = req.user.userId;
  const portfolioId = req.params.portf_id;
  try {
    // //Get portfolio ownership
    // const ownder = await models.Portfolio.findOne({
    //   where: { portfolio_id: portfolioId },
    //   attributes: ["user_id"],
    // });

    // //Get portfolio of owner
    // const getOwnerPortfolio = await models.Portfolio.findAll({
    //   where: { user_id: ownder.user_id },
    // });

    // const getPortfolioThisCertificate =
    //   await models.PortfolioCertificates.findAll({
    //     where: { portfolio_id: portfolioId },
    //   });
    // const portfolioThisCertificate = getPortfolioThisCertificate.map(
    //   (p) => p.portfolio_id
    // );
    // console.log(
    //   "Portfolio This Certificate:",
    //   portfolioThisCertificate.map((p) => p)
    // );

    // const ownerPortfolioIds = getOwnerPortfolio.map((p) => p.portfolio_id);
    // console.log("Portfolio This Certificate:", ownerPortfolioIds);
    let portfolio = null;
    //Check only event that participant join can access portfolio of participant

    //Checking user role
    const userRoles = req.user.roles;
    if (userRoles.includes("organizer")) {
      // Organizer can access only if the participant joined their event
      // Finding Registered Events by organizer
      const registeredEvents = await models.Registration.findAll({
        include: [
          {
            model: models.ApplicationForm,
            as: "ApplicationForm",
            where: { portfolio_id: portfolioId },
            attributes: ["applicationform_id"],
          },
        ],
        attributes: ["event_id"],
      });

      const eventIdsThisPortfolio = registeredEvents.map((re) => re.event_id);
      let allOrganizerOfEvents = [];
      let organizerOfEvents = null;
      for (const eventId of eventIdsThisPortfolio) {
        console.log("Event IDs this portfolio:", eventId);
        organizerOfEvents = await models.Event.findOne({
          where: { event_id: eventId },
          attributes: ["user_id"],
        });
        allOrganizerOfEvents.push(organizerOfEvents.user_id);
      }

      //Remove duplicate organizer IDs
      allOrganizerOfEvents = [...new Set(allOrganizerOfEvents)];

      if (!allOrganizerOfEvents.includes(userId)) {
        return res.status(403).json({
          status: "fail",
          message: "You do not have permission to access this portfolio.",
        });
      }
      // Find portfolio by portfolio_id
      portfolio = await models.Portfolio.findOne({
        where: { portfolio_id: portfolioId },
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
      if (!portfolio) {
        return res
          .status(404)
          .json({ status: "fail", message: "Portfolio not found." });
      }
    } else if (userRoles.includes("participant")) {
      // Participant can access only their own portfolio
      // Find portfolio by user_id and portfolio_id
      portfolio = await models.Portfolio.findOne({
        where: { user_id: userId, portfolio_id: portfolioId },
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
      if (!portfolio) {
        return res
          .status(404)
          .json({ status: "fail", message: "Portfolio not found." });
      }
    } else {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to access this portfolio.",
      });
    }
    if (portfolio === null) {
      return res.status(404).json({
        status: "fail",
        message: "Portfolio not found.",
      });
    }
    return res.status(200).json({
      status: "success",
      portfolio: {
        portfolio_id: portfolio.portfolio_id,
        portfolio_items_id: portfolio.portfolio_items_id,
        title: portfolio.title,
        description: portfolio.description,
        certificates: portfolio.Certificates.map((c) => ({
          certificate_id: c.certificate_id,
          title: c.title,
          description: c.description,
          issued_date: c.issued_date,
          expiration_duration: c.expiration_duration,
          file_link: c.file_link,
        })),
      },
    });
  } catch (error) {
    console.error("Get Portfolio By ID Error:", error);
    next(error);
  }
};

// Delete Portfolio by portfolio_id only for participant role
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

    return res
      .status(200)
      .json({ status: "success", message: "Portfolio deleted successfully." });
  } catch (error) {
    console.error("Delete Portfolio Error:", error);
    next(error);
  }
};

// Update Portfolio by portfolio_id only for participant role
exports.updatePortfolio = async (req, res, next) => {
  const userId = req.user.userId;
  const portfolioId = req.params.portf_id;
  const { title, description, certificates } = req.body;

  try {
    //Check only participant role can update portfolio
    await checkUserRoleParticipant(req.user);

    // Find portfolio by user_id and portfolio_id
    const portfolio = await models.Portfolio.findOne({
      where: { user_id: userId, portfolio_id: portfolioId },
    });

    if (!portfolio) {
      return res
        .status(404)
        .json({ status: "fail", message: "Portfolio not found." });
    }

    // Update portfolio info
    await portfolio.update({ title, description });

    // 1️ Check duplicates
    if (new Set(certificates).size !== certificates.length) {
      return res.status(400).json({
        status: "fail",
        message: "Duplicate certificate_id detected.",
      });
    }

    // 2️ Check ownership (use for..of instead of forEach)
    for (const id of certificates) {
      const belongs = await models.Certificate.findOne({
        where: { user_id: userId, certificate_id: id },
      });

      if (!belongs) {
        return res.status(400).json({
          status: "fail",
          message: `You do not own this certificate id: ${id}`,
        });
      }
    }

    // 3️ Get current certificates
    const current = await models.PortfolioCertificates.findAll({
      where: { portfolio_id: portfolioId },
      attributes: ["certificate_id"],
    });

    const currentIds = current.map((c) => c.certificate_id);

    // 4️ Remove unselected certificates
    for (const id of currentIds) {
      if (!certificates.includes(id)) {
        await portfolio.removeCertificates(id);
      }
    }

    // 5️ Add new certificates
    for (const id of certificates) {
      if (!currentIds.includes(id)) {
        await portfolio.addCertificates(id);
      }
    }

    // 6️ Build response
    const readCertificates = await portfolio.getCertificates();

    const certificateDetails = readCertificates.map((cert) => ({
      certificate_id: cert.certificate_id,
      title: cert.title,
      description: cert.description,
      issued_date: cert.issued_date,
      expiration_duration: cert.expiration_duration,
      file_link: cert.file_link,
    }));

    return res.status(200).json({
      status: "success",
      message: "Portfolio updated successfully.",
      data: {
        portfolio_id: portfolio.portfolio_id,
        portfolio_items_id: portfolio.portfolio_items_id,
        title: portfolio.title,
        description: portfolio.description,
        certificates: certificateDetails,
      },
    });
  } catch (error) {
    console.error("Update Portfolio Error:", error);
    next(error);
  }
};
