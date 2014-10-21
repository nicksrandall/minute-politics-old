'use strict';

angular.module('stumpIoApp')
  .controller('WelcomeCtrl', function ($scope, $http, Auth, $state, userAction) {
    $scope.results = [];

    Auth.resolveCurrentUser(function (currentUser) {
      $http.get('/api/users')
        .success(function (results) {
          $scope.results = results.map(function (item) {
            item.isFollowing = _.contains(currentUser.following, item._id);
            return item;
          });
        });
      });

    $scope.follow = function (person) {
      if(person.isFollowing) {
        person.isFollowing = false;
        person.followText = 'not following';
      } else {
        person.isFollowing = true;
        person.followText = 'following';
        userAction.follow(person);
      }
    };

    $scope.goToFeed = function () {
      $state.go('feed');
    };

  });
