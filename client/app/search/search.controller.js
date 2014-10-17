'use strict';

angular.module('stumpIoApp')
  .controller('SearchCtrl', function ($scope, $stateParams, Auth, $http, growl) {
    $scope.results = [];

    $scope.follow = function (person) {
      if(person.isFollowing) {
        person.isFollowing = false;
        person.followText = 'not following';
      } else {
        person.isFollowing = true;
        person.followText = 'following';
      }
      $http.get('/api/users/follow/' + person._id)
        .success(function() {
          growl.success('You are ' + person.followText + ' ' + person.name + '.');
        })
        .error(function() {
          growl.error('There was a problem.');
        });
    };

    Auth.resolveCurrentUser(function (currentUser) {
      $http.get('/api/users/name/' + $stateParams.name).success(function(results) {
        $scope.results = results.map(function (item) {
          item.isFollowing = _.contains(currentUser.following, item._id);
          return item;
        });
      });
    });
  });
