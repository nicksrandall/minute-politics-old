'use strict';

angular.module('stumpIoApp')
  .directive('stumpVideo', function () {
    return {
      scope: '=post',
      templateUrl: 'app/stumpVideo/stumpVideo.html',
      restrict: 'EA',
      // link: function (scope, element, attrs) {
      //   // Do something here if needed.
      // }
    };
  });
