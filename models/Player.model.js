//
// made by fixedOtter 4.8.2022
//

const { DataTypes, Model } = require('sequelize');
const { Peg } = require('.'); // calling in child to define one to many relationship

class Player extends Model {} // defining Player as a model

Player.init({
  playerName: { // this is the player name - maybe just grab username from useracc?
    type: DataTypes.STRING,
    allowNull: false
  },
  playerColor: { // let the user define color from list of options and save as hex?
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: require('../db/connection'),
  modelName: 'player'
});

// defining one to many relationship
Player.hasMany(Peg);
Peg.belongsTo(Player);

// one to one for the useracc to relate to the player
Player.belongsTo(User); 

module.exports = Player;