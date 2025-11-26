const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const eventController = require("../controllers/eventController");
const registerController = require("../controllers/registerController");
const participantController = require("../controllers/partcipantController");
const eventticketController = require("../controllers/eventTicketController");
const eventSpeakerController = require("../controllers/eventSpeakerController");
const eventFormFieldController = require("../controllers/eventFormFieldController");
const authMiddleware = require("../middleware/authMiddleware");
const rbacMiddleware = require("../middleware/rbacMiddleware"); // For role checks
const upload = require("../middleware/uploadMiddleware");

/* //////////////////////////////////////////////////////////////////////////////////
                              Event Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// GET /api/v1/events/ - List all events (accessible to all authenticated users)
router.get("/", authMiddleware, eventController.listEvents);

// ================== CRUD Event ==================
// POST /api/v1/events/ - Create a new event (only for organizers)
router.post(
  "/",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  upload.single("theme"),
  eventController.createEvent
);

// GET /api/v1/events/:event_id - Get event details (accessible to all authenticated users)
router.get("/:event_id", authMiddleware, eventController.viewSpecificEvent);

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

// ================== Event Registration ==================
// POST /api/v1/events/:event_id/register - Register for an event (only for participants)
router.post(
  "/:event_id/register",
  authMiddleware,
  rbacMiddleware(["participant"]),
  registerController.userRegisterForEvent
);

// ================== Read and Update Event Ticket ==================
// GET /api/v1/events/:event_id/tickets - View event ticket (only for organizers)
router.get(
  "/:event_id/tickets",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventticketController.viewEventTicket
);

// PUT /api/v1/events/:event_id/tickets - Edit event ticket (only for organizers)
router.put(
  "/:event_id/tickets",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventticketController.updateEventTicket
);

// ================== Create, Read, Update Event Speaker ==================
// POST /api/v1/events/:event_id/speakers - Add a speaker to an event (only for organizers)
router.post(
  "/:event_id/speakers",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  upload.fields([{ name: "photo" }]),
  eventSpeakerController.addEventSpeaker
);
// GET /api/v1/events/:event_id/speakers - View speakers of an event (accessible to all authenticated users)
router.get(
  "/:event_id/speakers",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventSpeakerController.viewEventSpeakers
);
// // PUT /api/v1/events/:event_id/speakers/:speaker_id - Update a speaker's details (only for organizers)
router.put(
  "/:event_id/speakers",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  upload.fields([{ name: "photo" }]),
  eventSpeakerController.updateEventSpeaker
);

// =================== Manage Event Form Fields ==================
// GET /api/v1/events/:event_id/form-fields - View form fields for an event (only for organizers)
router.get(
  "/:event_id/form-fields",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventFormFieldController.viewEventFormFields
);

//PUT /api/v1/events/:event_id/form-fields - Update form fields for an event (only for organizers)
router.put(
  "/:event_id/form-fields",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventFormFieldController.updateEventFormFields
);

// ================== Manage Event Participants ==================
// GET /api/v1/events/:event_id/participants - View participants of an event (only for organizers)
router.get(
  "/:event_id/participants",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  participantController.viewEventParticipants
);

// ================== Manage Event Certificates ==================
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
