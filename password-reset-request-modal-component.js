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
function Ctrl($scope, brAlertService) {
  var self = this;
  self.display = {
    requestForm: true,
    requestSubmitted: false
  };
  self.title = self.title || 'Forgot your password?';

  self.submit = function() {
    Promise.resolve(self.onSubmit({
      options: {sysIdentifier: self.sysIdentifier}
    })).then(function() {
      self.modalTitle = 'Request received';
      _display('requestSubmitted');
    })
    .catch(function(err) {
      brAlertService.add('error', err, {scope: $scope});
    })
    .then(function() {
      $scope.$apply();
    });
  };

  function _display(showProperty) {
    for(var propertyName in self.display) {
      self.display[propertyName] = false;
    }
    self.display[showProperty] = true;
  }
}
