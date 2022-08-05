//
// made by fixedOtter 5.8.2022
//

const { DataTypes, Model } = require('sequelize');

class Chat extends Model {} // defining Chat as a model

  Chat.init({
    chatTitle: { // this is the Chat title - maybe just stores the string as its passed to sockets.io?
    type: DataTypes.STRING,
    allowNull: true
  },
    chatBody: { // chat body actually containing the text the user types
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: require('../db/connection'),
  modelName: 'chat'
});

module.exports = Chat;