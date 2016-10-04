/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */

var api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-authn-password-reset-request-modal';

api.checkFields = function() {
  var c = api.component();
  var elements = [];
  elements.push(c.element(by.brModel('$ctrl.sysIdentifier')));
  elements.push(c.element(by.buttonText('Send')));
  elements.push(c.element(by.buttonText('Cancel')));
  for(var i in elements) {
    elements[i].isPresent().should.eventually.be.true;
  }
};

api.component = function() {
  return $(api.COMPONENT_TAG);
};
