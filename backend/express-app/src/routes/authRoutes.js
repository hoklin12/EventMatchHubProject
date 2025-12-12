// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware"); // For logout

// POST /api/v1/auth/participantRegister
router.post(
  "/participantRegister",
  validateRegistration,
  authController.participantRegister
);

// POST /api/v1/auth/organizerRegister
router.post(
  "/organizerRegister",
  validateRegistration,
  authController.organizerRegister
);

// 2. Verification Endpoint (Uses the new controller function)
router.get("/verify-email", authController.verifyEmail);

// POST /api/v1/auth/login
router.post("/login", validateLogin, authController.login);

// POST /api/v1/auth/logout (Requires authMiddleware if server-side invalidation)
// For JWT, typically client-side invalidation (delete token/cookie) is sufficient
router.post("/logout", authMiddleware, authController.logout); // Implement logout if needed

module.exports = router;
