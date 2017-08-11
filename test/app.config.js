/*!
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const config = bedrock.config;
const path = require('path');

// mongodb config
config.mongodb.name = 'bedrock_angular_authn_password_app';
config.mongodb.host = 'localhost';
config.mongodb.port = 27017;
config.mongodb.local.collection = 'bedrock_angular_authn_password_app';

const dir = path.join(__dirname);
config.views.system.packages.push({
  path: path.join(dir, 'components'),
  manifest: path.join(dir, 'package.json')
});

const parentDir = path.join(__dirname, '..');
config.views.system.packages.push({
  path: path.join(parentDir),
  manifest: path.join(parentDir, 'package.json')
});

const permissions = config.permission.permissions;
const roles = config.permission.roles;
roles['bedrock-test.identity.registered'] = {
  id: 'bedrock-test.identity.registered',
  label: 'Identity Manager',
  comment: 'Role for identity managers.',
  sysPermission: [
    permissions.IDENTITY_ACCESS.id,
    permissions.IDENTITY_INSERT.id,
    permissions.IDENTITY_EDIT.id,
    permissions.PUBLIC_KEY_ACCESS.id,
    permissions.PUBLIC_KEY_CREATE.id,
    permissions.PUBLIC_KEY_EDIT.id,
    permissions.PUBLIC_KEY_REMOVE.id
  ]
};
