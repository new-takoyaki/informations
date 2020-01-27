const { Readable, Writable } = require('stream');
const { createWriteStream } = require('fs');

const inStream = new Readable({
	highWaterMark: 10,
	read(size) {
		console.log("pushed");
	}
});

const outStream = createWriteStream("./test.bin");
inStream.pipe(outStream);
console.log(inStream.push("AAAAABBBBBCCCCCDDDDD"));