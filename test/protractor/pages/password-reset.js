/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

const api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-authn-password-reset-request-modal';

api.checkFields = function() {
  const c = api.component();
  const elements = [];
  elements.push(c.element(by.brModel('$ctrl.sysIdentifier')));
  elements.push(c.element(by.buttonText('Send')));
  elements.push(c.element(by.buttonText('Cancel')));
  for(const i in elements) {
    elements[i].isPresent().should.eventually.be.true;
  }
};

api.component = function() {
  return $(api.COMPONENT_TAG);
};
