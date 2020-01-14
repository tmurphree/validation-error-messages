/* eslint no-undef:"off" */

// const { isPopulatedString } = require('@tmurphree/validation-predicates');

const {
  makeExpectedPropsMessage,
  makeIsObjectLikeMessage,
  makeIsObjectWithExpectedPropsMessage,
} = require('../index.js');

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
      .toBe('Expected input to have these properties: (a, b, c).  It is missing at least property b.');

    // x is missing property b and has additional property z
    // we look for missing properties first
    expect(makeIsObjectLikeMessage({ a: 1, c: 3, z: 4 }, template))
      .toBe('Expected input to have these properties: (a, b, c).  It is missing at least property b.');

    // x has all of template plus property d
    expect(makeIsObjectLikeMessage({
      a: 1, b: 2, c: 3, d: 4,
    }, template))
      .toBe('Expected input to have these properties: (a, b, c).  It has at least one additional property d.');
  });

  it('returns on the first missing property when more than one property is missing', () => {
    // x is missing properties b and c
    expect(makeIsObjectLikeMessage({ a: 1 }, template))
      .toBe('Expected input to have these properties: (a, b, c).  It is missing at least property b.');
  });
});

describe('makeIsObjectWithExpectedPropsMessage', () => {
  it('has an alias', () => {
    expect(makeExpectedPropsMessage === makeIsObjectWithExpectedPropsMessage)
      .toBeTrue();
  });

  it('throws on bad input', () => {
    expect(() => (makeExpectedPropsMessage())).toThrow();
    expect(() => (makeExpectedPropsMessage(99))).toThrow();
    expect(() => (makeExpectedPropsMessage({ foo: 12 }, []))).toThrow();
    expect(() => (makeExpectedPropsMessage({ foo: 12 }, ['asdf', 12])))
      .toThrow();
  });

  it('returns an error messages for non-objects', () => {
    expect(makeExpectedPropsMessage('notanobject', ['a', 'b', 'c']))
      .toBe('Expected input to be an object.');

    expect(makeExpectedPropsMessage(null, ['a', 'b', 'c']))
      .toBe('Expected input to be an object.');

    expect(makeExpectedPropsMessage(undefined, ['a', 'b', 'c']))
      .toBe('Expected input to be an object.');
  });

  it('returns undefined if no differences', () => {
    const x = { a: 1, b: 2, c: 3 };

    expect(makeExpectedPropsMessage(x, ['a', 'b', 'c'])).toBeUndefined();
  });

  it('returns an error message if differences', () => {
    const x = { a: 1, b: 2, c: 3 };

    expect(makeExpectedPropsMessage(x, ['a', 'z']))
      .toBe('Expected input to have these properties: (a, z).  It is missing at least property z.');
  });

  it('returns on the first missing property when more than one property is missing', () => {
    const expectedProps = ['foo', 'bar', 'baz'];
    const x = { a: 1, b: 2, c: 3 };

    expect(makeExpectedPropsMessage(x, expectedProps))
      .toBe('Expected input to have these properties: (foo, bar, baz).  It is missing at least property foo.');
  });
});
