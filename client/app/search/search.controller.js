'use strict';

angular.module('stumpIoApp')
  .controller('SearchCtrl', function ($scope, $stateParams, $http, growl) {
    $scope.results = [];

    $scope.follow = function (person) {
      if(person.isFollowing) {
        $scope.currentUser.following.filter(function (item) {
          return item !== person._id;
        });
        person.isFollowing = false;
        person.followText = 'not following';
      } else {
        console.log(person.id, person._id);
        $scope.currentUser.following.push(person._id);
        person.isFollowing = true;
        person.followText = 'following';
      }
      $http.put('/api/users/' + $scope.currentUser._id,  $scope.currentUser)
        .success(function(data) {
          growl.success("You are " + person.followText + " " + person.name + ".");
        })
        .error(function() {
          growl.error("There was a problem.");
        });
    };

    $http.get('/api/users/name/' + $stateParams.name).success(function(results) {
      $scope.results = results.map(function (item) {
        item.isFollowing = _.contains($scope.currentUser.following, item._id);
        return item;
      });
    });
  });
