const { JSDOM } = require('jsdom');

const jsdom = new JSDOM();

const blockList = [
  ...Object.keys(jsdom.window),
  'XMLHttpRequest',
];

const allowList = [
  // Basic utilities
  'console',
  'atob',
  'btoa',
  'setTimeout',
  'setInterval',
  'clearInterval',
  'clearTimeout',

  // Service Worker specific
  'self',
  'caches',
  'clients',
  'registration',

  // Networking
  'fetch',
  'Headers',
  'Request',
  'Response',

  // Crypto
  'crypto',
  'CryptoKey',
  'SubtleCrypto',

  // Performance
  'performance',
  'Performance',
  'PerformanceEntry',
  'PerformanceMark',
  'PerformanceMeasure',
  'PerformanceObserver',
  'PerformanceObserverEntryList',
  'PerformanceResourceTiming',

  // IndexedDB
  'indexedDB',
  'IDBCursor',
  'IDBCursorWithValue',
  'IDBDatabase',
  'IDBFactory',
  'IDBIndex',
  'IDBKeyRange',
  'IDBObjectStore',
  'IDBOpenDBRequest',
  'IDBRequest',
  'IDBTransaction',
  'IDBVersionChangeEvent',

  // Streams
  'ReadableStream',
  'ReadableStreamDefaultReader',
  'ReadableStreamBYOBReader',
  'WritableStream',
  'WritableStreamDefaultWriter',
  'TransformStream',
  'ByteLengthQueuingStrategy',
  'CountQueuingStrategy',

  // WebCodecs
  'VideoDecoder',
  'VideoEncoder',
  'AudioDecoder',
  'AudioEncoder',
  'VideoFrame',
  'AudioData',
  'EncodedVideoChunk',
  'EncodedAudioChunk',
  'VideoColorSpace',
  'ImageDecoder',
  'ImageTrackList',
  'ImageTrack',

  // URLs and encoding
  'URL',
  'URLSearchParams',
  'TextEncoder',
  'TextDecoder',
  'TextEncoderStream',
  'TextDecoderStream',

  // Events and messaging
  'Event',
  'EventTarget',
  'MessageChannel',
  'MessagePort',
  'BroadcastChannel',
  'MessageEvent',
  'ErrorEvent',
  'PromiseRejectionEvent',

  // Workers (for nested workers)
  'Worker',
  'SharedWorker',

  // Promises and async
  'Promise',
  'queueMicrotask',

  // Abort handling
  'AbortController',
  'AbortSignal',

  // Blobs and Files
  'Blob',
  'File',
  'FileReader',
  'FileReaderSync',

  // FormData
  'FormData',

  // WebSockets
  'WebSocket',
  'CloseEvent',

  // Navigation (partial - navigator is handled separately)
  'navigator',

  // Cache API
  'Cache',
  'CacheStorage',

  // Push API
  'PushManager',
  'PushSubscription',
  'PushSubscriptionOptions',

  // Notifications
  'Notification',
  'NotificationEvent',

  // Background Sync
  'SyncManager',
  'SyncEvent',

  // Background Fetch API
  'BackgroundFetchManager',
  'BackgroundFetchRegistration',
  'BackgroundFetchRecord',
  'BackgroundFetchEvent',
  'BackgroundFetchUpdateUIEvent',

  // WebTransport
  'WebTransport',
  'WebTransportBidirectionalStream',
  'WebTransportDatagramDuplexStream',
  'WebTransportError',

  // WebAssembly
  'WebAssembly',

  // importScripts (service worker specific)
  'importScripts',

  // Additional allowed globals
  'globalThis',
  'undefined',
  'Infinity',
  'NaN',
  'isFinite',
  'isNaN',
  'parseFloat',
  'parseInt',
  'decodeURI',
  'decodeURIComponent',
  'encodeURI',
  'encodeURIComponent',
  'Array',
  'Boolean',
  'Date',
  'Error',
  'EvalError',
  'Function',
  'JSON',
  'Map',
  'Math',
  'Number',
  'Object',
  'RangeError',
  'ReferenceError',
  'RegExp',
  'Set',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'URIError',
  'WeakMap',
  'WeakSet',
  'Proxy',
  'Reflect',
  'BigInt',
  'ArrayBuffer',
  'DataView',
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
  'BigInt64Array',
  'BigUint64Array',
  'SharedArrayBuffer',
  'Atomics',
  'eval',
  'Intl',
];

// Explicitly restricted APIs
const explicitlyRestricted = [
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'requestIdleCallback',
  'cancelIdleCallback',
  'alert',
  'confirm',
  'prompt',
  'open',
  'close',
  'focus',
  'blur',
  'frames',
  'parent',
  'top',
  'opener',
  'closed',
  'length',
  'screen',
  'screenX',
  'screenY',
  'screenLeft',
  'screenTop',
  'outerWidth',
  'outerHeight',
  'innerWidth',
  'innerHeight',
  'scrollX',
  'scrollY',
  'pageXOffset',
  'pageYOffset',
  'scroll',
  'scrollTo',
  'scrollBy',
  'getComputedStyle',
  'matchMedia',
  'moveTo',
  'moveBy',
  'resizeTo',
  'resizeBy',
  'getSelection',
  'find',
  'webkitRequestAnimationFrame',
  'webkitCancelAnimationFrame',
  'mozRequestAnimationFrame',
  'mozCancelAnimationFrame',
  'history',
  'location',
  'Navigator', // Constructor should be restricted, but navigator instance is allowed

  // WebXR API (VR/AR) - not available in service workers
  'XR',
  'XRBoundedReferenceSpace',
  'XRFrame',
  'XRInputSource',
  'XRInputSourceArray',
  'XRInputSourceEvent',
  'XRInputSourcesChangeEvent',
  'XRPose',
  'XRReferenceSpace',
  'XRReferenceSpaceEvent',
  'XRRenderState',
  'XRRigidTransform',
  'XRSession',
  'XRSessionEvent',
  'XRSpace',
  'XRSystem',
  'XRView',
  'XRViewerPose',
  'XRViewport',
  'XRWebGLLayer',

  // Web Audio API - not available in service workers
  'AudioContext',
  'AudioNode',
  'AudioParam',
  'AudioBuffer',
  'AudioBufferSourceNode',
  'AudioDestinationNode',
  'AudioListener',
  'AudioWorklet',
  'AudioWorkletNode',
  'AudioWorkletProcessor',
  'AnalyserNode',
  'BiquadFilterNode',
  'ChannelMergerNode',
  'ChannelSplitterNode',
  'ConstantSourceNode',
  'ConvolverNode',
  'DelayNode',
  'DynamicsCompressorNode',
  'GainNode',
  'IIRFilterNode',
  'MediaElementAudioSourceNode',
  'MediaStreamAudioDestinationNode',
  'MediaStreamAudioSourceNode',
  'OfflineAudioContext',
  'OscillatorNode',
  'PannerNode',
  'PeriodicWave',
  'ScriptProcessorNode',
  'StereoPannerNode',
  'WaveShaperNode',
  'BaseAudioContext',
];

const restrictedApiList = [...new Set([
  ...blockList.filter((api) => !allowList.includes(api)),
  ...explicitlyRestricted,
])];

const isWebApiRestricted = (api) => restrictedApiList.includes(api);

module.exports = {
  isWebApiRestricted,
};
