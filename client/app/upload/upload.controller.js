'use strict';

angular.module('stumpIoApp')
  .controller('UploadCtrl', function ($scope, $http, $state, growl) {
    $scope.tags = [];
    $scope.disabled = true;
    $scope.fileCalleback = function (file) {
      $scope.disabled = false;
      $scope.fileKey = file[0].key;
    };
    $scope.submit = function () {
      $http.post('/api/posts',  { 'videoURL' : $scope.fileKey, 'tags': $scope.tags, 'headline': $scope.headline })
        .success(function() {
          $state.go('uploadSuccess');
        })
        .error(function() {
          growl.error("There was a problem uploading your video. Please try again.");
        });
    };
  })
  .controller('UploadSuccessCtrl', function ($scope, $state) {
    $scope.goToFeed = function () {
      $state.go('feed');
    }
  })
  .directive('filepicker', function(){
    return {
      scope: {
        callback: '&',
        'pickerclass': '@'
      },
      transclude: true,
      restrict: 'A',
      template: '<a href=\'javascript:;\' class=\'{{pickerclass}}\' ng-click=\'pickFiles()\' ng-transclude></a>',
      link: function(scope, element, attrs) {
        scope.pickFiles = function () {
          var pickerOptions = {
            container: 'modal',
            mimetypes: attrs.mimetypes ? attrs.mimetypes : 'video/*',
            multiple: attrs.multiple ? attrs.multiple : false
          };

          var storeOptions = {
            location: 'S3',
            access: 'public'
          };

          filepicker.pickAndStore(pickerOptions, storeOptions, function (fpfiles) {
            scope.$apply(function(){
              scope.callback({file:fpfiles});
            });
          });
        };
      }
    };
  });
