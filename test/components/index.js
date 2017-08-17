/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import TestHarnessComponent from './test-harness-component.js';

const module = angular.module('bedrock.authn-password-test', [
  'bedrock.authn', 'bedrock.authn-password', 'ngMaterial'
]);

bedrock.setRootModule(module);

module.component('brTestHarness', TestHarnessComponent);

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
