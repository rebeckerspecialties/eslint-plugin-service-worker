const { ruleTester } = require('../utils/rule-tester');
const { noRestrictedWebApi } = require('../../src/rules/no-restricted-web-api');

ruleTester.run('no-restricted-web-api', noRestrictedWebApi, {
  valid: [
    'console.log("hello world");',
    'const res = await fetch("https://www.test.com");',
    'self.addListener(() => {});',
    'const canvas = new OffscreenCanvas(100, 1)',
    'const file = new File();',
    'const fileReader = new FileReader();',
    'const url = new URL();',
    'const keys = await crypto.subtle.generateKey();',
    'const p = () => new Promise((resolve, reject) => resolve(true));',
    'p().then(() => {}).catch(() => {});',
    'const plainText = atob(btoa("a")); // "a"',
    'export const window = { notBrowserWindow: true };',
    // IndexedDB is allowed
    'const db = await indexedDB.open("mydb", 1);',
    'indexedDB.deleteDatabase("mydb");',
    'const transaction = db.transaction(["store"], "readwrite");',
    // WebCodecs are allowed
    'const decoder = new VideoDecoder({output: () => {}, error: () => {}});',
    'const encoder = new VideoEncoder({output: () => {}, error: () => {}});',
    'const frame = new VideoFrame(canvas, {timestamp: 0});',
    'const audioDecoder = new AudioDecoder({output: () => {}, error: () => {}});',
    // performance.now() is allowed
    'const time = performance.now();',
    'performance.mark("start");',
    'performance.measure("duration", "start", "end");',
    // Streams APIs are allowed
    'const readable = new ReadableStream();',
    'const writable = new WritableStream();',
    'const transform = new TransformStream();',
    'const strategy = new ByteLengthQueuingStrategy({highWaterMark: 1024});',
    'const countStrategy = new CountQueuingStrategy({highWaterMark: 100});',
    'const reader = readable.getReader();',
    // WorkerNavigator.gpu is allowed (accessing via self.navigator)
    'const gpu = self.navigator.gpu;',
  ],
  invalid: [
    {
      code: 'open("https://www.test.com");',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'alert("hello world");',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'var xhr = new XMLHttpRequest();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'var xhr = new window.XMLHttpRequest();',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'window.addListener(() => {})',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'var canvas = document.createElement(\'canvas\');',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'const objectUrl = URL.createObjectURL()',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    // requestAnimationFrame is restricted
    {
      code: 'requestAnimationFrame(() => {});',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'cancelAnimationFrame(id);',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    // localStorage is restricted
    {
      code: 'localStorage.setItem("key", "value");',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'const value = localStorage.getItem("key");',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    // sessionStorage is restricted
    {
      code: 'sessionStorage.setItem("key", "value");',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'const value = sessionStorage.getItem("key");',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    // Navigator.gpu is restricted (but self.navigator.gpu is allowed)
    {
      code: 'const gpu = navigator.gpu;',
      errors: [
        {
          messageId: 'restricted',
        },
      ],
    },
    {
      code: 'const gpu = Navigator.gpu;',
      errors: [
        {
          messageId: 'restricted',
        },
        {
          messageId: 'restricted',
        },
      ],
    },
  ],
});
