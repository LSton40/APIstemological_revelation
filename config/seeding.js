//
// made by fixedOtter 4.8.2022
//
// process.env.NODE_ENV = 'production';
require('dotenv').config()
const UserAcc = require('../models/UserAcc.model'); // NOT epic es6 pulling in from index.js (since i deletedmy code lol)
const GameBoard = require('../models/GameBoard.model');
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
  });


  await GameBoard.create({
    gameID: 'test33',
    gameCreator: 'bryan',
    gameStatus: 'active',
    gamePlayers: [
      {
        username: 'bryan',
        socket: 69,
        points: 0,
        hand: [
          5, 4, 3, 8, 3
        ]
      },
    ],
    gameTurn: 'bryan',
    gameBoard: {
      currPlayers: [
        {
          name: 'guy',
          userSID: {}, // grab useracc sid from session obj?
          pegColor: 'purple',
          pegs: [
            {
              pegID: 1,
              pegLocation: 3,
              isAtSpawn: false,
              isInFinish: false
            },
            {
              pegID: 2,
              pegLocation: null,
              isAtSpawn: false,
              isInFinish: true
            },
            {
              pegID: 3,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 4,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 5,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            }
          ]
        },
        {
          name: 'guy2',
          userSID: {}, // grab useracc sid from session obj?
          pegColor: 'purple',
          pegs: [
            {
              pegID: 1,
              pegLocation: 3,
              isAtSpawn: false,
              isInFinish: false
            },
            {
              pegID: 2,
              pegLocation: null,
              isAtSpawn: false,
              isInFinish: true
            },
            {
              pegID: 3,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 4,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 5,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            }
          ]
        },
        {
          name: 'guy3',
          userSID: {}, // grab useracc sid from session obj?
          pegColor: 'purple',
          pegs: [
            {
              pegID: 1,
              pegLocation: 3,
              isAtSpawn: false,
              isInFinish: false
            },
            {
              pegID: 2,
              pegLocation: null,
              isAtSpawn: false,
              isInFinish: true
            },
            {
              pegID: 3,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 4,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 5,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            }
          ]
        },
        {
          name: 'guy4',
          userSID: {}, // grab useracc sid from session obj?
          pegColor: 'purple',
          pegs: [
            {
              pegID: 1,
              pegLocation: 3,
              isAtSpawn: false,
              isInFinish: false
            },
            {
              pegID: 2,
              pegLocation: null,
              isAtSpawn: false,
              isInFinish: true
            },
            {
              pegID: 3,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 4,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            },
            {
              pegID: 5,
              pegLocation: null,
              isAtSpawn: true,
              isInFinish: false
            }
          ]
        }

      ]
    },
    gameWinner: null
  }).then(game => {
    console.log('<---------- GAME CREATED: ---------->');
    console.log(game.dataValues);
    console.log('<---------- SEEDING COMPLETE ---------->');
    process.exit();
  });
}).catch(err => {
  console.log('<---------- ERROR ---------->');
  console.log(err);
});











// i love semicolons