/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
require('bedrock-authn-password');
require('bedrock-identity-http');
require('bedrock-protractor');
require('bedrock-views');
require('bedrock-webpack');
require('./mock.data');
require('./app.config');

require('bedrock-test');
bedrock.start();
