/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  bindings: {
    onComplete: '&brOnComplete'
  },
  controller: Ctrl,
  templateUrl: 'bedrock-angular-authn-password/password-reset-component.html'
};

/* @ngInject */
function Ctrl() {
  const self = this;
  self.sysPassword = '';
  self.loading = false;

  self.submit = function() {
    self.onComplete({password: self.sysPassword});
  };
}
