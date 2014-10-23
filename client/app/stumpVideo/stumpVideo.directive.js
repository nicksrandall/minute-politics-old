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
          image: scope.post.poster ? ('https://stump-video-thumb.s3-us-west-2.amazonaws.com/' + scope.post.poster) : null,
          sources: scope.post.src,
          width: '100%',
          aspectratio: '16:9'
        });
      }
    };
  });
