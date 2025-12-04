const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");

/* //////////////////////////////////////////////////////////////////////////////////
                                Manage Event Tickets
*/ //////////////////////////////////////////////////////////////////////////////////
// ================== Read and Update Event Ticket ==================
// View event ticket only for organizers that created the event
exports.viewEventTicket = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
    // Check if user is organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in event ID ${eventId}.`,
      });
    }
    // Find the event ticket
    const eventTicket = await models.EventTicket.findOne({
      where: { event_id: eventId },
    });
    if (!eventTicket) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event ticket not found." });
    }
    return res.status(200).json({
      status: "success",
      data: eventTicket,
    });
  } catch (error) {
    console.log("View Event Ticket Error:", error);
    next(error);
  }
};

// Update event ticket only for organizers that created the event
exports.updateEventTicket = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const { price, quantity, start_sale_date, end_sale_date } = req.body;
  try {
    // Check if user is organizer
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    // Check if user is organizer of the event
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in event ID ${eventId}.`,
      });
    }

    // Find the event ticket
    const eventTicket = await models.EventTicket.findOne({
      where: { event_id: eventId },
    });
    if (!eventTicket) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event ticket not found." });
    }
    // Update event ticket details
    await eventTicket.update({
      price: price || eventTicket.price,
      quantity: quantity || eventTicket.quantity,
      start_sale_date: start_sale_date || eventTicket.start_sale_date,
      end_sale_date: end_sale_date || eventTicket.end_sale_date,
    });

    return res.status(200).json({
      status: "success",
      message: "Event ticket edited successfully.",
      data: eventTicket,
    });
  } catch (error) {
    console.log("Edit Event Ticket Error:", error);
    next(error);
  }
};
