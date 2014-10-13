'use strict';

angular.module('stumpIoApp')
  .controller('ProfileCtrl', function ($scope, Auth, User, $sce, $http) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = User.get(); //I'll need to set this based on user selected
    $scope.posts = [];
    if($scope.user.hasOwnProperty('$promise')) {
          $scope.user.$promise.then(function() {
            getUserPosts();
          }).catch(function() {
            return false
          });
        } else if($scope.user.hasOwnProperty('role')) {
          getUserPosts();
        } else {
          return false
        }

    function getUserPosts () {
      $http.get('/api/posts/user/' + $scope.user._id).success(function(posts) {
        $scope.posts = posts.map(function (item) {
          item.mp4SD = $sce.trustAsResourceUrl(item.mp4SD);
          item.mp4HD = $sce.trustAsResourceUrl(item.mp4HD);
          item.webmSD = $sce.trustAsResourceUrl(item.webmSD);
          item.webmHD = $sce.trustAsResourceUrl(item.webmHD);
          return item;
        });
      });
    }
  });
