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
  passHash: { // password hash saver
    type: DataTypes.STRING(6969),
    allowNull: false,
    validate: {
      len: {
        args: 8,
        msg: 'Your password requires at least 8 characters!'
      }
    }
  },
  socket: {
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
    beforeCreate: async(newUser) => {
      // passing password to bcrypt to hash before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.passHash, salt);

      // const hashedPassword = await bcrypt.hash(newUser.passHash, 10);
      console.log(hashedPassword);
      // saving hashed password to user.passHash
      newUser.passHash = hashedPassword;
    }
  }
});

// returns boolean true ? pass = storedPass : false
UserAcc.prototype.validatePass = async(pass, storedPass) => { 
  console.log('validatePass called');
  console.log(`pass: ${pass}\n storedPass: ${storedPass}`);
  return await bcrypt.compare(pass, storedPass) 
};

module.exports = UserAcc;