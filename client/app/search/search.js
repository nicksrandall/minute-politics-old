'use strict';

angular.module('stumpIoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('search', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl',
        authenticate: true
      });
  });
