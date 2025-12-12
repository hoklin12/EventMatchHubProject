const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/paymentController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                              Plan Payment Organizer Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// POST /plan/initiate-subscription
router.post(
  "/plan/initiate-subscription",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  paymentController.initiateSubscriptionPayment
);

// GET /plan/checkPaymentStatus/:md5Hash
router.get(
  "/plan/status/:md5Hash",
  authMiddleware,
  paymentController.checkPaymentStatusMD5
);

/* //////////////////////////////////////////////////////////////////////////////////
                              Ticket Participant Routes
*/ //////////////////////////////////////////////////////////////////////////////////

module.exports = router;
