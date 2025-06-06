const { isExtensionApiPropertyDeprecated } = require('../lib/deprecated-extension-api-property');
const { isIdentifier, isMemberExpression } = require('../utils/ast');
const { report } = require('../utils/report');

const noDeprecatedExtensionApi = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow usage of deprecated extension APIs in service worker environments',
      recommended: true,
      url: 'https://github.com/dropbox/eslint-plugin-service-worker/blob/main/docs/rules/no-deprecated-extension-api.md',
    },
    messages: {
      restricted: '{{api}} does not exist in service worker.',
    },
    schema: [],
  },
  create(context) {
    return {
      MemberExpression({ object, property }) {
        if (!isIdentifier(object) && !isMemberExpression(object)) {
          return;
        }

        const parent = isMemberExpression(object) ? object.property : object;

        if (isExtensionApiPropertyDeprecated(parent.name, property.name)) {
          report(context, parent, property);
        }
      },
    };
  },
};

module.exports = {
  noDeprecatedExtensionApi,
};
