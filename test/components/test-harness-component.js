/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

function register(module) {
  module.component('brTestHarness', {
    controller: Ctrl,
    templateUrl: requirejs.toUrl(
      'bedrock-angular-authn-password-test/test-harness-component.html')
  });
}

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

return register;

});
