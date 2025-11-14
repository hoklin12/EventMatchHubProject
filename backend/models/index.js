'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  // Ensure Sequelize uses snake_case column names (created_at, updated_at) to match models
  config.define = config.define || {};
  config.define.underscored = true;
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Ensure Sequelize uses snake_case column names (created_at, updated_at) to match models
  config.define = config.define || {};
  config.define.underscored = true;
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Also load model definitions from src/models if present (some projects put models there)
const srcModelsDir = path.join(__dirname, '..', 'src', 'models');
if (fs.existsSync(srcModelsDir)) {
  fs.readdirSync(srcModelsDir)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    })
    .forEach(file => {
      const model = require(path.join(srcModelsDir, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
