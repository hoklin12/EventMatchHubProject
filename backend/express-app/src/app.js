// src/app.js
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const createError = require("http-errors");
require("./cron/reminderCron");

// Import your database configuration and models
const db = require("./config/database");

// Import your routers
const routes = require("./routes");
// Add other routers later: eventRoutes, registrationRoutes, etc.

const app = express();
const HOST = process.env.HOST || "localhost";
const { API_VERSION } = require("./config/constants");
const PORT = process.env.PORT || 3000;

// --- Middleware Setup ---

// Enable CORS - adjust origins for production!
app.use(cors());

// Security Headers
app.use(helmet());

// Body Parsers
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Request Logging (development only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// --- API Routes ---
// Mount your routers
app.use(API_VERSION, routes);
// Mount other routers as you build them
// app.use('/api/events', eventRoutes);

// --- Error Handling ---

// Catch 404 and forward to the error handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack); // Log the error details on the server

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    // Send stack trace only in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// --- Database Connection & Server Start ---
db.authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    // Optional: Sync models if you're not using migrations OR if you want to ensure tables exist (use with caution in production)
    // models.sequelize.sync({ alter: true }).then(() => { // 'alter: true' tries to sync changes without dropping
    //   console.log('Database synchronized.');
    // });

    app.listen(PORT, HOST, () => {
      console.log(`Auth API server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1); // Exit if DB connection fails
  });
