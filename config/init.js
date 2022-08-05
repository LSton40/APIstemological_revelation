//
// made by fixedOtter on 5.8.2022
//

/* imported goods */
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const initQuest = [
  {
    name: 'DB',
    message: 'What is the database name?',
    default: 'jegs_pokers_db'
  },
  {
    name: 'USER',
    message: 'What is your SQL username?',
    default: 'root'
  },
  {
    name: 'PASS',
    message: 'What is your SQL pass?'
  },
  {
    name: 'HOST',
    message: 'What is the hostname?',
    default: 'localhost'
  },
  {
    name: 'DIALECT',
    message: 'What is the database dialect?',
    default: 'mysql'
  },
  {
    type: 'confirm',
    name: 'LOG',
    message: 'Do you want to have verbose Sequelize logging?',
    default: false
  }
]

/* actual funct doing the things */
const getUserConfig = async() => {
  const answers = await inquirer.prompt(initQuest);

  const envData = `DB=${answers.DB}
USER=${answers.USER}
PASS=${answers.PASS}
HOST=${answers.HOST}
DIALECT=${answers.DIALECT}
LOG=${answers.LOG}`;

const dbPromise = mysql.createPool({
  host: answers.HOST,
  user: answers.USER,
  password: answers.PASS
}).promise();

  dbPromise.query(`CREATE DATABASE IF NOT EXISTS ${answers.DB}`).then(() => {
    fs.writeFile(path.join(__dirname, '../.env'), envData, (err) => {
      err ? console.error(err) : console.log('.env file has been generated!');
      process.exit();
    });
  });
}

getUserConfig();