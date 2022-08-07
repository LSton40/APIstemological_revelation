const { Sequelize } = require('sequelize');

const connection = new Sequelize( 'our_dbstep', 'root', 'Ptawute_iwaseko%sh13',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = connection;