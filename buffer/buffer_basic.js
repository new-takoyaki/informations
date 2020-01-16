const Buffer = require('buffer').Buffer;

const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(10, 1); // size : 10, filled with 1

const buf3 = Buffer.allocUnsafe(10); // allocUnsafe()는 메모리를 초기화 하지 않음
// 이 때문에 이전에 사용되던 메모리 값이 남는다.

const buf4 = Buffer.from([1, 2, 3]);

console.log(buf3);
console.log(buf1);
console.log(buf2);

// --zero-fill-buffers 옵션을 사용하게 되면
// allocUnsafe()를 사용해도 alloc()과 같은 결과를 수행

