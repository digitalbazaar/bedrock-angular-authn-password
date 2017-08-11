/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
/* @ngInject */
export default function factory($http) {
  const service = {};

  service.login = authData => {
    // POST identity for verification and to establish session
    // TODO: make URL configurable
    return $http.post('/authn/password/login', authData)
      .then(response => response.data);
  };

  service.resetPassword = options => {
    // TODO: make URL configurable
    return $http.post('/authn/password/reset', options)
      .then(response => response.data);
  };

  service.sendPasscode = options => {
    // TODO: make URL configurable
    return $http.post('/authn/password/passcode', options);
  };

  return service;
}
