// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const models = require("../../models");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expects "Bearer TOKEN"

  if (token == null) {
    return res
      .status(401)
      .json({ status: "fail", message: "Authorization token is missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user to attach to req.user
    // IMPORTANT: Fetch the user with their roles for RBAC checks later
    const user = await models.User.findByPk(decoded.userId, {
      include: [{ model: models.Role, as: "Roles", attributes: ["role_name"] }], // Fetch roles
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid token or user not found." });
    }

    // Attach user object to the request for use in subsequent middleware/routes
    req.user = {
      userId: user.user_id,
      email: user.email,
      roles: user.Roles.map((role) => role.role_name), // Store role names as an array
    };

    next(); // User is authenticated, proceed
  } catch (err) {
    // Handle JWT errors (e.g., expired token, invalid signature)
    res
      .status(401)
      .json({ status: "fail", message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
