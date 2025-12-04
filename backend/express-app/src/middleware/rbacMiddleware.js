// src/middleware/rbacMiddleware.js
const rbacMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    // req.user is populated by authMiddleware
    if (!req.user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Authentication required." });
    }

    const userRoles = req.user.roles; // Array of role names from token/user object

    // Check if the user's roles array includes any of the allowedRoles
    const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

    if (!hasPermission) {
      // return res.status(403).json({ status: 'fail', message: 'Forbidden: Insufficient privileges.' });
      return res.status(403).json({
        status: "fail",
        message: "Your role haven't permission to access api",
      });
    }

    next(); // User has the required role, allow access
  };
};

module.exports = rbacMiddleware;
