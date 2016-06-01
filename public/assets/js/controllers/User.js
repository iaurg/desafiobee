(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('UserController', function(Restangular, socket, $rootScope) {
      var vm = this;

      socket.on('online', function(onlineList) {
        angular.forEach(vm.users, function(user) {
          if (onlineList.indexOf(user.id) >= 0) {
            user.online = true;
          } else {
            user.online = false;
          }
        });
      });

      socket.on('message', function(message) {
        if (($rootScope.selectedChannel === null && !message.ChannelId) || (message.ToUserId && message.UserId !== $rootScope.selectedChannel.id)) {
          angular.forEach(vm.users, function(user) {
            if (user.id === message.UserId) {
              user.newMessage = true;
            }
          });
        }
      });

      // Load channels
      vm.load = function() {
        vm.loading = true;

        Restangular.all('/users').getList().then(function(response) {
          vm.users = response;

          vm.loading = false;
        });
      };
      vm.load();

    });
})();
