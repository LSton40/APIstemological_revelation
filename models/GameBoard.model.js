const { DataTypes, Model } = require('sequelize');

class GameBoard extends Model { }

GameBoard.init({
  //the id will be the socket id of the users
  gameID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  //the users name who created the game
  gameCreator: {
    type: DataTypes.STRING,
    allowNull: true
  },
  //if the game is ongoin, or if it is finished
  gameStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'

  },
  //json object containing a list of the users in the game
  gamePlayers: {
    type: DataTypes.JSON,
    allowNull: false,
    // get() { // when getting, the object will be parsed from json
    //   return JSON.parse(this.getDataValue("gamePlayers"));
    // },
    // set() { // when setting, the object will be parsed to json
    //   return this.setDataValue("gamePlayers", JSON.stringify(this.getDataValue("gamePlayers")));
    // }
  },
  //keeps track of the current turn of the game(could either be a int or maybe the name of the player)
  gameTurn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  //json object of the game board
  // gameBoard: {
  //   type: DataTypes.JSON,
  //   allowNull: true,
  //   get() { // when getting, the object will be parsed from json
  //     return JSON.parse(this.getDataValue("gameBoard"));
  //   },
  //   set() { // when setting, the object will be parsed to json
  //     return this.setDataValue("gameBoard", JSON.stringify(value));
  //   }
  // },
  //game winner (could be a int or maybe the name of the player). this will be null if the game is not finished
  gameWinner: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
},
  {
    sequelize: require('../config/connection'),
    modelName: 'gameBoard'
  }
);

module.exports = GameBoard;