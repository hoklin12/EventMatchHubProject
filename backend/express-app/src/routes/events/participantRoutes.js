const express = require("express");
const router = express.Router();
const participantController = require("../../controllers/partcipantController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                              Participant Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Manage Event Participants ==================
// GET /api/v1/events/:event_id/participants - View participants of an event (only for organizers)
router.get(
  "/:event_id/participants",
  authMiddleware,
  rbacMiddleware(["organizer"]),
  participantController.viewEventParticipants
);

module.exports = router;
