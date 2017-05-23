/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
// NOTE: it is critical that bedrock-protractor be required first so that
// it can register a bedrock.cli event listener
require('bedrock-protractor');
require('bedrock-authn-password');
require('bedrock-identity-http');
require('bedrock-views');
require('./mock.data');
require('./app.config');

require('bedrock-test');
bedrock.start();
