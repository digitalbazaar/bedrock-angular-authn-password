/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import PasswordComponent from './password-component.js';
import PasswordResetComponent from './password-reset-component.js';
import PasswordResetRequestModalComponent from
  './password-reset-request-modal-component.js';
import PasswordResetViewComponent from './password-reset-view-component.js';
import PasswordService from './password-service.js';

const module = angular.module(
  'bedrock.authn-password', ['bedrock.alert', 'bedrock.authn', 'bedrock.form',
    'bedrock.modal', 'ngMaterial', 'ngMessages']
);

module.component('brAuthnPassword', PasswordComponent);
module.component('brAuthnPasswordReset', PasswordResetComponent);
module.component('brAuthnPasswordResetRequestModal',
  PasswordResetRequestModalComponent);
module.component('brAuthnPasswordResetView', PasswordResetViewComponent);
module.service('brPasswordService', PasswordService);

/* @ngInject */
module.run(brAuthnService => {
  const options = {
    template: 'bedrock-angular-authn-password/password.html'
  };
  brAuthnService.register('authn-password', options);
});
