const { isWebApiRestricted } = require('../lib/restricted-web-api');
const { isWebApiPropertyRestricted } = require('../lib/restricted-web-api-property');
const { isIdentifier, isMemberExpression } = require('../utils/ast');
const { report } = require('../utils/report');

const noRestrictedWebApi = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow usage of restricted Web APIs in service worker environments',
      recommended: true,
      url: 'https://github.com/dropbox/eslint-plugin-service-worker/blob/main/docs/rules/no-restricted-web-api.md',
    },
    messages: {
      restricted: '{{api}} does not exist in service worker.',
    },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const scope = context.sourceCode ? context.sourceCode.getScope(node) : context.getScope();
        // Report variables declared elsewhere (ex: variables defined as "global" by eslint)
        scope.variables.forEach((variable) => {
          if (!variable.defs.length && isWebApiRestricted(variable.name)) {
            variable.references.forEach((reference) => {
              report(context, reference.identifier);
            });
          }
        });

        // Report variables not declared at all
        scope.through.forEach((reference) => {
          if (isWebApiRestricted(reference.identifier.name)) {
            report(context, reference.identifier);
          }
        });
      },
      MemberExpression({ object, property }) {
        if (!isIdentifier(object) && !isMemberExpression(object)) {
          return;
        }

        // Special case: self.navigator.gpu is allowed (WorkerNavigator)
        if (isMemberExpression(object) &&
            object.object &&
            object.object.name === 'self' &&
            object.property &&
            object.property.name === 'navigator' &&
            property.name === 'gpu') {
          return; // Allow self.navigator.gpu
        }

        const parent = isMemberExpression(object) ? object.property : object;

        if (isWebApiPropertyRestricted(parent.name, property.name)) {
          report(context, parent, property);
        }
      },
    };
  },
};

module.exports = {
  noRestrictedWebApi,
};
