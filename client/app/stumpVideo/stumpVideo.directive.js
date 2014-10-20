'use strict';

angular.module('stumpIoApp')
  .directive('stumpVideo', function () {
    return {
      scope: '=post',
      // templateUrl: 'app/stumpVideo/stumpVideo.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.append('<div id=' + attrs.vid + ' />');
        var node = element.find('div').get(0);
        jwplayer(node).setup({
          sources: scope.post.src,
          width: '100%',
          aspectratio: '16:9'
        });
      }
    };
  });
