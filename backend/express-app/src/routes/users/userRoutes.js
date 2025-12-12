// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks
const { validateUpdateUser } = require("../../middleware/validationMiddleware"); // Assuming you'll create this validator
const { upload, uploadPDF } = require("../../middleware/uploadMiddleware");

/* //////////////////////////////////////////////////////////////////////////////////
                               User Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== User Profile ==================
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
  upload.fields([{ name: "profile", maxCount: 1 }]),
  validateUpdateUser,
  userController.updateCurrentUser
);

// DELETE /api/v1/users/me - Delete current authenticated user's account (example of RBAC)
router.delete(
  "/me",
  authMiddleware,
  rbacMiddleware(["participant", "organizer"]),
  userController.deleteCurrentUser
);

// // GET /api/v1/users/:id - Get public profile of a user (use a different controller method for public)
// router.get("/:id", userController.getUserProfilePublic); // Assuming this method exists

module.exports = router;
