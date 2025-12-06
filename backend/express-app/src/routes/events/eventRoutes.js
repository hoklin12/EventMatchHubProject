const express = require("express");
const router = express.Router();
const eventController = require("../../controllers/eventController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks
const upload = require("../../middleware/uploadMiddleware");

/* //////////////////////////////////////////////////////////////////////////////////
                              Event Organizer Routes
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

// ================== Manage Event POST ==================
// PUT /api/v1/events/:event_id/publish - Publish an event (only for organizers)
router.put(
  "/:event_id/publish",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.publishEvent
);

// PUT /api/v1/events/:event_id/schedule - Schedule an event (only for organizers)
router.put(
  "/:event_id/schedule",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.scheduleEvent
);

// PUT /api/v1/events/:event_id/delete - Delete an event (only for organizers)
router.put(
  "/:event_id/delete",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.deleteEvent
);

// GET /api/v1/events/:event_id/registrations - Get all registrations for an event (only for organizers)
router.get(
  "/:event_id/registrations",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.getAllRegistrationsForEvent
);

// ================== AI Reminder Event ==================
// GET /api/v1/events/:event_id/email-reminders - Check AI-generated event reminders (for organizers)
router.get(
  "/:event_id/email-reminders",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.checkEmailReminderFeature
);

// PUT /api/v1/events/:event_id/email-reminders - Generate AI email reminders for an event (for organizers)
router.put(
  "/:event_id/enable-email-reminders",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.toggleEmailReminderFeature
);

// ================== Manage Event ==================
//POST /api/v1/events/:event_id/registrations/toggle-status - Toggle registration status (approve/reject) (for event organizers)
router.post(
  "/:event_id/registrations/toggle-status",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.toggleParticipantEventApprove
);

/* //////////////////////////////////////////////////////////////////////////////////
                              Event Participant Routes
*/ //////////////////////////////////////////////////////////////////////////////////
//PUT : Update registration status (approve/reject) (for event organizers)
router.put(
  "/:event_id/registrations/:registration_id/status",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  eventController.updateRegistrationStatus
);

//GET: Get event that participant has registered
router.get(
  "/registered-events/lists",
  authMiddleware,
  rbacMiddleware(["participant"]),
  eventController.getEventsRegisteredByParticipant
);

module.exports = router;
