// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const certificateController = require("../controllers/certificateController");
const authMiddleware = require("../middleware/authMiddleware");
const rbacMiddleware = require("../middleware/rbacMiddleware"); // For role checks
const { validateUpdateUser } = require("../middleware/validationMiddleware"); // Assuming you'll create this validator

// GET /api/v1/users/me - Get current authenticated user's profile
router.get(
  "/me",
  authMiddleware,
  rbacMiddleware(["participant", "organizer"]),
  userController.getCurrentUser
);

// PUT /api/v1/users/me - Update current authenticated user's profile
router.put(
  "/me",
  authMiddleware,
  rbacMiddleware(["participant", "organizer"]),
  validateUpdateUser,
  userController.updateCurrentUser
);

// DELETE /api/v1/users/me - Delete current authenticated user's account (example of RBAC)
router.delete("/me", authMiddleware, userController.deleteCurrentUser);

// // GET /api/v1/users/:id - Get public profile of a user (use a different controller method for public)
// router.get("/:id", userController.getUserProfilePublic); // Assuming this method exists

// POST /api/v1/users/portfolio - Create a portfolio item for the authenticated user
router.post(
  "/portfolio",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userController.createPortfolio
);

//GET /api/v1/users/portfolio - Get all portfolio item
router.get(
  "/portfolio",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userController.getAllPortfolios
);

// GET /api/v1/users/portfolio/:portf_id - Get a specific portfolio item
router.get(
  "/portfolio/:portf_id",
  authMiddleware,
  rbacMiddleware(["organizer", "participant"]),
  userController.getPortfolioById
);

// PUT /api/v1/users/portfolio/:portf_id - Update a portfolio item
router.put(
  "/portfolio/:portf_id",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userController.updatePortfolio
);

// DELETE /api/v1/users/portfolio/:portf_id - Delete a portfolio item
router.delete(
  "/portfolio/:portf_id",
  authMiddleware,
  rbacMiddleware(["participant"]),
  userController.deletePortfolio
);

//Get detail user certificates by cert_id
router.get(
  "/certificates/:cert_id",
  authMiddleware,
  rbacMiddleware(["organizer", "participant"]),
  certificateController.getCertificateById
);

module.exports = router;
