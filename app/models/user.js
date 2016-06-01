'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    grupo: DataTypes.STRING
  }, {
    instanceMethods: {
      toJSON: function () {
        var values = this.get();

        delete values.password;
        return values;
      }
    }
  });
  return User;
};
