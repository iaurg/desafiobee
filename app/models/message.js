'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ToUserId: DataTypes.INTEGER,
    ChannelId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Message.belongsTo(models.User);
        Message.belongsTo(models.Channel);
      }
    }
  });
  return Message;
};
