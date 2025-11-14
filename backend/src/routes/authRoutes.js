// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegistration,
  validateLogin,
} = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware"); // For logout

// POST /api/auth/register
router.post("/register", validateRegistration, authController.register);

// POST /api/auth/login
router.post("/login", validateLogin, authController.login);

// POST /api/auth/logout (Requires authMiddleware if server-side invalidation)
// For JWT, typically client-side invalidation (delete token/cookie) is sufficient
router.post("/logout", authMiddleware, authController.logout); // Implement logout if needed

module.exports = router;
