// eslint-disable-next-line
const main = function main(args = { strict: false }) {
  // const makeIsObjectLikeMessage = function makeIsObjectLikeMessage(
  //   x,
  //   template,
  //   options = { checkType: args.strict }
  // ) {

  // };

  /**
   * @description Make an error message for isObjectWithExpectedProps.
   * @param {object} x The object to test.
   * @param {string[]} expectedProperties The required properties.
   * @returns {string|undefined} string|undefined
  */
  const miowepm = function miowepm(x, expectedProperties) {
    const keys = typeof x === 'object' ?
      Object.keys(x) :
      undefined;

    if (
      !(Array.isArray(expectedProperties)) ||
      expectedProperties.length === 0 ||
      expectedProperties.some((el) => (typeof el !== 'string'))
    ) {
      throw new Error('Expected properties array to be an array of strings.');
    }

    if (!(typeof x === 'object')) {
      return 'Expected input to be an object.';
    }

    for (let index = 0; index < expectedProperties.length; index++) {
      if (keys.includes(expectedProperties[index]) === false) {
        return `Expected input to have these properties: (${expectedProperties.join(', ')}).  Missing at least property ${expectedProperties[index]}.`;
      }
    }

    return undefined;
  };

  return {
    makeExpectedPropsMessage: miowepm,
    // makeIsObjectLikeMessage,
    makeIsObjectWithExpectedPropsMessage: miowepm,
  };
};

module.exports = {
  ...main(),
  strict: { ...main({ strict: true }) },
};
