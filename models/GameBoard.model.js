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
    allowNull: false
  },
  //if the game is ongoin, or if it is finished
  gameStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'active'

  },
  //json object containing a list of the users in the game
  gamePlayers: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() { // when getting, the object will be parsed from json
      const parsed = JSON.parse(this.getDataValue("gamePlayers"));
      return parsed ? parsed : null;
    },
    set() { // when setting, the object will be parsed to json
      const stringed = this.setDataValue("gamePlayers", JSON.stringify(value));
      return stringed ? stringed : null;
    }
  },
  //keeps track of the current turn of the game(could either be a int or maybe the name of the player)
  gameTurn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  //json object of the game board
  gameBoard: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() { // when getting, the object will be parsed from json
      const parsed = JSON.parse(this.getDataValue("gameBoard"));
      return parsed ? parsed : null;
    },
    set() { // when setting, the object will be parsed to json
      const stringed = this.setDataValue("gameBoard", JSON.stringify(value));
      return stringed ? stringed : null;
    }
  },
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