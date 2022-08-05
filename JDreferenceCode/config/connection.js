const { Sequelize } = require('sequelize');

const connection = new Sequelize( 'our_dbstep', 'root', '',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = connection;