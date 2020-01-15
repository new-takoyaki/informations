const assert = require('assert');

assert.throws(() => {
	throw TypeError;
}, ReferenceError);