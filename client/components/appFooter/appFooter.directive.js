'use strict';

angular.module('stumpIoApp')
  .directive('appFooter', function () {
    return {
      templateUrl: 'components/appFooter/appFooter.html',
      restrict: 'EA',
      // link: function (scope, element, attrs) {
      // }
    };
  });
