const assert = require('assert');

const { message } = new assert.AssertionError({
	actual: 1,
	expected: 2,
	operator: 'strictEqual'
});

// Strict mode
const strict_assert = require('assert').strict;
// strict_assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);

try {
	console.log(message);
	// assert.deepEqual('+00000001', false);
} catch (err) {
	console.log(err);
}