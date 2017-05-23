/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'bedrock-angular-authn-password-test/test-harness-component.html'
};

/* @ngInject */
function Ctrl($location, brAuthnService) {
  var self = this;
  self.showLogin = false;
  self.testData = {};
  self.resetIdentifier = 'alpha@bedrock.dev';

  self.authentication = {
    displayOrder: brAuthnService.displayOrder,
    methods: brAuthnService.methods
  };

  self.onLogin = function(identity) {
    self.testData = identity;
  };

  self.passcode = function() {
    $location.url('/passcode?id=someId&passcode=123');
  };

  self.sendPasscode = function(options) {
    self.testData = options;
  };

}
