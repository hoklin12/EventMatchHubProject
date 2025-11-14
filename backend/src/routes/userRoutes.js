// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const rbacMiddleware = require("../middleware/rbacMiddleware"); // For role checks
const { validateUpdateUser } = require("../middleware/validationMiddleware"); // Assuming you'll create this validator

// GET /api/users/me - Get current authenticated user's profile
router.get("/me", authMiddleware, userController.getCurrentUser);

// PUT /api/users/me - Update current authenticated user's profile
router.put(
  "/me",
  authMiddleware,
  validateUpdateUser,
  userController.updateCurrentUser
);

// DELETE /api/users/me - Delete current authenticated user's account (example of RBAC)
router.delete("/me", authMiddleware, userController.deleteCurrentUser);

// // GET /api/users/:id - Get public profile of a user (use a different controller method for public)
// router.get("/:id", userController.getUserProfilePublic); // Assuming this method exists

// POST /api/users/portfolio - Create a portfolio item for the authenticated user
router.post("/portfolio", authMiddleware, userController.createPortfolio);

//GET /api/users/portfolio - Get all portfolio item
router.get("/portfolio", authMiddleware, userController.getAllPortfolios);

// DELETE /api/users/portfolio/:portf_id - Delete a portfolio item
router.delete(
  "/portfolio/:portf_id",
  authMiddleware,
  userController.deletePortfolio
);

module.exports = router;
