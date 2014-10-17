'use strict';

angular.module('stumpIoApp')
  .controller('SearchCtrl', function ($scope, $stateParams, Auth, $http, growl) {
    $scope.results = [];
    console.log(Auth.getCurrentUser());

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

    $http.get('/api/users/name/' + $stateParams.name).success(function(results) {
      $scope.results = results.map(function (item) {
        item.isFollowing = _.contains(Auth.getCurrentUser().following, item._id);
        return item;
      });
    });
  });
