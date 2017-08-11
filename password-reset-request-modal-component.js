/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  bindings: {
    title: '@?brTitle',
    onSubmit: '&brOnSubmit',
    readOnly: '<brReadOnly',
    sysIdentifier: '<brSysIdentifier'
  },
  controller: Ctrl,
  require: {
    stackable: '^stackable'
  },
  templateUrl:
    'bedrock-angular-authn-password/password-reset-request-modal-component.html'
};

/* @ngInject */
function Ctrl($q, $scope, brAlertService) {
  const self = this;
  self.display = {
    requestForm: true,
    requestSubmitted: false
  };

  self.$onInit = () => {
    self.title = self.title || 'Forgot your password?';
  };

  self.submit = function() {
    $q.resolve(self.onSubmit({
      options: {sysIdentifier: self.sysIdentifier}
    })).then(function() {
      self.modalTitle = 'Request received';
      _display('requestSubmitted');
    })
    .catch(function(err) {
      brAlertService.add('error', err, {scope: $scope});
    });
  };

  function _display(showProperty) {
    for(const propertyName in self.display) {
      self.display[propertyName] = false;
    }
    self.display[showProperty] = true;
  }
}
