'use strict';

angular.module('socketMdiApp')
  .controller('MobileCtrl', function ($rootScope, $scope, $http, $document, $swipe, socket) {

    socket.emit('connection');

    socket.on('connection-event', function(event, data) {
      console.log(event, data);
      socket.emit('mobile-register', {id: $document.find('body').data('id')});
    });
    socket.on('mobile-registerred', function(event, data) {
      console.log(event, data);
    });
    socket.on('start-experience', function(event, data) {
      console.log(event, data);
    });
    socket.on('mobile-event', function(event, data) {
      console.log(event, data);
    });

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      console.log($scope.awesomeThings);
    });

    $scope.broadcastToDesktop = function(message) {
      socket.emit('desktop-event', {message: message});
    }

  });
