const Buffer = require('buffer').Buffer;

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

const buf = new Buffer(arr.buffer);

console.log(buf);
arr[1] = 6000;

console.log(buf);