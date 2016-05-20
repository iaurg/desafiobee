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
        });

      $locationProvider.html5Mode(true);
    });
})();
