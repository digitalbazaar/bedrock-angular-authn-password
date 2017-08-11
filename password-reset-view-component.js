/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl:
    'bedrock-angular-authn-password/password-reset-view-component.html'
};

/* @ngInject */
function Ctrl($location, $scope, brAlertService, brPasswordService) {
  const self = this;
  self.display = {
    reset: true,
    success: false
  };
  const query = $location.search();

  if(!(query.id && query.passcode)) {
    $location.url('/');
  }

  self.resetPassword = function(password) {
    const options = {
      sysIdentifier: query.id,
      sysPasscode: query.passcode,
      sysPasswordNew: password
    };
    brPasswordService.resetPassword(options)
      .then(function() {
        _display('success');
      })
      .catch(function(err) {
        brAlertService.add('error', err, {scope: $scope});
      })
      .then(function() {
        $scope.$apply();
      });
  };

  function _display(showProperty) {
    for(const propertyName in self.display) {
      self.display[propertyName] = false;
    }
    self.display[showProperty] = true;
  }
}
