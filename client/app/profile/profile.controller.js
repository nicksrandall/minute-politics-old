'use strict';

angular.module('stumpIoApp')
  .controller('ProfileCtrl', function ($scope, Auth, $sce, $http, $stateParams, userAction) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.posts = [];

    userAction.getUser($stateParams.id, function (user) {
      $scope.user = user;
      $http.get('/api/posts/user/' + $stateParams.id).success(function(posts) {
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
          return item;
        });
      });
    });

  });
