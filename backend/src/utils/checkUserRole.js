module.exports = async function checkUserRoleOrganizer(user) {
  //Check User is Organizer
  const organizerId = await models.Role.findOne({
    where: { role_name: "organizer" },
    attributes: ["role_id"],
  });
  const isOrganizerRole = await models.UserRoles.findOne({
    where: {
      user_id: user.userId,
      role_id: organizerId.role_id,
    },
  });
  if (!isOrganizerRole) {
    return res.status(404).json({
      status: "fail",
      message: "User is not an organizer.",
    });
  }
};

module.exports = async function checkUserRoleParticipant(user) {
  //Check User is Organizer
  const organizerId = await models.Role.findOne({
    where: { role_name: "participant" },
    attributes: ["role_id"],
  });
  const isOrganizerRole = await models.UserRoles.findOne({
    where: {
      user_id: user.userId,
      role_id: organizerId.role_id,
    },
  });
  if (!isOrganizerRole) {
    return res.status(404).json({
      status: "fail",
      message: "User is not an organizer.",
    });
  }
};
