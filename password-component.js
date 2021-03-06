/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';

export default {
  bindings: {
    sysId: '@brIdentity',
    onLogin: '&brOnLogin'
  },
  controller: Ctrl,
  templateUrl: 'bedrock-angular-authn-password/password-component.html'
};

/* @ngInject */
function Ctrl($q, $scope, brAlertService, brPasswordService) {
  const self = this;
  self.loading = false;
  self.multiple = false;
  self.password = null;
  self.sysIdentifier = null;
  self.showModal = {
    passwordReset: false
  };

  self.login = function() {
    self.loading = true;
    brAlertService.clearFeedback();

    const authData = {
      password: self.password,
      sysIdentifier: self.sysIdentifier
    };
    if(self.sysId) {
      authData.id = self.sysId;
    }
    brPasswordService.login(authData)
      .then(data => {
        // if a single 'identity' is returned, login was successful
        if(data.identity) {
          return data.identity;
        }

        // show multiple identities
        self.multiple = true;
        self.email = data.email;
        self.choices = [];
        angular.forEach(data.identities, function(identity, identityId) {
          self.choices.push({id: identityId, label: identity.label});
        });
        self.sysIdentifier = self.choices[0].id;
        self.loading = false;
      }).catch(err => {
        if(err.type === 'ValidationError') {
          err = 'The password you entered was incorrect. Please try again.';
        }
        brAlertService.add('error', err, {scope: $scope});
      }).then(function(identity) {
        if(!identity) {
          return;
        }
        return self.onLogin({identity: identity});
      }).then(() => {
        self.loading = false;
      });
  };

  self.sendPasscode = options => {
    return brPasswordService.sendPasscode({
      sysIdentifier: options.sysIdentifier
    });
  };
}
