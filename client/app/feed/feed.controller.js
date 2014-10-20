'use strict';

angular.module('stumpIoApp')
  .controller('FeedCtrl', function ($scope, $sce, Auth, $http, socket, $stateParams, $state, $timeout, userAction) {
    $scope.posts = [];
    $scope.newPosts = [];
    $scope.goToProfile = userAction.goToProfile;
    $scope.btnClass = 'btn-default';

    socket.syncUpdates('posts', $scope.newPosts, function (event, item, array) {
      console.log(event, item, array);
    });

    $scope.likeCallback = function (canLike, post) {
      if (canLike) {
        post.btnClass = 'btn-success';
        $timeout(function () {
          post.btnClass = 'btn-default';
        }, 250);
      } else {
        post.btnClass = 'btn-danger';
        $timeout(function () {
          post.btnClass = 'btn-default';
        }, 250);
      }
    };

    $scope.like = userAction.like;

    Auth.resolveCurrentUser(function (currentUser) {
      var url;
      if ($stateParams.value && $stateParams.filter === 'tag') {
        $scope.mainTitle = 'Posts Tagged: ' + $stateParams.value;
        url = '/api/posts/tag/' + $stateParams.value;
      } else if ($stateParams && $stateParams.filter === 'all') {
        url = '/api/posts';
      } else {
        url = '/api/posts/followed_by/' + currentUser._id;
      }

      $http.get(url).success(function(posts) {
        $scope.posts = posts.map(function (item) {
          item.src = [{
              file: item.mobile,
              label: '480p SD',
            }, {
              file: item.mp4SD,
              label: '720p HD',
              'default': 'true'
            }, {
              file: item.mp4HD,
              label: '1080p HD'
            }, {
              file: item.webmSD,
              label: '720p HD'
            }, {
              file: item.webmHD,
              label: '1080p HD'
            }];
          item.btnClass = 'btn-default';
          item.isFollowing = _.contains(currentUser.following, item.author._id);
          return item;
        });
      });
    });

  });
