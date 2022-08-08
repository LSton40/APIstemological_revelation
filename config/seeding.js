//
// made by fixedOtter 4.8.2022
//
// process.env.NODE_ENV = 'production';
require('dotenv').config()
const UserAcc = require('../models/UserAcc.model'); // NOT epic es6 pulling in from index.js (since i deletedmy code lol)
const db = require('./connection.js'); // connection file lol





db.sync().then(async () => { // syncing then doing the seeding
  await UserAcc.create({
    username: 'bryan',
    passHash: `password`,
    socket: 69,
    wins: 0,
    losses: 432,
    points: 0,
    sid: 's%3AU2Ag2D0nn66ikN7wrgMzvqW6Kq7cqSM4.R34r90NTWcvGoOKiv4E9OoCqd0Loy41GUyJkECr6UNM'
  }).then(user => {
    console.log('<---------- USER CREATED: ---------->');
    console.log(user.dataValues);
    console.log('<---------- SEEDING COMPLETE ---------->');
    process.exit();
  });
});
// i love semicolons