(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('ChannelController', function(Restangular, toaster, socket, $rootScope) {
      var vm = this;

      // New message received from socket
      socket.on('channel', function(channel) {
        vm.channels.push(channel);
      });

      // Display advice on channel list about new messages
      socket.on('message', function(message) {
        if (($rootScope.selectedChannel === null && !message.ToUserId) || (message.ChannelId && message.ChannelId !== $rootScope.selectedChannel.id)) {
          angular.forEach(vm.channels, function(channel) {
            if (channel.id === message.ChannelId) {
              channel.newMessage = true;
            }
          });
        }
      });

      // Load channels
      vm.load = function() {
        vm.loading = true;

        Restangular.all('/channels').getList().then(function(response) {
          vm.channels = response;
          vm.loading = false;
        });
      };
      vm.load();

      // Create channel
      vm.submit = function() {
        Restangular.one('/channels').customPOST(vm.newChannel).then(function() {
          vm.formChannel.$setPristine();
          vm.newChannel = {};
        }, function(response) {
          if (response.data.error === true) {
            toaster.pop('error', 'Ops!', response.data.message);
          }
        });
      };

    });
})();
