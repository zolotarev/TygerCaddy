'use strict';

import fs  from 'fs';
import path  from 'path';
import Sequelize  from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];

const dbfile = path.resolve(__dirname,'../db/dev.db.sqlite');
const config = {
  dialect: "sqlite",
  storage: dbfile
};

const db = {};

let sequelize;
//console.log(config.storage);
if (config.use_env_variable) {
  //console.log(config.storage)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  //console.log(config.storage)
  sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage,
    logging: false,
    transactionType: 'IMMEDIATE'
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
