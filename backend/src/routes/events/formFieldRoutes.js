const express = require("express");
const router = express.Router();
const eventFormFieldController = require("../../controllers/eventFormFieldController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                              Form Field Routes
*/ //////////////////////////////////////////////////////////////////////////////////
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

module.exports = router;
