'use strict';

angular.module('socketMdiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('mobile', {
        url: '/mobile/:id',
        templateUrl: 'app/main/mobile.html',
        controller: 'MobileCtrl'
      })
  });
