//
// made by fixedOtter 5.8.2022
//

const { Sequelize } = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  logging: process.env.LOG
});