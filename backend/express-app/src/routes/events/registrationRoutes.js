const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/registerController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                              Registration Participant Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Event Registration ==================
// POST /api/v1/events/:event_id/register - Register for an event (only for participants)
router.post(
  "/:event_id/register",
  authMiddleware,
  rbacMiddleware(["participant"]),
  registerController.userRegisterForEvent
);

// ================== Registration Payment ==================
// POST /api/v1/events/:event_id/registration/:registration_id/payment
// Initiate payment for a specific registration (only for participants)
router.post(
  "/:event_id/registration/payment",
  authMiddleware,
  rbacMiddleware(["participant"]),
  registerController.initiateRegistrationPayment
);

// POST /api/v1/events/registration/payment/:md5Hash/status
// Check payment status for a specific registration (only for participants)
router.post(
  "/registration/payment/:md5Hash/status",
  authMiddleware,
  // rbacMiddleware(["participant"]),
  registerController.checkRegisterPaymentStatusMD5
);

module.exports = router;
