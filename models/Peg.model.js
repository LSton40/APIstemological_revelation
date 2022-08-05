//
// made by fixedOtter 4.8.2022
//

const { DataTypes, Model } = require('sequelize');

class Peg extends Model {} // defining Peg as a model

Peg.init({
  pegName: { // nth: maybe this is a unique name for each peg instead of using the id to identify them?
    type: DataTypes.STRING,
    allowNull: false
  },
  position: { // position in the board array
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isAtSpawn: { // are they at spawn? if so, render them in the pool, and make their position (18 * (userID - 1)) + (9?)
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  finishPosition: { // position in the finish L 
    type: DataTypes.INTEGER
  } // allowing true for when they arent in finish L
}, {
  sequelize: require('../db/connection'),
  modelName: 'peg'
});

module.exports = Peg;