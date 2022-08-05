//
// made by fixedOtter 4.8.2022
//

const { DataTypes, Model } = require('sequelize');
const { Player, Chat } = require('.');
const bcrypt = require('bcrypt');

class UserAcc extends Model {} // defining UserAcc as a model

UserAcc.init({
  userame: { // username for the user account
    type: DataTypes.STRING,
    allowNull: false
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
  }
}, {
  sequelize: require('../db/connection'),
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

UserAcc.prototype.validatePass = async(pass, storedPass) => {
  // returns boolean true ? pass = storedPass : false
  return await bcript.compare(pass, storedPass);
}

// defining one to many relationship for chats
UserAcc.hasMany(Chat);
Chat.belongsTo(UserAcc);

// one to one for the player to relate to the useracc
UserAcc.belongsTo(Player);

module.exports = UserAcc;