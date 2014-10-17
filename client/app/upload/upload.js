'use strict';

angular.module('stumpIoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upload', {
        url: '/upload',
        templateUrl: 'app/upload/upload.html',
        controller: 'UploadCtrl',
        authenticate: true
      })
      .state('uploadSuccess', {
        url: '/upload/success',
        templateUrl: 'app/upload/uploadSuccess.html',
        controller: 'UploadSuccessCtrl',
        authenticate: true
      });
  });
