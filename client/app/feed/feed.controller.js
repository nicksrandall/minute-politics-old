'use strict';

angular.module('stumpIoApp')
  .controller('FeedCtrl', function ($scope, $sce, Auth, $http, socket, $stateParams) {
    $scope.posts = [];
    $scope.newPosts = [];

    socket.syncUpdates('posts', $scope.newPosts, function (event, item, array) {
      console.log(event, item, array);
    });

    Auth.resolveCurrentUser(function (currentUser) {
      var url;
      if ($stateParams && $stateParams.value && $stateParams.filter === 'tag') {
        url = '/api/posts/tag/' + $stateParams.value;
      } else if ($stateParams && $stateParams.filter === 'all') {
        url = '/api/posts';
      } else {
        url = '/api/posts/followed_by/' + currentUser._id;
      }

      $http.get(url).success(function(posts) {
        $scope.posts = posts.map(function (item) {
          item.mp4SD = $sce.trustAsResourceUrl(item.mp4SD);
          item.mp4HD = $sce.trustAsResourceUrl(item.mp4HD);
          item.mobile = $sce.trustAsResourceUrl(item.mobile);
          item.webmSD = $sce.trustAsResourceUrl(item.webmSD);
          item.webmHD = $sce.trustAsResourceUrl(item.webmHD);
          item.isFollowing = _.contains(currentUser.following, item.author._id);
          return item;
        });
        sublime.load();
      });
    });

  });
