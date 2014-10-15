'use strict';

angular.module('stumpIoApp')
  .filter('userPicture', function () {
    return function (input) {
      return '//stump-user-photos.s3-us-west-2.amazonaws.com/' + input;
    };
  });
