/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
/* @ngInject */
export default function factory($http) {
  var service = {};

  service.login = function(authData) {
    // POST identity for verification and to establish session
    // TODO: make URL configurable
    return Promise.resolve($http.post('/authn/password/login', authData))
      .then(function(response) {
        return response.data;
      });
  };

  service.resetPassword = function(options) {
    // TODO: make URL configurable
    return Promise.resolve($http.post('/authn/password/reset', options))
      .then(function(response) {
        return response.data;
      });
  };

  service.sendPasscode = function(options) {
    // TODO: make URL configurable
    return Promise.resolve($http.post('/authn/password/passcode', options));
  };

  return service;
}
