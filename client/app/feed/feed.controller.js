'use strict';

angular.module('stumpIoApp')
  .controller('FeedCtrl', function ($scope, $sce, $http) {
    $scope.posts = [];

    angular.element(document).ready(function () {
      sublime.load();
    });

    $http.get('/api/posts').success(function(posts) {
      $scope.posts = posts.map(function (item) {
        item.mp4SD = $sce.trustAsResourceUrl(item.mp4SD);
        item.mp4HD = $sce.trustAsResourceUrl(item.mp4HD);
        item.webmSD = $sce.trustAsResourceUrl(item.webmSD);
        item.webmHD = $sce.trustAsResourceUrl(item.webmHD);
        return item;
      });
    });

  });
