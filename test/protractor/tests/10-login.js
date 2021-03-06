/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = global.bedrock;
const EC = protractor.ExpectedConditions;

const authnPassword = bedrock.pages['bedrock-angular-authn-password'].password;
const passwordReset =
  bedrock.pages['bedrock-angular-authn-password'].passwordReset;

describe('bedrock-angular-authn-password login', () => {
  describe('login', () => {
    before(() => {
      bedrock.get('/');
      element(by.buttonText('Sign In')).click();
      browser.wait(EC.visibilityOf(authnPassword.component()), 3000);
    });
    it('should contain the proper elements', () => {
      authnPassword.checkFields();
    });
    it.skip('should display alert on blank login', () => {
      authnPassword.component().element(by.buttonText('Sign In')).click();

      const loginError = $('.br-alert-area-fixed-show');
      loginError.isPresent().should.eventually.be.true;
      loginError.getText().should.eventually
        .contain('The password you entered was incorrect. Please try again.');
    });
    it.skip('should display an alert on incorrect login information', () => {
      authnPassword.component().element(by.brModel('$ctrl.sysIdentifier'))
        .clear()
        .sendKeys('unknownUser@bedrock.dev');
      authnPassword.component().element(by.brModel('$ctrl.password'))
        .clear()
        .sendKeys('badPassword');
      authnPassword.component().element(by.buttonText('Sign In')).click();
      const loginError = $('.br-alert-area-fixed-show');
      loginError.isPresent().should.eventually.be.true;
      loginError.getText().should.eventually
        .contain('The email address and password combination is incorrect.');
    });
    it('should login with proper email and password', () => {
      authnPassword.component().element(by.brModel('$ctrl.sysIdentifier'))
        .clear()
        .sendKeys('alpha@bedrock.dev');
      authnPassword.component().element(by.brModel('$ctrl.password'))
        .clear()
        .sendKeys('password');
      authnPassword.component().element(by.buttonText('Sign In')).click();
      browser.wait(EC.invisibilityOf(authnPassword.component()), 3000);
      const identity = $('pre');
      browser.wait(EC.visibilityOf(identity), 10000);
      identity.getText().then(text => {
        const i = JSON.parse(text);
        i.type.should.equal('Identity');
        i.sysSlug.should.equal('alpha');
      });
    });
  }); // end login
  describe('forgot password', () => {
    before(() => {
      bedrock.get('/');
      element(by.buttonText('Sign In')).click();
      browser.wait(EC.visibilityOf(authnPassword.component()), 3000);
      authnPassword.component().element(by.brModel('$ctrl.sysIdentifier'))
        .clear()
        .sendKeys('passwordreset@bedrock.dev');
    });
    beforeEach(() => {
      // authnPassword.component().element(by.linkText('Forgot your password?'))
      // NOTE: workaround MicrosoftEdge15.15063 returns space at the end
      authnPassword.component().$('a').click();
    });
    it('should contain the proper fields and cancel should close modal', () => {
      passwordReset.checkFields();
      passwordReset.component().element(by.buttonText('Cancel')).click();
      passwordReset.component().isPresent().should.eventually.be.false;
    });
    it('should default to the email provided on the login modal', () => {
      passwordReset.component().element(by.brModel('$ctrl.sysIdentifier'))
        .getAttribute('value')
        .should.eventually.equal('passwordreset@bedrock.dev');
      passwordReset.component().element(by.buttonText('Cancel')).click();
    });
    it('allows modification of email address', () => {
      passwordReset.component().element(by.brModel('$ctrl.sysIdentifier'))
        .clear()
        .sendKeys('anotheremail@bedrock.dev');
      passwordReset.component().element(by.brModel('$ctrl.sysIdentifier'))
        .getAttribute('value')
        .should.eventually.equal('anotheremail@bedrock.dev');
      passwordReset.component().element(by.buttonText('Cancel')).click();
    });
    it.skip('should display an alert if the email is not registered', () => {
      passwordReset.component().element(by.buttonText('Send')).click();
      const resetAlert = $('.br-alert-area-fixed-show');
      resetAlert.isPresent().should.eventually.be.true;
      resetAlert.getText().should.eventually
        .contain('The given email address is not registered.');
      passwordReset.component().element(by.buttonText('Cancel')).click();
    });
    it('should display confirmation message with close button', () => {
      passwordReset.component().element(by.brModel('$ctrl.sysIdentifier'))
        .clear()
        .sendKeys('alpha@bedrock.dev');
      passwordReset.component().element(by.buttonText('Send')).click();
      passwordReset.component().$('br-modal-body').getText()
        .should.eventually
        .contain('An email has been sent with a link to set your password.');
      passwordReset.component().$('br-modal-body').getText()
        .should.eventually.contain('Email sent to: alpha@bedrock.dev');
      passwordReset.component().element(by.buttonText('Close')).isDisplayed()
        .should.eventually.be.true;
      passwordReset.component().element(by.buttonText('Close')).click();
      browser.wait(EC.invisibilityOf(passwordReset.component()), 3000);
      passwordReset.component().isPresent().should.eventually.be.false;
    });
  });
});
