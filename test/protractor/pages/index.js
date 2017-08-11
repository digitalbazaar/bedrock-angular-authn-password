/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

const pages = global.bedrock.pages || {};

pages['bedrock-angular-authn-password'] = {};
pages['bedrock-angular-authn-password'].helpers = require('./helpers');
pages['bedrock-angular-authn-password'].passcode = require('./passcode');
pages['bedrock-angular-authn-password'].password = require('./authn-password');
pages['bedrock-angular-authn-password'].passwordReset =
  require('./password-reset');

module.exports = global.bedrock.pages = pages;
