(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('SignUpController', function(Restangular, focus, $state, toaster) {
      var vm = this;

      focus('name');

      /**
       * Sign up
       */
      vm.cadastro = function() {
        Restangular.one('/users').customPOST(vm.cadastroData).then(function() {
          localStorage.setItem('lastUser', vm.cadastroData.username);
          vm.cadastroData = {};
          $state.go('signnin');
        }, function(response) {
          if (response.data.error === true) {
            toaster.pop('error', 'Ops!', response.data.message);
          }
        });
      };
    });
})();
