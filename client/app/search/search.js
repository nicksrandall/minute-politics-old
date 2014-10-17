'use strict';

angular.module('stumpIoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search/user/:name',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
