require("dotenv").config(); // Load the .env file

module.exports = {
  development: {
    username: process.env.DB_USER_DEVELOPMENT,
    password: process.env.DB_PASSWORD_DEVELOPMENT,
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
    username: process.env.DB_USER_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: "event_match_hub_prod",
    host: "mysql_db",
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
    username: process.env.DB_USER_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: "event_match_hub_prod",
    host: "emh_mysql_db",
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
