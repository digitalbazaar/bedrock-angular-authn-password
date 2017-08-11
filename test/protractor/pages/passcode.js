/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

const api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-authn-password-reset';

api.checkFields = function() {
  const c = api.component();
  const elements = [];
  elements.push(c.element(by.brModel('$ctrl.sysPassword')));
  elements.push(c.element(by.brModel('$ctrl.passwordConfirmation')));
  elements.push(c.element(by.buttonText('Reset Password')));
  for(const i in elements) {
    elements[i].isPresent().should.eventually.be.true;
  }
};

api.component = function() {
  return $(api.COMPONENT_TAG);
};
