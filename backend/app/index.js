
'use strict';

var fs = require('fs');
var path = require('path');
const { Sequelize, DataTypes } = require("sequelize");
var env = process.env.NODE_ENV || 'development';
var config = require('./db/config.js')[env];
var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);
// const sequelize = new Sequelize('sqlite::memory:')

fs.readdir(path.join(__dirname, 'models/'), (error, files) => {
  files.forEach(file => {
    if (file.indexOf('.js') === -1) {
      return true;
    }
    const model = require(path.join(__dirname, 'models/', file))(sequelize, DataTypes);
    db[model.name] = model;
  });
  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });
});
sequelize.authenticate().then(async () => {
  console.log('Connected to database');
  await sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
  }).catch(error => {
    throw error;
  });
}).catch(error => {
  console.error(`Error connecting to database: ${error}`);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

