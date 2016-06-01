(function() {
  'use strict';

  angular
    .module('DesafioBee')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/signin');

      $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'views/signin.html',
          controller: 'SignInController as SignIn'
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
