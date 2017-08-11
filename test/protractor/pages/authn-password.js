/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

const api = {};
module.exports = api;

api.COMPONENT_TAG = 'br-authn-password';

api.checkFields = function() {
  const c = api.component();
  checkElement(c.element(by.brModel('$ctrl.sysIdentifier')));
  checkElement(c.element(by.brModel('$ctrl.sysIdentifier')));
  checkElement(c.element(by.buttonText('Sign In')));

  // NOTE: workaround MicrosoftEdge15.15063 returns space at the end
  c.$('a').getText().then(txt => {
    txt.trim().should.equal('Forgot your password?');
  });
};

api.component = function() {
  return $(api.COMPONENT_TAG);
};

function checkElement(e) {
  return e.isPresent().should.eventually.be.true;
}
