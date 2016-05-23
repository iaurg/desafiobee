(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('SignUpController', function(Restangular, focus, $state, toaster) {
      var vm = this;

      focus('name');

      // Sign up
      vm.signup = function() {
        Restangular.one('/users').customPOST(vm.userData).then(function() {
          localStorage.setItem('lastUser', vm.userData.username);
          vm.userData = {};
          $state.go('signin');
        }, function(response) {
          if (response.data.error === true) {
            toaster.pop('error', 'Ops!', response.data.message);
          }
        });
      };
    });
})();
