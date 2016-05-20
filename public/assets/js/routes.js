(function() {
  'use strict';

  angular
    .module('DesafioBee')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'MainController as Home'
        })

        .state('messages', {
          url: '/messages',
          templateUrl: 'views/messages.html',
          controller: 'MessageController as Message'
        });

      $locationProvider.html5Mode(true);
    });
})();
