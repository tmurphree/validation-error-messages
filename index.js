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
   * @returns {string}
  */
  const miowepm = function miowepm(x, expectedProperties) {
    if (!(typeof x === 'object')) {
      throw new Error('Expected the test data to be an object.');
    }

    if (
      !(Array.isArray(expectedProperties)) ||
      expectedProperties.length === 0 ||
      expectedProperties.some((el) => (typeof el !== 'string'))
    ) {
      throw new Error('Expected properties array to be an array of strings.');
    }
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
