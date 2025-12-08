const express = require("express");
const router = express.Router();
const eventPaymentController = require("../../controllers/eventPaymentContoller");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                              Payment Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Manage Event Setup Payment Organizer ==================
// POST /api/v1/events/:event_id/payment-setup - Setup Event Payment
router.post(
  "/:event_id/payment-setup",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventPaymentController.setupEventPayment
);

module.exports = router;
