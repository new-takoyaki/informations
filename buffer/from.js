const Buffer = require('buffer').Buffer;

const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

const buf1 = Buffer.from(arr);
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
console.log(buf2);

arr[1] = 6000;
console.log(buf1); // buf1은 Little-Endian에서 1바이트만 가짐
// 그 이유는 TypedArray와 Uint8Array는 세밀하게
// 호환되지 않기 때문이라고 볼 수 있다
// 이 때문에 Uint16Array와 같은 타입에
// Buffer을 복사하기 위해서는 buffer 메모리를 share
// 하게 만드는 방법을 사용하는게 좋다.
// 또한 buffer sharing을 통해 쓸데없는 인스턴스 생성을
// 줄임으로 메모리를 절약할 수 있다.

console.log(buf2);

console.log(arr.buffer);
console.log(arr);

// ------------------------------------

const val1 = new Uint32Array(Buffer.from([1, 2, 3, 4]));
console.log(val1);
// 이는 4바이트의 single-element를 가지는 것이 아닌
// 4개의 1, 2, 3, 4라는 element를 가지는 
// Uint32Array가 된다.
// 만일 동일한 메모리를 공유하게 하고 싶다면
// arr.buffer를 sharing해주는 것이 필요하다.


var buf_1 = Buffer.from([1, 2, 3]);
for (const b of buf_1) {
	console.log(b);
}

// Buffer instance can be iterates with of instruction.