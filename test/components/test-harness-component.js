/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'bedrock-angular-authn-password-test/test-harness-component.html'
};

/* @ngInject */
function Ctrl($location, brAuthnService) {
  const self = this;
  self.showLogin = false;
  self.resetIdentifier = 'alpha@bedrock.dev';

  self.authentication = {
    displayOrder: brAuthnService.displayOrder,
    methods: brAuthnService.methods
  };

  self.onLogin = identity => {
    self.testData = identity;
  };

  self.passcode = () => {
    $location.url('/passcode?id=someId&passcode=123');
  };

  self.sendPasscode = options => {
    self.testData = options;
  };
}
