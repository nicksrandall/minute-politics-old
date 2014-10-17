'use strict';

angular.module('stumpIoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/feed/feed.html',
        controller: 'FeedCtrl',
        authenticate: true
      })
      .state('tag', {
        url: '/feed/:filter/:value',
        templateUrl: 'app/feed/feed.html',
        controller: 'FeedCtrl',
        authenticate: true
      });
  });
