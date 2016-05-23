(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('SignInController', function($state, $auth, $rootScope, toaster, focus) {
      var vm = this;
      vm.loginData = {};

      vm.loginData.username = localStorage.getItem('lastUser');
      if (vm.loginData.username) {
        focus('password');
      } else {
        focus('username');
      }

      /**
       * Login
       */
       vm.login = function() {
        localStorage.setItem('lastUser', vm.loginData.username);

        $auth.login(vm.loginData).then(function(response) {
          if (response.data.success === true) {
            var user = JSON.stringify(response.data.user);

            localStorage.setItem('user', user);
            $rootScope.currentUser = response.data.user;

            $state.go('app.index');
          } else {
            toaster.pop('error', 'Ops!', response.data.message);
          }
        });
      };
    });
})();
