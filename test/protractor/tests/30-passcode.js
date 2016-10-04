/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = global.bedrock;
var protractor = global.protractor;
var EC = protractor.ExpectedConditions;

var passcode = bedrock.pages['bedrock-angular-authn-password'].passcode;
var helpers = bedrock.pages['bedrock-angular-authn-password'].helpers;

describe('passcode', () => {
  var threeCharacters = 'abc';
  var fortyCharacters = 'yA2NdBthMcnTqGYz3Eqe9uNHxM8u00TaooiuhIM1';
  before(() => {
    bedrock.get('/');
    element(by.buttonText('Password Reset View')).click();
  });
  describe('form validation', ()=> {
    it('should contain the proper fields', () => {
      passcode.checkFields();
    });
    it('should warn on a missing password', function() {
      helpers.testField(
        '$ctrl.sysPassword', '', 'required');
    });
    it('should warn on a short password', function() {
      helpers.testField(
        '$ctrl.sysPassword', threeCharacters, 'minlength');
    });
    it('should warn on a long password', function() {
      helpers.testField(
        '$ctrl.sysPassword', fortyCharacters, 'maxlength');
    });
    it('should warn if password confirmation does not match', function() {
      helpers.testFieldsMatch(
        '$ctrl.sysPassword', '$ctrl.passwordConfirmation',
        'goodPhraseA', 'nonMatchingPhraseB', 'brValidatorSameAs');
    });
    it('warns if password/confirm validated then password is changed', () => {
      helpers.testFieldsMatch2(
        '$ctrl.sysPassword', '$ctrl.passwordConfirmation',
        'goodPhraseA', 'nonMatchingPhraseB', 'brValidatorSameAs');
    });
  }); // end form validation
  describe('form submission', ()=> {
    it('does not allow submission of an invalid form', ()=> {
      element(by.brModel('$ctrl.sysPassword'))
        .clear()
        .sendKeys('somePassword');
      element(by.brModel('$ctrl.passwordConfirmation'))
        .clear()
        .sendKeys('someNonMatchingPassword');
      var resetButton = element(by.buttonText('Reset Password'));
      resetButton.isEnabled().should.eventually.be.false;
    });
    it('should allows submission of a valid form', ()=> {
      element(by.brModel('$ctrl.sysPassword'))
        .clear()
        .sendKeys('somePassword');
      element(by.brModel('$ctrl.passwordConfirmation'))
        .clear()
        .sendKeys('somePassword');
      var resetButton = element(by.buttonText('Reset Password'));
      browser.wait(EC.elementToBeClickable(resetButton));
    });
  });
});
