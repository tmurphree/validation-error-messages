// eslint-disable-next-line
const main = function main(args = { strict: false }) {
  const detectObject = function detectObject(x) {
    return typeof x === 'object' && x !== null;
  };

  /**
   * @description Make an error message for isObjectLike.
   * @param {object} x The object to test.
   * @param {object} template The object you want x to look like.
   * @param {string} [variableName='input'] The name you want printed in the message.
   * @param {object} [options]
   * @param {boolean} [options.allowExtraProps=false] Return undefined if the object to test has
   *   properties not in template and other tests pass.
   * @param {boolean} [options.checkType=false]  If true check property data types.
   * @returns {string|undefined} string|undefined
  */
  const makeIsObjectLikeMessage = function makeIsObjectLikeMessage(
    x,
    template,
    variableName = 'input',
    options = {}
  ) {
    if (typeof variableName !== 'string') {
      throw new Error('variableName must be a string');
    }

    if (!(detectObject(options))) {
      throw new Error('options must be an object.');
    }

    // #region set options
    const copyOfOptions = { ...options };
    const defaults = {
      allowExtraProps: false,
      checkType: args.strict,
      debug: false,
    };

    for (let index = 0; index < Object.keys(defaults).length; index++) {
      const currentKey = Object.keys(defaults)[index];

      if (copyOfOptions[currentKey] === undefined) {
        copyOfOptions[currentKey] = defaults[currentKey];
      }
    }
    // #endregion set options

    const templateKeys = detectObject(template) ?
      Object.keys(template) :
      undefined;

    const xKeys = detectObject(x) ?
      Object.keys(x) :
      undefined;

    if (templateKeys === undefined) {
      throw new Error('The template object must be an object.');
    }

    if (xKeys === undefined) {
      return `${variableName} is not an object.`;
    }

    for (let index = 0; index < templateKeys.length; index++) {
      if (xKeys.includes(templateKeys[index]) === false) {
        return `${variableName} is missing at least property ${templateKeys[index]}.`;
      }
    }

    if (copyOfOptions.allowExtraProps === false) {
      for (let index = 0; index < xKeys.length; index++) {
        if (templateKeys.includes(xKeys[index]) === false) {
          return `${variableName} has at least one additional property ${xKeys[index]}.`;
        }
      }
    }

    // keys are the same here so it doesn't matter which key array we use
    if (copyOfOptions.checkType === true) {
      for (let index = 0; index < templateKeys.length; index++) {
        const currentKey = templateKeys[index];

        if (typeof x[currentKey] !== typeof template[currentKey]) {
          return `${variableName}.${currentKey} is type ${typeof x[currentKey]} and expected type ${typeof template[currentKey]}.`;
        }
      }
    }

    return undefined;
  };

  /**
   * @description Make an error message for isObjectWithExpectedProps.
   * @param {object} x The object to test.
   * @param {string[]} expectedProperties The required properties.
   * @param {string} [variableName='input'] The name you want printed in the message.
   * @returns {string|undefined} string|undefined
  */
  // eslint-disable-next-line max-len
  const makeIsObjectWithExpectedPropsMessage = (x, expectedProperties, variableName = 'input') => {
    if (typeof variableName !== 'string') {
      throw new Error('variableName must be a string');
    }

    if (
      !(Array.isArray(expectedProperties)) ||
      expectedProperties.length === 0 ||
      expectedProperties.some((el) => (typeof el !== 'string'))
    ) {
      throw new Error('expectedProperties must be an array of strings with at least one entry.');
    }

    const keys = detectObject(x) ?
      Object.keys(x) :
      undefined;

    if (keys === undefined) {
      return `${variableName} is not an object.`;
    }

    for (let index = 0; index < expectedProperties.length; index++) {
      if (keys.includes(expectedProperties[index]) === false) {
        return `${variableName} is missing at least property ${expectedProperties[index]}.`;
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
