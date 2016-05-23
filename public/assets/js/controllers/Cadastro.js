(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('CadastroController', function(Restangular, focus, $state, toaster) {
      var vm = this;

      focus('name');

      /**
       * Sign up
       */
      vm.cadastro = function() {
        Restangular.one('/users').customPOST(vm.cadastroData).then(function() {
          localStorage.setItem('lastUser', vm.cadastroData.username);
          vm.cadastroData = {};
          $state.go('login');
        }, function(response) {
          if (response.data.error === true) {
            toaster.pop('error', 'Ops!', response.data.message);
          }
        });
      };
    });
})();
