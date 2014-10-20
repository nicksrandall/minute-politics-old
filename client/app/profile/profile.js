'use strict';

angular.module('stumpIoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile/:id',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true
      });
  });
