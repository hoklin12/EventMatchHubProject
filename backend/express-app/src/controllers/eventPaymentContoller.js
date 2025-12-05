const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");
const { checkUserPlanUtils } = require("../utils/checkUserPlanUtils");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");

exports.setupEventPayment = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const {
    bakongAccountID,
    merchantName,
    acquiringBank,
    merchantCity,
    mobileNumber,
  } = req.body;
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

    // Check user plan
    const featureId = await checkUserPlanUtils(userId);
    if (!featureId) {
      return res.status(403).json({
        status: "fail",
        message: "You need to have an active plan to setup event payment.",
      });
    }

    // const eventTicket = await models.EventTicket.findOne({
    //   where: { event_id: eventId },
    // });
    // const data = {
    //   price: eventTicket.price,
    //   bakongAccountID: "vichet_kao@aclb",
    //   merchantName: "Vichet Kao",
    //   acquiringBank: "Aclena Bank",
    //   merchantCity: "Phnom Penh",
    //   mobileNumber: "85577613512",
    //   storeLabel: "Event Match Hub Plan",
    //   plan_name: plan.plan_name,
    // };

    const eventBakong = await models.EventBakong.findOne({
      where: { event_id: eventId },
    });

    if (eventBakong) {
      return res.status(400).json({
        status: "fail",
        message: `Event payment for event ID ${eventId} is already set up.`,
      });
    }

    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({
        status: "fail",
        message: `Event with ID ${eventId} not found.`,
      });
    }

    const organizationName = await models.User.findByPk(event.user_id);

    const featureID = await checkUserPlanUtils(userId);

    const eventTicket = await models.EventTicket.findOne({
      where: { event_id: eventId },
    });

    if (featureID === "8512e6f3-2bb2-4b9a-9af1-d967d5ffbdf1") {
      await models.EventBakong.create({
        event_id: eventId,
        bakongAccountID: bakongAccountID,
        merchantName: merchantName,
        acquiringBank: acquiringBank,
        merchantCity: merchantCity,
        mobileNumber: mobileNumber,
        eventticket_id: eventTicket.eventticket_id,
        storeLabel: organizationName.organization_name,
        plan_name: "Buy Ticket",
      });
    } else {
      return res.status(403).json({
        status: "fail",
        message: "You need to have an active plan to setup event payment.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Event payment setup successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create event payment: ${error.message}` });
    next(error);
  }
};

exports.editEventPayment = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const {
    bakongAccountID,
    merchantName,
    acquiringBank,
    merchantCity,
    mobileNumber,
  } = req.body;
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
    const eventBakong = await models.EventBakong.findOne({
      where: { event_id: eventId },
    });
    if (!eventBakong) {
      return res.status(404).json({
        status: "fail",
        message: `Event payment for event ID ${eventId} not found.`,
      });
    }
    await eventBakong.update({
      bakongAccountID: bakongAccountID,
      merchantName: merchantName,
      acquiringBank: acquiringBank,
      merchantCity: merchantCity,
      mobileNumber: mobileNumber,
    });
    res.status(200).json({
      status: "success",
      message: "Event payment updated successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update event payment: ${error.message}` });
    next(error);
  }
};
