'use strict';

angular.module('socketMdiApp')
  .directive('moveable', function ($swipe, socket) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var startX, pointX;

        $swipe.bind(element, {
          'start': function(coords) {
            startX = coords.x;
            pointX = coords.y;
            socket.emit('desktop-event', {message: 'touchStart'});
          },
          'move': function(coords, event) {
            var delta = coords.x - pointX;
            socket.emit('desktop-event', {message: coords});
          },
          'end': function(coords) {
            socket.emit('desktop-event', {message: 'touchEnd'});
          },
          'cancel': function(coords) {
            socket.emit('desktop-event', {message: 'touchCancel'});
          }
        });
      }
    };
  });
