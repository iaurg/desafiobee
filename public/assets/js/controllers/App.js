(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('AppController', function($state, $rootScope, $auth, socket) {
      var vm = this;

      socket.emit('connection-user', $rootScope.currentUser);

      // Logout
      vm.logout = function() {
        $auth.logout().then(function() {
          socket.emit('manual-disconnect', $rootScope.currentUser.id);

          localStorage.removeItem('user');
          $rootScope.authenticated = false;
          $rootScope.currentUser = null;

          $state.go('signin');
        });
      };
    });
})();
