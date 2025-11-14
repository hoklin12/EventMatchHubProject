// src/controllers/authController.js
const models = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // For password comparison

// Helper to generate JWT
const generateToken = (user) => {
  // Get role names for the token payload
  const roleNames = user.Roles.map((role) => role.role_name); // Assuming Role model has 'role_name'
  return jwt.sign(
    { userId: user.user_id, email: user.email, roles: roleNames },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiration
  );
};

exports.register = async (req, res, next) => {
  const { email, password_hash, full_name, organization_name, skills } =
    req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists with this email.",
      });
    }
    // 2. Create User (password_hash will be hashed by the model hook)
    // Do not set user_id here; let the database assign the auto-increment integer PK
    const newUser = await models.User.create({
      email,
      password_hash, // Raw password - will be hashed before saving
      full_name,
      organization_name,
      skills,
    });

    // 3. Assign Default Role: 'participant'
    const participantRole = await models.Role.findOne({
      where: { role_name: "participant" },
    });
    if (!participantRole) {
      // This is a critical setup error if the default role isn't seeded
      console.error("FATAL: 'participant' role not found in DB!");
      return res
        .status(500)
        .json({ message: "Internal server error: role setup issue." });
    }
    await newUser.addRole(participantRole); // Use Sequelize's association method

    // 4. Fetch user with roles to generate token
    const userWithRoles = await models.User.findByPk(newUser.user_id, {
      include: [{ model: models.Role, as: "Roles", attributes: ["role_name"] }], // Include roles in payload
    });

    // 5. Generate JWT
    const token = generateToken(userWithRoles);

    // 6. Send response
    res.status(201).json({
      status: "success",
      message: "User registered successfully!",
      token,
      user: {
        // user_id: userWithRoles.user_id,
        email: userWithRoles.email,
        full_name: userWithRoles.full_name,
        roles: userWithRoles.Roles.map((r) => r.role_name),
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    // Pass to global error handler for consistent response
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password_hash } = req.body;

  try {
    // 1. Find user by email, including their roles
    const user = await models.User.findOne({
      where: { email },
      include: [{ model: models.Role, as: "Roles", attributes: ["role_name"] }],
    });

    if (!user) {
      // User not found
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials." });
    }

    // 2. Compare passwords
    const isMatch = await user.comparePassword(password_hash); // Using the model method

    if (!isMatch) {
      // Password mismatch
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid credentials." });
    }

    // 3. Generate JWT
    const token = generateToken(user);

    // 4. Send response
    res.json({
      status: "success",
      message: "Login successful!",
      token,
      user: {
        // user_id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        roles: user.Roles.map((r) => r.role_name),
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  // For JWT, logout is typically client-side (delete token from storage/cookie).
  // If you need server-side blacklisting, you'd implement that here.
  // For simplicity, we'll just send a success message.
  res.json({
    status: "success",
    message: "Logout successful. Token should be discarded by client.",
  });
};
