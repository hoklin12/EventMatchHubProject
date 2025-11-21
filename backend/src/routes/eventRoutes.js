const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const rbacMiddleware = require("../middleware/rbacMiddleware"); // For role checks
const { validateUpdateUser } = require("../middleware/validationMiddleware"); // Assuming you'll create this validator
const upload = require("../middleware/uploadMiddleware");

// POST /api/v1/events/:event_id/register - Register for an event (only for participants)
router.post(
  "/:event_id/register",
  authMiddleware,
  rbacMiddleware(["participant"]),
  eventController.userRegisterForEvent
);

// GET /api/v1/events/ - List all events (accessible to all authenticated users)
router.get("/", authMiddleware, eventController.listEvents);

// POST /api/v1/events/ - Create a new event (only for organizers)
router.post(
  "/",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.createEvent
);

//PUT /api/v1/events/:event_id - Update event details (only for organizers)
router.put(
  "/:event_id",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.updateEvent
);

// DELETE /api/v1/events/:event_id - Delete an event (only for organizers)
router.delete(
  "/:event_id",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.deleteEvent
);

// GET /api/v1/events/:event_id - Get event details (accessible to all authenticated users)
router.get("/:event_id", authMiddleware, eventController.viewSpecificEvent);

// GET /api/v1/events/:event_id/participants - View participants of an event (only for organizers)
router.get(
  "/:event_id/participants",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.viewEventParticipants
);

//POST /api/v1/events/:event_id/certificates/generate - Generate certificates for event participants (only for organizers)
router.post(
  "/:event_id/certificates/generate",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  upload.fields([{ name: "signature", maxCount: 1 }]),
  // upload.single("signature"),
  certificateController.createCertificates
);

// GET /api/v1/events/:event_id/certificates/:cert_id - View specific certificate details
router.get(
  "/:event_id/certificates/:cert_id",
  authMiddleware,
  rbacMiddleware(["organizer", "participant"]),
  certificateController.viewSpecificCertificate
);

// GET /api/v1/events/:event_id/certificates - View all certificates for an event (only for organizers)
router.get(
  "/:event_id/certificates",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  certificateController.viewAllCertificates
);

module.exports = router;

//GET /api/v1/events/certificates/template - Get certificate template (accessible only to organizers)
router.get(
  "/certificates/template",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  certificateController.getCertificateTemplate
);
