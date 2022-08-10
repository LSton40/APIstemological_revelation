module.exports = class gameData {
  constructor(gameID, userList) {
    this.gameID = gameID,
    this.gameCreator = userList[0].username, // first in the userList will always be the host
    this.gameStatus = 'active',
    this.gameTurn = userList[Math.floor(Math.random() * userList.length)].username, // makes the first player be random
    this.gameWinner = null,
    this.drawPile = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    this.gamePlayers = [
      {
        username: userList[0].username,
        userColor: userList[0].userColor,
        hand: [],
        pegs: [
          {
            pegID: 0,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 1,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 2,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
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
          }
        ]
      },
      {
        username: userList[1].username,
        userColor: userList[1].userColor,
        hand: [],
        pegs: [
          {
            pegID: 5,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 6,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 7,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 8,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 9,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          }
        ]
      },
      {
        username: userList[2].username,
        userColor: userList[2].userColor,
        hand: [],
        pegs: [
          {
            pegID: 10,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 11,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 12,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 13,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 14,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          }
        ]
      },
      {
        username: userList[3].username,
        userColor: userList[3].userColor,
        hand: [],
        pegs: [
          {
            pegID: 15,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 16,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 17,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 18,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          },
          {
            pegID: 19,
            pegLocation: null,
            isAtSpawn: true,
            isInFinish: false
          }
        ]
      }
    ]
  }
  returnUsers() { /* FOR LOOPS BAYBEY */
    let userList = [];

    for (let i = 0; i < this.gamePlayers.length; i++) {
      userList.push({
        username: this.gamePlayers[i].username,
        userColor: this.gamePlayers[i].userColor
      });
    }
    return userList;
  }
  nextUserTurn() { /* I LOVE FOR LOOPS SO BAD DON'T JUDGE ME */
    for (let i = 0; i < this.gamePlayers.length; i++) {
      let nextPlayer;
      if (i == this.gamePlayers.length - 1) {
        nextPlayer = this.gamePlayers[0].username;
      } else {
        nextPlayer = this.gamePlayers[i + 1].username;
      }
      if (this.gamePlayers[i].username == this.gameTurn) {
        this.gameTurn = nextPlayer;
        return this.gameTurn;
      }
    }
    return -1;
  }
}