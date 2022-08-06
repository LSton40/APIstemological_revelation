const { DataTypes, Model } = require('sequelize');

class GameBoard extends Model { }

GameBoard.init({
    //the id will be the socket id of the users
    gameID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    //the users name who created the game
    gameCreator: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.VARCHAR,
        allowNull: false
    },
    //keeps track of the current turn of the game(could either be a int or maybe the name of the player)
    gameTurn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //json object of the game board
    gameBoard: {
        type: DataTypes.VARCHAR,
        allowNull: false
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
        modelName: 'gameBoard',
        hooks: {
            beforeCreate: async () => {
                
            }
        }
    }
);
