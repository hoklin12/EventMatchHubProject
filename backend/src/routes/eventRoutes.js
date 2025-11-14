const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const rbacMiddleware = require("../middleware/rbacMiddleware"); // For role checks
const { validateUpdateUser } = require("../middleware/validationMiddleware"); // Assuming you'll create this validator

// POST /api/events/:event_id/register - Register for an event (only for participants)
router.post(
  "/:event_id/register",
  authMiddleware,
  rbacMiddleware(["participant"]),
  eventController.userRegisterForEvent
);

// GET /api/events/ - List all events (accessible to all authenticated users)
router.get("/", authMiddleware, eventController.listEvents);

// GET /api/events/:event_id - Get event details (accessible to all authenticated users)
router.get("/:event_id", authMiddleware, eventController.viewSpecificEvent);

// GET /api/events/:event_id/partcipants - View participants of an event (only for organizers)
router.get(
  "/:event_id/participants",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.viewEventParticipants
);

// GET /api/events/:event_id/certificates/:cert_id - View specific certificate details
router.get(
  "/:event_id/certificates/:cert_id",
  authMiddleware,
  eventController.viewSpecificCertificate
);

// GET /api/events/:event_id/certificates - View all certificates for an event (only for organizers)
router.get(
  "/:event_id/certificates",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.viewAllCertificates
);

module.exports = router;
