'use strict';

const chromeExtension = require('..');
const assert = require('assert').strict;

assert.strictEqual(chromeExtension(), 'Hello from chromeExtension');
console.info('chromeExtension tests passed');
