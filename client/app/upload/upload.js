'use strict';

filepicker.setKey('AvbcyLqrSxK7GoIAJ6stPz');

angular.module('stumpIoApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upload', {
        url: '/upload',
        templateUrl: 'app/upload/upload.html',
        controller: 'UploadCtrl'
      });

  });
