/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './password-component',
  './password-reset-component',
  './password-reset-request-modal-component',
  './password-reset-view-component',
  './password-service'
], function(angular) {

'use strict';

var module = angular.module(
  'bedrock.authn-password', ['bedrock.alert', 'bedrock.authn', 'bedrock.form']);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

/* @ngInject */
module.run(function(brAuthnService) {
  var options = {
    template: requirejs.toUrl('bedrock-angular-authn-password/password.html')
  };
  brAuthnService.register('authn-password', options);
});

});
