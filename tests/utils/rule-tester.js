const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require('@babel/eslint-parser'),
    parserOptions: {
      requireConfigFile: false,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
});

module.exports = {
  ruleTester,
};
