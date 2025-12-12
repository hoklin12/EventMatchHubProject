const { Sequelize } = require("sequelize");
const config = require("../config/config.js");

// Use NODE_ENV from the Docker environment (which you set to production)
const env = process.env.NODE_ENV || "development";
const envConfig = config[env];

// Simple, direct connection without the conditional URI logic
const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    port: envConfig.port, // Added port
    dialect: envConfig.dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // CRITICAL: Must be false for production environment in Docker
    logging: false,
    dialectOptions: envConfig.dialectOptions,
    timezone: envConfig.timezone,
  }
);

module.exports = sequelize;
