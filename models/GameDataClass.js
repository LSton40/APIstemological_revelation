module.exports = class gameData {
  constructor(gameID, userList) {
    this.gameID = gameID,
    this.gameCreator = userList[0].username, // first in the userList will always be the host
    this.gameStatus = 'active',
    this.gameTurn = userList[Math.floor(Math.random() * userList.length)].username, // makes the first player be random
    this.gameWinner = null,
    this.gamePlayers = [
      {
        username: userList[0].username,
        userColor: userList[0].userColor,
        hand: [],
        pegs: [
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
        username: userList[1].username,
        userColor: userList[1].userColor,
        hand: [],
        pegs: [
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
        username: userList[2].username,
        userColor: userList[2].userColor,
        hand: [],
        pegs: [
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
        username: userList[3].username,
        userColor: userList[3].userColor,
        hand: [],
        pegs: [
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