const express = require("express");
const router = express.Router();

router.use(`/auth`, require("./authRoutes"));
router.use(`/references`, require("./referenceRoutes"));

/* //////////////////////////////////////////////////////////////////////////////////
                              Manage All Event Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Organizer ==================
router.use("/events", require("./events/eventRoutes"));
router.use("/events", require("./events/speakerRoutes"));
router.use("/events", require("./events/ticketRoutes"));
router.use("/events", require("./events/formFieldRoutes"));
router.use("/events", require("./events/certificateRoutes"));
router.use("/events", require("./events/participantRoutes"));
router.use("/events", require("./events/paymentRoutes"));

// ================== Participant ==================
router.use("/events", require("./events/registrationRoutes"));

/* //////////////////////////////////////////////////////////////////////////////////
                        Manage All User Information
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Organizer & Participant ==================
router.use(`/users`, require("./users/userRoutes"));

// ================== Participant ==================
router.use(`/users`, require("./users/certificateRoutes"));
router.use(`/users`, require("./users/portfolioRoutes"));

/* //////////////////////////////////////////////////////////////////////////////////
                        Manage Plan Payment Information
*/ //////////////////////////////////////////////////////////////////////////////////
router.use(`/payments`, require("./payments/planPaymentRoutes"));

module.exports = router;
