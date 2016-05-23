(function() {
  'use strict';

  angular.module('DesafioBee')
    .factory('socket', function (socketFactory) {
      var myIoSocket = io.connect('http://localhost:8080');

      var socket = socketFactory({
          ioSocket: myIoSocket
      });

      return socket;
    });
})();
