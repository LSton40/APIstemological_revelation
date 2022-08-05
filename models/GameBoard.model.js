//
// made by fixedOtter 4.8.2022
//

const { DataTypes, Model } = require('sequelize');
const { Player } = require('.'); // calling in child to define one to many relationship

class GameBoard extends Model {} // defining GameBoard as a model

GameBoard.init({
  gameBoardName: { // this can define the name of the game lobby
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: require('../db/connection'),
  modelName: 'gameBoard' // as the table is defined in the SQL database
});

// defining one to many relationship
GameBoard.hasMany(Player);
Player.belongsTo(GameBoard);

module.exports = GameBoard;