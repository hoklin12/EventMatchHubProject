const models = require("../models");
const {
  checkUserRoleParticipant,
  checkUserRoleOrganizer,
} = require("../utils/checkUserRole");

/* //////////////////////////////////////////////////////////////////////////////////
                          Event Registration Management
*/ //////////////////////////////////////////////////////////////////////////////////
//================== CRUD Event Register ==================
// User register for an event (only for participants)
exports.userRegisterForEvent = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  const { portfolioId, title, description } = req.body;
  try {
    // Check if user is participant
    const checkParticipant = await checkUserRoleParticipant(userId);
    if (checkParticipant === false) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }
    //checking event existence
    const event = await models.Event.findByPk(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ status: "fail", message: "Event not found." });
    }

    const getApplicationFormUser = await models.ApplicationForm.findOne({
      where: { user_id: userId },
      attributes: ["applicationform_id"],
    });
    if (getApplicationFormUser != null) {
      const existingRegistration = await models.Registration.findOne({
        where: {
          applicationform_id: getApplicationFormUser.applicationform_id,
        },
      });
      if (!existingRegistration) {
        return res.status(400).json({
          status: "fail",
          message: "User is already registered for this event.",
        });
      }
    }

    // Checking user already has an application form
    const userApplicationForm = await models.ApplicationForm.findAll({
      where: { user_id: userId },
      attributes: ["applicationform_id"],
    });
    let existedRegister = null;
    userApplicationForm.forEach((form) => {
      existedRegister = models.Registration.findOne({
        where: {
          applicationform_id: form.applicationform_id,
          event_id: eventId,
        },
      });
    });
    if (existedRegister) {
      return res.status(400).json({
        status: "fail",
        message: "User already registered for this event.",
      });
    }

    // Create a new application form for the user
    const newApplicationForm = await models.ApplicationForm.create({
      portfolio_id: portfolioId,
      user_id: userId,
      title: title,
      description: description,
    });

    // Create a new registration linking the user to the event via the application form
    const newRegistration = await models.Registration.create({
      applicationform_id: newApplicationForm.applicationform_id,
      event_id: eventId,
      status: "pending",
      registration_date: new Date(),
    });
    return res.status(201).json({
      status: "success",
      message: "User registered for event successfully.",
      data: {
        registration: newRegistration,
      },
    });
  } catch (error) {
    // console.error("User Register for Event Error:", error);
    next(error);
  }
};
