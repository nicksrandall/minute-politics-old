'use strict';

angular.module('stumpIoApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = User.get();
    $scope.parties = ['Republican', 'Deomocrat']; // I should find a way to dynamically generate this list?

    $scope.updateProfile = function(form) {
      // Hit the update endpoint with new data. Boom.
      if (form.$valid) {
        $http.put('/api/users/' + $scope.user._id,  $scope.user);
      }
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
