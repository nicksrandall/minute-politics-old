'use strict';

describe('Directive: stumpVideo', function () {

  // load the directive's module and view
  beforeEach(module('stumpIoApp'));
  beforeEach(module('app/stumpVideo/stumpVideo.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stump-video></stump-video>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the stumpVideo directive');
  }));
});