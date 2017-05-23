/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

var api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-authn-password-reset';

api.checkFields = function() {
  var c = api.component();
  var elements = [];
  elements.push(c.element(by.brModel('$ctrl.sysPassword')));
  elements.push(c.element(by.brModel('$ctrl.passwordConfirmation')));
  elements.push(c.element(by.buttonText('Reset Password')));
  for(var i in elements) {
    elements[i].isPresent().should.eventually.be.true;
  }
};

api.component = function() {
  return $(api.COMPONENT_TAG);
};
