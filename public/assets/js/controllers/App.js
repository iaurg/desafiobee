(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('AppController', function($state, $rootScope, $auth) {
      var vm = this;

      vm.logout = function() {
        $auth.logout().then(function() {
          localStorage.removeItem('user');
          $rootScope.authenticated = false;
          $rootScope.currentUser = null;

          $state.go('signin');
        });
      };
    });
})();
