const express = require("express");
const router = express.Router();
const eventticketController = require("../../controllers/eventTicketController");
const authMiddleware = require("../../middleware/authMiddleware");
const rbacMiddleware = require("../../middleware/rbacMiddleware"); // For role checks

/* //////////////////////////////////////////////////////////////////////////////////
                              Ticket Organizer Routes
*/ //////////////////////////////////////////////////////////////////////////////////
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

/* //////////////////////////////////////////////////////////////////////////////////
                              Ticket Participant Routes
*/ //////////////////////////////////////////////////////////////////////////////////

module.exports = router;
