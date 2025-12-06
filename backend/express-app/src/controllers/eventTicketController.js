const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");
const { checkUserPlanUtils } = require("../utils/checkUserPlanUtils");
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

    const planID = await checkUserPlanUtils(userId);

    // Update event ticket details
    await eventTicket.update({
      price: price || eventTicket.price,
      quantity: quantity || eventTicket.quantity,
      start_sale_date: start_sale_date || eventTicket.start_sale_date,
      end_sale_date: end_sale_date || eventTicket.end_sale_date,
    });
    switch (planID) {
      case "fa846b73-58a0-4fa3-9f1a-8475ee5da1a2": // Basic plan
        if (quantity > 50) {
          return res.status(400).json({
            status: "fail",
            message: "Basic plan allows a maximum ticket quantity of 50.",
          });
        }
        if (price > 0.0) {
          return res.status(400).json({
            status: "fail",
            message: "Basic plan didn't allow paid event tickets.",
          });
        }
        eventTicket.price = 0.0;
        eventTicket.quantity = quantity;
        eventTicket.start_sale_date = start_sale_date;
        eventTicket.end_sale_date = end_sale_date;
        break;
      case "8c414757-0ce6-4f0d-89e4-97cb9746446e": // Premium plan
        if (quantity > 250) {
          return res.status(400).json({
            status: "fail",
            message: "Basic plan allows a maximum ticket quantity of 50.",
          });
        }
        if (price > 0.0) {
          return res.status(400).json({
            status: "fail",
            message: "Basic plan didn't allow paid event tickets.",
          });
        }
        eventTicket.price = price;
        eventTicket.quantity = quantity;
        eventTicket.start_sale_date = start_sale_date;
        eventTicket.end_sale_date = end_sale_date;
        break;
      case "8512e6f3-2bb2-4b9a-9af1-d967d5ffbdf1": // Enterprise plan
        eventTicket.price = price;
        eventTicket.quantity = quantity;
        eventTicket.start_sale_date = start_sale_date;
        eventTicket.end_sale_date = end_sale_date;
        break;
      default:
        return res.status(400).json({
          status: "fail",
          message: "Invalid user plan.",
        });
    }

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
