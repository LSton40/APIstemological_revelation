//
// made by fixedOtter 5.8.2022
//

const { Sequelize } = require('sequelize');
require('dotenv').config();

const logging = process.env.LOG ? true : false;

if (process.env.JAWSDB_URL) {
  module.exports = new Sequelize(process.env.JAWSDB_URL);
} else {
  module.exports = new Sequelize(process.env.DB, process.env.SQLUSER, process.env.SQLPASS, {
  host: process.env.HOST,
  dialect: 'mysql',
  logging: false
});
}