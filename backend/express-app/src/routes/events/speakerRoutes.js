const express = require("express");
const router = express.Router();
const eventSpeakerController = require("../../controllers/eventSpeakerController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware");
const upload = require("../../middleware/uploadMiddleware");

/* //////////////////////////////////////////////////////////////////////////////////
                              Speaker Routes
*/ //////////////////////////////////////////////////////////////////////////////////
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

module.exports = router;
