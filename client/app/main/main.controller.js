'use strict';

angular.module('socketMdiApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, socket) {

    $scope.messages = [];

    socket.emit('connection');

    socket.on('connection-event', function(event, data) {
      console.log(event, data);
      $scope.socketEvent = event;
      socket.emit('desktop-register', {id: $rootScope.relationshipURI});
    });
    socket.on('desktop-registerred', function(event, data) {
      console.log(event, data);
    });
    socket.on('mobile-connected', function(event, data) {
      console.log(event, data);
      socket.emit('mobile-event', {payload: 100});
    });
    socket.on('desktop-event', function(event, data) {
      console.log(event, data);
      $scope.messages.push(event);
    });

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.qrURL = $rootScope.relationshipURL;

  });
