'use strict';

describe('Service: userAction', function () {

  // load the service's module
  beforeEach(module('stumpIoApp'));

  // instantiate service
  var userAction;
  beforeEach(inject(function (_userAction_) {
    userAction = _userAction_;
  }));

  it('should do something', function () {
    expect(!!userAction).toBe(true);
  });

});
