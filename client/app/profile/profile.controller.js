'use strict';

angular.module('stumpIoApp')
  .controller('ProfileCtrl', function ($scope, Auth, $sce, $http) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.posts = [];

    $http.get('/api/posts/user/' + Auth.getCurrentUser()._id).success(function(posts) {
      $scope.posts = posts.map(function (item) {
        item.mp4SD = $sce.trustAsResourceUrl(item.mp4SD);
        item.mp4HD = $sce.trustAsResourceUrl(item.mp4HD);
        item.mobile = $sce.trustAsResourceUrl(item.mobile);
        item.webmSD = $sce.trustAsResourceUrl(item.webmSD);
        item.webmHD = $sce.trustAsResourceUrl(item.webmHD);
        return item;
      });
    });

  });
