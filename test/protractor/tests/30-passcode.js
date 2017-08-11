/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = global.bedrock;
const protractor = global.protractor;
const EC = protractor.ExpectedConditions;

const passcode = bedrock.pages['bedrock-angular-authn-password'].passcode;
const helpers = bedrock.pages['bedrock-angular-authn-password'].helpers;

describe('passcode', () => {
  const threeCharacters = 'abc';
  const fortyCharacters = 'yA2NdBthMcnTqGYz3Eqe9uNHxM8u00TaooiuhIM1';
  let altElement;
  before(() => {
    bedrock.get('/');
    element(by.buttonText('Password Reset View')).click();
    browser.wait(EC.visibilityOf($('br-authn-password-reset-view')), 3000);
    // header that says 'Password Reset'
    altElement = $('h3');
  });
  describe('form validation', () => {
    it('should contain the proper fields', () => {
      passcode.checkFields();
    });
    it('should warn on a missing password', () => {
      helpers.testField(
        '$ctrl.sysPassword', '', 'required', altElement);
    });
    it('should warn on a short password', () => {
      helpers.testField(
        '$ctrl.sysPassword', threeCharacters, 'minlength', altElement);
    });
    it('should warn on a long password', () => {
      helpers.testField(
        '$ctrl.sysPassword', fortyCharacters, 'maxlength', altElement);
    });
    it('should warn if password confirmation does not match', () => {
      helpers.testFieldsMatch(
        '$ctrl.sysPassword', '$ctrl.passwordConfirmation',
        'goodPhraseA', 'nonMatchingPhraseB', 'brValidatorSameAs', altElement);
    });
    it('warns if password/confirm validated then password is changed', () => {
      helpers.testFieldsMatch2(
        '$ctrl.sysPassword', '$ctrl.passwordConfirmation',
        'goodPhraseA', 'nonMatchingPhraseB', 'brValidatorSameAs', altElement);
    });
  }); // end form validation
  describe('form submission', () => {
    it('does not allow submission of an invalid form', () => {
      element(by.brModel('$ctrl.sysPassword'))
        .clear()
        .sendKeys('somePassword');
      element(by.brModel('$ctrl.passwordConfirmation'))
        .clear()
        .sendKeys('someNonMatchingPassword');
      const resetButton = element(by.buttonText('Reset Password'));
      resetButton.isEnabled().should.eventually.be.false;
    });
    it('allows submission of a valid form', () => {
      element(by.brModel('$ctrl.sysPassword'))
        .clear()
        .sendKeys('somePassword');
      element(by.brModel('$ctrl.passwordConfirmation'))
        .clear()
        .sendKeys('somePassword');
      const resetButton = element(by.buttonText('Reset Password'));
      browser.wait(EC.elementToBeClickable(resetButton), 3000);
    });
  });
});
