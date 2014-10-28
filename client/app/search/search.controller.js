'use strict';

angular.module('stumpIoApp')
  .controller('SearchCtrl', function ($scope, $stateParams, Auth, $http, growl, userAction) {
    $scope.results = [];
    $scope.goToProfile = userAction.goToProfile;

    $scope.status = {
      isopen: false,
      selection: 'Names'
    };

    $scope.selection = 'show';

    $scope.setSearch = function(thing) {
      $scope.status.selection = thing;
    };

    $scope.goToTag = function () {
      $state.go('tag')
    }

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

    $scope.search = function (term) {
      switch ($scope.status.selection) {
        case 'Names':
          userAction.searchByName(term, function (results) {
            $scope.results = results;
          });
          break;
        case 'Tags':
          userAction.searchByTag(term, function (results) {
            $scope.results = results;
          });
          break;
        default:
          console.log('You can\'t serach that');
      }
    };
  });
