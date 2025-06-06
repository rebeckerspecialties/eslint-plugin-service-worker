const noDynamicImport = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow dynamic imports in service worker environments',
      recommended: true,
      url: 'https://github.com/dropbox/eslint-plugin-service-worker/blob/main/docs/rules/no-dynamic-import.md',
    },
    messages: {
      restricted: 'Dynamic import is restricted in service worker.',
    },
    schema: [],
  },
  create(context) {
    return {
      ImportExpression(node) {
        context.report({
          node,
          messageId: 'restricted',
        });
      },
    };
  },
};

module.exports = {
  noDynamicImport,
};
