"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

// 1. Load ONLY the JS config (which reads .env)
const config = require(path.join(__dirname, "../config/config.js"))[env];
const db = {};

let sequelize;

// 2. Define Global Settings (Fixed for Cambodia Timezone)
const sequelizeOptions = {
  ...config, // Spread existing config (host, dialect, port)

  // START CHANGE: Cambodia is UTC+7
  timezone: "+07:00",
  // END CHANGE

  define: {
    underscored: true,
    timestamps: true,
  },

  // Optional: If using MySQL, this helps ensure dates return correctly
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+07:00",
  },
};

if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    sequelizeOptions
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    sequelizeOptions // <--- Passing the updated options
  );
}

// 3. Standard Loader
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// 4. Associate Models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
