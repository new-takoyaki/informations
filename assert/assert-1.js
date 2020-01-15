const assert = require('assert');

assert(1 === 1, "Hello");
// assert(1 === 2, "Hello"); // Throws error which has name "Hello"
assert.ok(1 === 1, "Hello"); // Hello is an alias of assert()

function getObject() {
	return {a : 1};
}

assert.deepEqual(getObject(), getObject()); // deepEqual used deep and strong comparison
// assert.equal(getObject(), getObject()); // equal() used weak comparison
assert.deepStrictEqual(getObject(), getObject());
assert.equal(false, '');
assert.equal(false, [0]); // These comparisons will not throw an exception
// assert.notEqual(false, ''); // This comparison case used != operator
// assert.strictEqual(false, ''); // These method used Identify operator (such as === or !==)

// assert.deepStrictEqual({a : [0, 1, 2]}, {a : [0, 1, '2']}); // this case will be throw an exception
assert.deepEqual({a : [0, 1, 2]}, {a : [0, 1, '2']}); // but it's not
