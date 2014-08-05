'use strict';

describe('Directive: moveable', function () {

  // load the directive's module
  beforeEach(module('socketMdiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<moveable></moveable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the moveable directive');
  }));
});