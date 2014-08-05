'use strict';

angular.module('socketMdiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'ui.bootstrap',
  'monospaced.qrcode',
  'btford.socket-io'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope, $window) {
    var publicIp = '192.168.1.10:9000';

    var baseUrl = $window.location.protocol + "//" + publicIp;

    var allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var ranLength = 50;

    var uniqueId = "";

    for(var i=0; i<ranLength; i++) {
        uniqueId += allChars[Math.floor(Math.random() * allChars.length)];
    }

    console.log('created unique url: ', baseUrl + '/mobile/' + uniqueId);
    $rootScope.relationshipURL = baseUrl + '/mobile/' + uniqueId;
    $rootScope.relationshipURI = uniqueId;
  });
