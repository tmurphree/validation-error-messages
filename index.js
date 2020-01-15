// eslint-disable-next-line
const main = function main(args = { strict: false }) {
  /**
   * @description Make an error message for isObjectLike.
   * @param {object} x The object to test.
   * @param {object} template The object you want x to look like.
   * @returns {string|undefined} string|undefined
  */
  const makeIsObjectLikeMessage = function makeIsObjectLikeMessage(
    x,
    template,
    options = { checkType: args.strict }
  ) {
    const templateKeys = typeof template === 'object' && template !== null ?
      Object.keys(template) :
      undefined;

    const xKeys = typeof x === 'object' && x !== null ?
      Object.keys(x) :
      undefined;

    if (templateKeys === undefined) {
      throw new Error('The template object must be an object.');
    }

    if (xKeys === undefined) {
      return 'Expected input to be an object.';
    }

    for (let index = 0; index < templateKeys.length; index++) {
      if (xKeys.includes(templateKeys[index]) === false) {
        return `Input is missing at least property ${templateKeys[index]}.`;
      }
    }

    for (let index = 0; index < xKeys.length; index++) {
      if (templateKeys.includes(xKeys[index]) === false) {
        return `Input has at least one additional property ${xKeys[index]}.`;
      }
    }

    // keys are the same here so it doesn't matter which key array we use
    if (options.checkType === true) {
      for (let index = 0; index < templateKeys.length; index++) {
        const currentKey = templateKeys[index];

        if (typeof x[currentKey] !== typeof template[currentKey]) {
          return `Input.${currentKey} is type ${typeof x[currentKey]} and expected type ${typeof template[currentKey]}.`;
        }
      }
    }

    return undefined;
  };

  /**
   * @description Make an error message for isObjectWithExpectedProps.
   * @param {object} x The object to test.
   * @param {string[]} expectedProperties The required properties.
   * @returns {string|undefined} string|undefined
  */
  // eslint-disable-next-line max-len
  const makeIsObjectWithExpectedPropsMessage = function makeIsObjectWithExpectedPropsMessage(x, expectedProperties) {
    const keys = typeof x === 'object' && x !== null ?
      Object.keys(x) :
      undefined;

    if (
      !(Array.isArray(expectedProperties)) ||
      expectedProperties.length === 0 ||
      expectedProperties.some((el) => (typeof el !== 'string'))
    ) {
      throw new Error('expectedProperties must be an array of strings with at least one entry.');
    }

    if (keys === undefined) {
      return 'Expected input to be an object.';
    }

    for (let index = 0; index < expectedProperties.length; index++) {
      if (keys.includes(expectedProperties[index]) === false) {
        return `Input is missing at least property ${expectedProperties[index]}.`;
      }
    }

    return undefined;
  };

  return {
    makeExpectedPropsMessage: makeIsObjectWithExpectedPropsMessage,
    makeIsObjectLikeMessage,
    makeIsObjectWithExpectedPropsMessage,
  };
};

module.exports = {
  ...main(),
  strict: { ...main({ strict: true }) },
};
