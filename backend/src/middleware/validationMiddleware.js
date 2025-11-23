// src/middleware/validationMiddleware.js
const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address."),
  body("password_hash")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 12 })
    .withMessage("Password must be at least 12 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage(
      "Password must contain at least one special character (!@#$%^&*. etc)."
    ),
  body("full_name").notEmpty().withMessage("Full name is required."),
  // Add validation for organization_name, skills if they are required
  // body('organization_name').optional(),
  // body('skills').optional(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors clearly
      return res.status(400).json({
        status: "fail",
        errors: errors
          .array()
          .map((err) => ({ msg: err.msg, param: err.param })),
      });
    }
    next();
  },
];

const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address."),
  body("password_hash").notEmpty().withMessage("Password is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors
          .array()
          .map((err) => ({ msg: err.msg, param: err.param })),
      });
    }
    next();
  },
];

// Add other validators as needed (e.g., for updating profile)
// Validator for updating user's profile
const validateUpdateUser = [
  // optional fields — validate if present
  body("full_name")
    .optional()
    .isString()
    .withMessage("Full name must be a string."),
  body("organization_name").optional().isString(),
  body("password_hash")
    .optional()
    .isLength({ min: 12 })
    .withMessage("Password must be at least 12 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character."),

  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array of skill IDs."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "fail",
        errors: errors
          .array()
          .map((err) => ({ msg: err.msg, param: err.param })),
      });
    }
    next();
  },
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateUpdateUser,
};
