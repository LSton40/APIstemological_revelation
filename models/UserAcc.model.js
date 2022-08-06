//
// made by fixedOtter 4.8.2022
//

const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class UserAcc extends Model {} // defining UserAcc as a model

UserAcc.init({
  username: { // username for the user account
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: 3,
        msg: 'Your username must be at least 3 characters!'
      }
    }
  },
  email: { // email for the user account
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  passHash: { // password hash saver
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: 8,
        msg: 'Your password requires at least 8 characters!'
      }
    }
  },
  socketID: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  wins: { // JD had an idea for a scoreboard but I want to be lazy and store on the useracc
    type: DataTypes.INTEGER
  },
  losses: {
    type: DataTypes.INTEGER
  },
  points: { // JD also had an idea for a shop - maybe we reward wins with x points to use in a store? (NTH!!)
    type: DataTypes.INTEGER
  }
}, {
  sequelize: require('../config/connection'),
  modelName: 'userAcc',
  hooks: {
    beforeCreate: async() => {
      // passing password to bcrypt to hash before saving
      const hashedPassword = await bcrypt.hash(user.passHash, 10);
      // saving hashed password to user.passHash
      user.passHash = hashedPassword;
    }
  }
});

// returns boolean true ? pass = storedPass : false
UserAcc.prototype.validatePass = async(pass, storedPass) => { await bcrypt.compare(pass, storedPass) }

module.exports = UserAcc;