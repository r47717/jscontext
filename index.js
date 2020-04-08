// Don't you like JavaScript?

const assert = require('assert').strict;

const call = Function.prototype.call; // expects context as a functional object and invokes it in context of 1st arg

const slice1 = Array.prototype.slice; // just a reference to a standard array function
const slice2 = call.bind(Array.prototype.slice); // slice is called in context of object passed to call's 1st arg
const slice3 = (...args) => Array.prototype.slice.call(...args); // no, that's too simple

assert.deepEqual(slice1.call([1, 2, 3, 4], 1), [2, 3, 4]);
assert.deepEqual(slice2([1, 2, 3, 4], 1), [2, 3, 4]);
assert.deepEqual(slice3([1, 2, 3, 4], 1), [2, 3, 4]);

const f1 = () => 111;

assert.equal(call.call(f1), 111); // call is invoked in context of f1 functional object
assert.equal(call.call.call(f1), 111); // same as all 'call's refer to the same Function.prototype.call
assert.equal(call.call.call.call.call.call.call.call.call.call(f1), 111); // same as all 'call's refer to the same Function.prototype.call
assert.equal(call.apply.call.apply.call.apply.call.apply.call.apply(f1), 111); // same as all 'call's and 'apply's refer to the same Function.prototype

const wow = call.bind(call);  // what the heck is this?

assert.equal(typeof wow, 'function');
assert.deepEqual(Object.getOwnPropertyNames(wow), ['length', 'name']);

// however, invocation wow() generates 'TypeError: wow is not a function' - looks strange
// if you pass an object to it: wow({}) - same thing
// just because the parameter is passed as a context of internal (bound) call which accepts only function objects, so...

const f2 = () => 222;
assert.equal(wow(f2), 222);
