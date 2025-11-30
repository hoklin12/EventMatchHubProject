const { Sequelize } = require("sequelize");
const config = require("../config/config.js");

const sequelize = new Sequelize(
  config[process.env.NODE_ENV].database,
  config[process.env.NODE_ENV].username,
  config[process.env.NODE_ENV].password,
  {
    host: config[process.env.NODE_ENV].host,
    dialect: config[process.env.NODE_ENV].dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: process.env.NODE_ENV === "development" ? console.log : false, // Log SQL in dev
  }
);

module.exports = sequelize;
