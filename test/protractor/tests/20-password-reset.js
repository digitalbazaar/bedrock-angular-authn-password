/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = global.bedrock;
const should = global.should;
const protractor = global.protractor;
const EC = protractor.ExpectedConditions;

const passwordReset =
  bedrock.pages['bedrock-angular-authn-password'].passwordReset;

describe('bedrock-angular-authn-password password reset', () => {
  before(() => {
    bedrock.get('/');
  });
  beforeEach(() => {
    element(by.buttonText('Reset Password')).click();
    browser.wait(EC.visibilityOf($(
      'br-authn-password-reset-request-modal')), 3000);
  });
  it('should contain the proper fields and close on cancel', () => {
    passwordReset.checkFields();
    passwordReset.component().element(by.buttonText('Cancel')).click();
    passwordReset.component().isPresent().should.eventually.be.false;
  });
  it('default to the identifier provided as an attribute', () => {
    passwordReset.component().element(by.brModel('$ctrl.sysIdentifier'))
      .getAttribute('value').should.eventually.equal('alpha@bedrock.dev');
    passwordReset.component().element(by.buttonText('Cancel')).click();
  });
  it('the input should be read only', () => {
    passwordReset.component().element(by.brModel('$ctrl.sysIdentifier'))
      .getAttribute('readonly').should.eventually.equal('true');
    passwordReset.component().element(by.buttonText('Cancel')).click();
  });
  it('should display confirmation message with close button', () => {
    passwordReset.component().element(by.buttonText('Send')).click();
    passwordReset.component().$('br-modal-body').getText()
      .should.eventually
      .contain('An email has been sent with a link to set your password.');
    passwordReset.component().$('br-modal-body').getText()
      .should.eventually.contain('Email sent to: alpha@bedrock.dev');
    passwordReset.component().element(by.buttonText('Close')).isDisplayed()
      .should.eventually.be.true;
    passwordReset.component().element(by.buttonText('Close')).click();
    passwordReset.component().isPresent().should.eventually.be.false;
    const identity = $('pre');
    browser.wait(EC.visibilityOf(identity), 10000);
    identity.getText().then(text => {
      const i = JSON.parse(text);
      should.exist(i.sysIdentifier);
      i.sysIdentifier.should.equal('alpha@bedrock.dev');
    });
  });
});
