//
// made by fixedOtter 4.8.2022
//

const { GameBoard, Player, Peg, UserAcc } = require('../models'); // epic es6 pulling in from index.js
const db = require('./connection'); // future connection file lol

db.sync().then(() => { // syncing then doing the seeding
  GameBoard.create({ // first creating a gameboard table obj
    gameBoardName: 'epicGaymurs'
  }).then(newBoard => {
    newBoard.createPlayer({ // creating a player under the gameboard - does it need to be tied to userAcc??
      playerName: 'sakura',
      playerColor: 'F78DA7'
    }).then(newPlayer => {
      newPlayer.createPeg({ // finally creating a peg under the new player
        pegName: 'germy',
        position: 42,
        isAtSpawn: false,
        finishPosition: null
      });
    });
  });
});
// i love semicolons
