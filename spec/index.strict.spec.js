/* eslint no-undef:"off" */

const { makeIsObjectLikeMessage } = require('../index.js').strict;

// #region jasmine setup
const origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

const revertJasmineTimeout = function revertJasmineTimeout() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout;
};

const setJasmineTimeout = function setJasmineTimeout(milliseconds) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = milliseconds;
};

// you can set more options than are shown here: see https://jasmine.github.io/api/edge/Reporter.html
// tutorial: https://jasmine.github.io/tutorials/custom_reporter
const myReporter = {
  jasmineStarted: function jasmineStarted(suiteInfo, done) {
    // optional setup goes here
    setJasmineTimeout(10000);
    done();
  },
  jasmineDone: function jasmineDone(suiteInfo, done) {
    console.log(`Tests ended ${new Date().toLocaleString()}`);
    revertJasmineTimeout();
    done();
  },
};

jasmine.getEnv().addReporter(myReporter);
// #endregion jasmine setup


describe('makeIsObjectLikeMessage', () => {
  const template = { a: 1, b: 2, c: 3 };

  // #region re-test behavior from loose mode
  it('throws on bad input', () => {
    expect(() => (makeIsObjectLikeMessage())).toThrow();
    expect(() => (makeIsObjectLikeMessage(99))).toThrow();
    expect(() => (makeIsObjectLikeMessage({ foo: 12 }, 12))).toThrow();
  });

  it('returns an error messages for non-objects', () => {
    expect(makeIsObjectLikeMessage('notanobject', template))
      .toBe('Expected input to be an object.');

    expect(makeIsObjectLikeMessage(null, template))
      .toBe('Expected input to be an object.');

    expect(makeIsObjectLikeMessage(undefined, template))
      .toBe('Expected input to be an object.');
  });

  it('returns undefined if no differences', () => {
    expect(makeIsObjectLikeMessage({ a: 1, b: 2, c: 3 }, template)).toBeUndefined();
  });

  it('returns an error message for objects', () => {
    // x is missing property b
    expect(makeIsObjectLikeMessage({ a: 1, c: 3 }, template))
      .toBe('input is missing at least property b.');

    // x is missing property b and has additional property z
    // we look for missing properties first
    expect(makeIsObjectLikeMessage({ a: 1, c: 3, z: 4 }, template))
      .toBe('input is missing at least property b.');

    // x has all of template plus property d
    expect(makeIsObjectLikeMessage({
      a: 1, b: 2, c: 3, d: 4,
    }, template))
      .toBe('input has at least one additional property d.');
  });

  it('returns on the first missing property when more than one property is missing', () => {
    // x is missing properties b and c
    expect(makeIsObjectLikeMessage({ a: 1 }, template))
      .toBe('input is missing at least property b.');
  });
  // #endregion re-test behavior from loose mode

  it('checks types in strict mode', () => {
    const bIsString = { a: 1, b: 's', c: 3 };
    expect(makeIsObjectLikeMessage(bIsString, template))
      .toBe('input.b is type string and expected type number.');
  });

  it('lets you chage the variable name in the output', () => {
    const bIsString = { a: 1, b: 's', c: 3 };

    expect(makeIsObjectLikeMessage('notanobject', template, 'charles'))
      .toBe('Expected charles to be an object.');

    // x is missing property b
    expect(makeIsObjectLikeMessage({ a: 1, c: 3 }, template, 'charles'))
      .toBe('charles is missing at least property b.');

    // x has all of template plus property d
    expect(makeIsObjectLikeMessage({
      a: 1, b: 2, c: 3, d: 4,
    }, template, 'charles'))
      .toBe('charles has at least one additional property d.');

    expect(makeIsObjectLikeMessage(bIsString, template, 'charles'))
      .toBe('charles.b is type string and expected type number.');
  });
});
