/* eslint no-undef:"off" */

// const { isPopulatedString } = require('@tmurphree/validation-predicates');

const {
  makeExpectedPropsMessage,
  // makeIsObjectLikeMessage,
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

describe('makeIsObjectWithExpectedPropsMessage', () => {
  it('has an alias', () => {
    expect(makeExpectedPropsMessage === makeIsObjectWithExpectedPropsMessage)
      .toBeTrue();
  });

  it('throws on bad input', () => {
    expect(() => (makeExpectedPropsMessage(99))).toThrow();
    expect(() => (makeExpectedPropsMessage({ foo: 12 }, []))).toThrow();
    expect(() => (makeExpectedPropsMessage({ foo: 12 }, ['asdf', 12])))
      .toThrow();
  });

  it('returns an error messages for non-objects', () => {
    expect(makeExpectedPropsMessage('notanobject', ['a', 'b', 'c']))
      .toBe('Expected input to be an object.');
  });

  it('returns an error message for objects', () => {
    const x = { a: 1, b: 2, c: 3 };
    expect(makeExpectedPropsMessage(x, ['a', 'b', 'c'])).toBeUndefined();

    expect(makeExpectedPropsMessage(x, ['a', 'z']))
      .toBe('Expected input to have these properties: (a, z).  Missing at least property z.');
  });

  it('returns on the first missing property when more than one property is missing', () => {
    const expectedProps = ['foo', 'bar', 'baz'];
    const x = { a: 1, b: 2, c: 3 };

    expect(makeExpectedPropsMessage(x, expectedProps))
      .toBe('Expected input to have these properties: (foo, bar, baz).  Missing at least property foo.');
  });
});
