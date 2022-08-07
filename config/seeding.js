//
// made by fixedOtter 4.8.2022
//

const UserAcc = require('../models/UserAcc.model'); // NOT epic es6 pulling in from index.js (since i deletedmy code lol)
const db = require('./connection.js'); // connection file lol

db.sync().then(() => { // syncing then doing the seeding
  UserAcc.create({
    username: 'bryan',
    passHash: `password`,
    socket: 69,
    wins: 0,
    losses: 432,
    points: 0
  }).then(user => {
    console.log('<---------- USER CREATED: ---------->');
    console.log(user.dataValues);
    console.log('<---------- SEEDING COMPLETE ---------->');
    process.exit();
  });
});
// i love semicolons