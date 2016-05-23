'use strict';
module.exports = function(sequelize, DataTypes) {
  var Channel = sequelize.define('Channel', {
    name: { type: DataTypes.STRING, unique: true }
  }, {
    classMethods: {
      associate: function(models) {
        Channel.hasMany(models.Message);
      }
    }
  });
  return Channel;
};
