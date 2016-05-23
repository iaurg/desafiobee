'use strict';

var passwordHash = require('password-hash');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'Diego Fernandes',
      username: 'admin',
      password: passwordHash.generate('admin'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
