'use strict';

angular.module('socketMdiApp')
  .factory('socket', function (socketFactory) {
    var socket = socketFactory();
    // socket.forward('ready');
    return socket;
    // Service logic
    // ...

    // var meaningOfLife = 42;

    // var ioSocket = socketFactory();

    // // Public API here
    // return {

    // };
  });
