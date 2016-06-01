(function() {
  'use strict';

  angular.module('DesafioBee')
    .controller('IndexController', function(Restangular, $rootScope, focus, socket, ngAudio, $timeout) {
      var vm = this;

      vm.offset = 20;

      function reset() {
        vm.newMessage = {};
      }

      function scrollBottom() {
        $timeout(function() {
          var scroller = document.getElementById('autoscroll');
          scroller.scrollTop = scroller.scrollHeight;
        }, 0, false);
      }

      $rootScope.selectedChannel = null;

      socket.on('message', function(message) {
        if (message.UserId !== $rootScope.currentUser.id) {
          ngAudio.play('../assets/message.mp3');
        }

        if (message.ChannelId) {
            if ($rootScope.selectedChannel !== null && message.ChannelId === $rootScope.selectedChannel.id) {
              vm.messages.unshift(message);
              scrollBottom();
            }
          } else {
            if ($rootScope.selectedChannel !== null && (message.UserId === $rootScope.selectedChannel.id || message.ToUserId === $rootScope.selectedChannel.id)) {
              vm.messages.unshift(message);
              scrollBottom();
            }
          }
      });

      // Select channel
      vm.selectChannel = function(channel) {
        channel.newMessage = false;
        reset();
        vm.newMessage.channelId = channel.id;
        $rootScope.selectedChannel = channel;
        $rootScope.selectedChannel.type = 'channels';
        vm.offset = 20;

        focus('message');

        vm.load();
      };

      vm.selectUser = function(user) {
        user.newMessage = false;
        reset();
        vm.newMessage.toUserId = user.id;
        $rootScope.selectedChannel = user;
        $rootScope.selectedChannel.type = 'users';
        vm.offset = 20;

        focus('message');

        vm.load();
      };

      // Send message to channel
      vm.sendMessage = function() {
        Restangular.one('/messages').customPOST(vm.newMessage).then(function() {
          vm.newMessage.message = '';
          vm.formNewMessage.$setPristine();
        });
      };

      // Load channel messages
      vm.load = function() {
        vm.loadingMessages = true;
        Restangular.one($rootScope.selectedChannel.type, $rootScope.selectedChannel.id).customGETLIST('messages').then(function(response) {
          vm.loadingMessages = false;
          vm.messages = response;
          scrollBottom();
        });
      };
    });
})();
