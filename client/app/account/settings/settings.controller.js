'use strict';

angular.module('stumpIoApp')
  .controller('SettingsCtrl', function ($scope, Auth, $http, growl) {
    $scope.errors = {};
    $scope.isAdmin = Auth.isAdmin;
    $scope.parties = ['Republican', 'Democrat']; // I should find a way to dynamically generate this list?
    $scope.currentUser = Auth.getCurrentUser();
    $scope.hasPicture = $scope.currentUser.picture ? true : false;

    $scope.updateProfile = function(form) {
      // Hit the update endpoint with new data. Boom.
      if (form.$valid) {
        $http.put('/api/users/' + $scope.currentUser._id,  $scope.currentUser)
          .success(function() {
            growl.success('Your profile information has been saved.');
          })
          .error(function() {
            growl.error('There was a problem saving your profile information. Please try again.');
          });
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

      var converOptions = {
        width: 250,
        height: 250,
        fit: 'crop',
        align: 'faces',
        format: 'png'
      };

      filepicker.pick(pickerOptions, function (file) {
        console.log(file);
        filepicker.convert(file, converOptions, storeOptions, function (newFile) {
          console.log(newFile);
          var fileKey = newFile.key;
          $scope.currentUser.picture = fileKey;
          console.log(fileKey);
          $http.put('/api/users/' + $scope.currentUser._id,  $scope.currentUser);
        });
      });
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.currentUser.oldPassword, $scope.currentUser.newPassword )
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
