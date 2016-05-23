(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('IndexController', function(Restangular, $rootScope, focus, socket) {
      var vm = this;

      $rootScope.selectedChannel = null;
      vm.newMessage = { userId: $rootScope.currentUser.id };

      // New message received from socket
      socket.on('message', function(message) {
        if ($rootScope.selectedChannel !== null && message.ChannelId == $rootScope.selectedChannel.id) {
          vm.messages.push(message);
        }
      });

      // Select channel
      vm.selectChannel = function(channel) {
        channel.newMessage = false;
        vm.newMessage.channelId = channel.id;
        $rootScope.selectedChannel = channel;

        focus('message');

        vm.load();
      };

      // Send message to channel
      vm.sendMessage = function() {
        Restangular.one('/messages').customPOST(vm.newMessage).then(function(response) {
          vm.newMessage.message = '';
          vm.formNewMessage.$setPristine();
        });
      };

      // Load channel messages
      vm.load = function() {
        vm.loadingMessages = true;
        Restangular.one('channels', $rootScope.selectedChannel.id).customGETLIST('messages').then(function(response) {
          vm.loadingMessages = false;
          vm.messages = response;
        });
      };
    });
})();
