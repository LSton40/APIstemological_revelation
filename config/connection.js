//
// made by fixedOtter 5.8.2022
//

const { Sequelize } = require('sequelize');
require('dotenv').config();

const logging = process.env.LOG ? true : false;

module.exports = new Sequelize('jegs_pokers_db', 'root', process.env.SQLPASS, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});