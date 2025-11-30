require("dotenv").config(); // Load the .env file

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "event_match_hub",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "+07:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: "+07:00",
    },
    logging: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "event_match_hub",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "+07:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: "+07:00",
    },
    logging: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "event_match_hub",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "+07:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: "+07:00",
    },
    logging: false,
  },
};
