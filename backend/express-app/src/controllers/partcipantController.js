const models = require("../models");
const { checkEventOrganizer } = require("../utils/checkEventOrganizer");
const { checkUserRoleOrganizer } = require("../utils/checkUserRole");

/* //////////////////////////////////////////////////////////////////////////////////
                              Manage Event Participants
*/ //////////////////////////////////////////////////////////////////////////////////
// View participants of an event (only for organizers)
exports.viewEventParticipants = async (req, res, next) => {
  const userId = req.user.userId;
  const eventId = req.params.event_id;
  try {
    // Check if user is participant
    const checkOrganizer = await checkUserRoleOrganizer(userId);
    if (checkOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    //check event organizer
    const isOrganizer = await checkEventOrganizer(userId, eventId);
    if (isOrganizer) {
      return res.status(403).json({
        status: "fail",
        message: `Access denied. You're Not organizer in event ID ${eventId}.`,
      });
    }
    // Fetch participants registered for the event
    const registrations = await models.Registration.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: models.FormSubmission,
          as: "FormSubmission",
          include: [
            {
              model: models.User,
              as: "User",
              attributes: ["user_id", "full_name", "email"],
            },
            {
              model: models.Portfolio,
              as: "Portfolio",
              attributes: ["portfolio_id", "title", "description"],
            },
          ],
        },
      ],
    });

    const portCertMap = {};

    // 1. Get portfolio IDs from registrations
    const portfolioIds = registrations.map(
      (r) => r.FormSubmission.Portfolio.portfolio_id
    );

    // 2. Get all certificate_ids related to those portfolios
    const allCertificateIDs = await Promise.all(
      portfolioIds.map(async (id) => {
        const portfolioCerts = await models.PortfolioCertificates.findAll({
          where: { portfolio_id: id },
          attributes: ["certificate_id"],
        });

        // Map to just certificate_id
        return portfolioCerts.map((pc) => pc.certificate_id);
      })
    );

    // 3. Combine portfolio IDs with their certificates
    const combinedPortfolioCertificate = {};
    portfolioIds.forEach((id, index) => {
      combinedPortfolioCertificate[id] = allCertificateIDs[index] || [];
    });

    // 4. Fetch certificates for each user only once
    await Promise.all(
      registrations.map(async (item) => {
        const portfolioId = item.FormSubmission.Portfolio.portfolio_id;

        if (!portCertMap[portfolioId]) {
          const certs = await models.Certificate.findAll({
            where: {
              certificate_id: combinedPortfolioCertificate[portfolioId],
            },
            attributes: [
              "certificate_id",
              "event_id",
              "organizer_name",
              "description",
              "issued_date",
              "expiration_duration",
              "verification_code",
              "file_link",
            ],
          });

          portCertMap[portfolioId] = certs;
        }
      })
    );
    // 5. Build final response
    const participants = registrations
      .map((item) => {
        const user = item.FormSubmission.User;

        return {
          status: item.status,
          registration_date: item.registration_date,
          updated_at: item.updated_at, // <-- include for sort
          user: user,

          application_form: {
            submission_id: item.FormSubmission.submission_id,
            title: item.FormSubmission.title,
            description: item.FormSubmission.description,
            portfolio: {
              portfolio_id: item.FormSubmission.Portfolio.portfolio_id,
              title: item.FormSubmission.Portfolio.title,
              description: item.FormSubmission.Portfolio.description,
              certifications:
                portCertMap[item.FormSubmission.Portfolio.portfolio_id] || [],
            },
          },
        };
      })
      // SORT BY updated_at DESC (newest first)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    if (participants.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No participants registered for this event.",
      });
    }
    return res.status(200).json({
      status: "success",
      data: participants,
    });
  } catch (error) {
    console.error("View Event Participants Error:", error);
    next(error);
  }
};
