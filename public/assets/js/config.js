(function() {
  'use strict';

  angular
    .module('DesafioBee')

    .run(function(defaultErrorMessageResolver) {
      defaultErrorMessageResolver.setI18nFileRootPath('libs/angular-auto-validate/src/lang');
      defaultErrorMessageResolver.setCulture('pt-br');
    })

    .run(function(amMoment) {
        amMoment.changeLocale('pt-br');
    })

    /**
     * Auth config
     */
    .config(function($authProvider) {
      $authProvider.loginUrl = '/api/authenticate';
    })

    /**
     * Get user information before app starts
     */
    .run(function($rootScope, $state, $http) {
        var token = localStorage.getItem('satellizer_token');
        if (token) {
          $http({
            method: 'GET',
            url: '/api/authenticate/user',
            headers: {'x-access-token': token}
          }).then(function(response) {
            var user = JSON.stringify(response.data.user);

            localStorage.setItem('user', user);
            $rootScope.currentUser = response.data.user;

            $state.go('app.index');
          }, function() {
            event.preventDefault();

            localStorage.removeItem('user');
            localStorage.removeItem('satellizer_token');
            $rootScope.currentUser   = null;

            $state.go('signin');
          });
        }
    })

    .run(function ($rootScope, $state) {
      $rootScope.$on('$stateChangeStart', function (event, next) {
        var token = localStorage.getItem('satellizer_token');
        if (!token && next.name.includes('app')) {
          event.preventDefault();
          $state.go('signin');
        }
      });
    })

    /**
     * REST
     */
    .config(function(RestangularProvider) {
      RestangularProvider.setBaseUrl('/api');
    })

    /**
     * REST interceptor
     */
    .run(function(Restangular, $http, $state, $rootScope) {
      Restangular.setErrorInterceptor(function(response) {
        if (response.status === 403) {
          localStorage.removeItem('user');
          localStorage.removeItem('satellizer_token');
          $rootScope.currentUser   = null;

          $state.go('signin');

          return false;
        }

        return true;
      });
    });
})();
