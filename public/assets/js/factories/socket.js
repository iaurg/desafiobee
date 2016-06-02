(function() {
  'use strict';

  angular.module('DesafioBee')
    .factory('socket', function (socketFactory) {
      return socketFactory();
    });
})();
