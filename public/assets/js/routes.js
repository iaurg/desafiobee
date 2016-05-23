(function() {
  'use strict';

  angular
    .module('DesafioBee')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/login');

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'LoginController as Login'
        })

        .state('cadastro', {
          url: '/cadastro',
          templateUrl: 'views/cadastro.html',
          controller: 'CadastroController as Cadastro'
        })

        .state('app', {
          url: '/app',
          templateUrl: 'views/extend.html',
          controller: 'AppController as App'
        })

          .state('app.index', {
            url: '/index',
            templateUrl: 'views/app/index.html',
            controller: 'IndexController as Index'
          });

      $locationProvider.html5Mode(true);
    });
})();
