# validation-error-messages  
Companion library to [@tmurphree/validation-predicates](https://www.npmjs.com/package/@tmurphree/validation-predicates).  

# Why  
Makes it easier for you to make complicated validation messages.  

# Change log  
[Link](https://github.com/tmurphree/validation-error-messages/blob/master/CHANGELOG.md)  

# Installation  
npm install --save @tmurphree/validation-error-messages  

# Usage  
``` js
const { isObjectLike } = require('@tmurphree/validation-predicates');

const { makeIsObjectLikeMessage } = require('@tmurphree/validation-error-messages');

const template = { password: '***', userName: 'something' };

// the long way
if (!(isObjectLike(input, template))) {
  throw new Error('Yikes!  input is not valid but I have no idea why!  Now I have to run complicated code to find it.');
}

// uses this library and makes good error messages quickly
// throws Error('input is missing at least one property: password.')
if (!(isObjectLike(input, template))) {
  throw new Error(makeIsObjectLikeMessage(input, template));
}
```

## Strict mode  
**Important**  
The options settings in @tmurphree/validation-predicates and @tmurphree/validation-error-messages MUST be the same for things to act as expected.  This includes but is not limited to strict mode (because strict mode is just a quick way to set options).  

Strict mode options in this library mirror the strict mode options in @tmurphree/validation-predicates.  

Without strict mode:  
``` js
const { makeIsObjectLikeMessage } = require('@tmurphree/validation-error-messages');
```

With strict mode:  
``` js
const { makeIsObjectLikeMessage } = require('@tmurphree/validation-error-messages').strict;
```

# Functions  
## makeExpectedPropsMessage
``` js
/**
 * @description Make an error message for isObjectWithExpectedProps.
 * @param {object} x The object to test.
 * @param {string[]} expectedProperties The required properties.
 * @param {string} [variableName='input'] The name you want printed in the message.
 * @returns {string|undefined} string|undefined
*/
makeExpectedPropsMessage(input, expectedProperties, [variableName]);
```  
Sample output:  
* input is not an object.  
* input is missing at least property foo.  
* `undefined` (returns undefined if for some reason all of the expected properties are there) 

## makeIsObjectLikeMessage
``` js
/**
 * @description Make an error message for isObjectLike.
 * @param {object} x The object to test.
 * @param {object} template The object you want x to look like.
 * @param {string} [variableName='input'] The name you want printed in the message.
 * @param {object} [options]
 * @param {boolean} [options.checkType=false]  Defaults to true in strict mode.  If true check property data types.  
 * @returns {string|undefined} string|undefined
*/
makeIsObjectLikeMessage(x, template, [variableName], [options]);
```  
Sample output:  
* input is not an object.  
* input is missing at least property foo.  
* input has at least one additional property someSuperCoolProperty.  
* input.fizz is type string and expected type boolean.  
* `undefined` (returns undefined if for some reason all of the expected properties are there and, if checkType is true, they're of the expected type) 
