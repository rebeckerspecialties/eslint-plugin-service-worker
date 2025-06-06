const { ruleTester } = require('../utils/rule-tester');
const { noDeprecatedExtensionApi } = require('../../src/rules/no-deprecated-extension-api');

ruleTester.run('no-deprecated-extension-api', noDeprecatedExtensionApi, {
  valid: [
    'browser.action.setIcon()',
  ],
  invalid: [
    {
      code: 'browser.browserAction.setIcon();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'browser.pageAction.setIcon();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'chrome.browserAction.setIcon();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'chrome.pageAction.setIcon();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'chrome.tabs.executeScript();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'browser.tabs.executeScript();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'tabs.executeScript();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'chrome.runtime.getBackgroundPage();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'chrome.extension.getBackgroundPage();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'chrome.extension.getExtensionTabs();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'chrome.extension.getViews();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
  ],
});
