const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/registerController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                              Registration Participant Routes
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Event Registration ==================
// POST /api/v1/events/:event_id/register - Register for an event (only for participants)
router.post(
  "/:event_id/register",
  authMiddleware,
  rbacMiddleware(["participant"]),
  registerController.userRegisterForEvent
);

module.exports = router;
