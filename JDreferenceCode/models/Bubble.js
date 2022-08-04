const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class Bubble extends Model { }

Bubble.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: 2
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: 6,
        msg: 'Your password must be at least 6 characters in length.'
      }
    }
  }
}, 
{
  sequelize: require('../config/connection'),
  modelName: 'bubble',
  hooks: {
    async beforeCreate(bubble) {
      const hashed_pass = await bcrypt.hash(bubble.password, 10);
      bubble.password = hashed_pass;
    }
  }
});

Bubble.prototype.validatePassword = async function (password, stored_password) {
  return await bcrypt.compare(password, stored_password);
}

module.exports = Bubble;