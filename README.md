# validation-error-messages  
Companion library to [@tmurphree/validation-predicates](https://www.npmjs.com/package/@tmurphree/validation-predicates).  

# Why  
Makes it easier for you to make complicated validation messages.  

# Change log  
TODO: put link here  

# Installation  
npm install --save @tmurphree/validation-error-messages  

# Usage  
``` js
const { isObjectLike } = require('@tmurphree/validation-predicates');

const { makeIsObjectLikeMessage } = require('@tmurphree/validation-error-messages');

const template = { password: '***', userName: 'something' };

// the long way
if (!(isObjectLike(input, template))) {
  throw new Error('Yikes!  Input is not valid but I have no idea why!  Now I have to run complicated code to find it.');
}

// uses this library and makes good error messages quickly
// throws Error('Input is missing at least one property: password.')
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
|Function|Possible output|Comment|  
|---|---|---|
|makeExpectedPropsMessage(input, arrayOfStrings)|See makeIsObjectWithExpectedPropsMessage|Alias of makeIsObjectWithExpectedPropsMessage|  
|makeIsObjectWithExpectedPropsMessage(input, arrayOfStrings)<br><br>e.g makeIsObjectWithExpectedPropsMessage(input, ['foo', 'bar', 'baz'])|Expected input to be an object.<br><br>Expected input to have these properties: (foo, bar, baz).  It is missing at least one property: foo.<br><br>`undefined`|Returns undefined if for some reason all of the expected properties are there.|  