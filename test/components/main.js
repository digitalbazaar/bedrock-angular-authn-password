/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './test-harness-component'
], function(angular) {

'use strict';

var module = angular.module('bedrock.authn-password-test', [
  'bedrock.authn', 'bedrock.authn-password'
]);

Array.prototype.slice.call(arguments, 1).forEach(function(register) {
  register(module);
});

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Messages',
      template: '<br-test-harness></br-test-harness>'
    })
    .when('/passcode', {
      title: 'Reset Password',
      template: '<br-authn-password-reset-view></br-authn-password-reset-view>'
    });
});

});
