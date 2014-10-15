'use strict';

angular.module('stumpIoApp')
  .controller('SettingsCtrl', function ($scope, Auth, $http) {
    $scope.errors = {};
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = Auth.getUser();
    $scope.parties = ['Republican', 'Democrat']; // I should find a way to dynamically generate this list?
    $scope.hasPicture = $scope.user.picture ? true : false;

    console.log($scope.user);

    $scope.updateProfile = function(form) {
      // Hit the update endpoint with new data. Boom.
      if (form.$valid) {
        $http.put('/api/users/' + $scope.user._id,  $scope.user);
      }
    };

    $scope.editImage = function () {
      var pickerOptions = {
        container: 'modal',
        mimetypes: 'image/*',
        services: ['BOX', 'COMPUTER', 'DROPBOX', 'FACEBOOK', 'GOOGLE_DRIVE', 'SKYDRIVE', 'PICASA', 'INSTAGRAM']
      };

      var storeOptions = {
        location: 'S3',
        access: 'public',
        container: 'stump-user-photos'
      };

      filepicker.pickAndStore(pickerOptions, storeOptions, function (files) {
        var fileKey = files[0].key;
        $scope.user.picture = fileKey;
        console.log(fileKey);
        $http.put('/api/users/' + $scope.user._id,  $scope.user);
      });
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
