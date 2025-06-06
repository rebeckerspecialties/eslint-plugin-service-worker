const { noDynamicImport } = require('./rules/no-dynamic-import');
const { noRestrictedWebApi } = require('./rules/no-restricted-web-api');
const { noDeprecatedExtensionApi } = require('./rules/no-deprecated-extension-api');

const rules = {
  'no-restricted-web-api': noRestrictedWebApi,
  'no-deprecated-extension-api': noDeprecatedExtensionApi,
  'no-dynamic-import': noDynamicImport,
};

const plugin = {
  meta: {
    name: '@dropbox/eslint-plugin-service-worker',
    version: '1.0.0',
  },
  rules,
};

// Support both legacy and flat config formats
module.exports = plugin;

// Flat config support
module.exports.default = plugin;

// Legacy format support
module.exports.rules = rules;
