(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('AppController', function($state, $rootScope, $auth, socket) {
      var vm = this;

      socket.emit('connection-user', $rootScope.currentUser);

      // Logout
      vm.logout = function() {
        socket.emit('manual-disconnect', $rootScope.currentUser.id);
        $auth.logout().then(function() {

          localStorage.removeItem('user');
          $rootScope.authenticated = false;
          $rootScope.currentUser = null;

          $state.go('signin');
        });
      };
    });
})();
