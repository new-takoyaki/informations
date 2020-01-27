const { Readable, Writable } = require('stream');
const inStream = new Readable({
	read(size) { }
});

const outStream = new Writable({
	write(chunk, encoding, callback) {
		console.log(chunk);
		console.log("hello2");
		callback();			// callback이 없으면 스트리밍이 제대로
							// 이루어지지 않음
	}
})

inStream.currentCharCode = 65;

// inStream.pipe(outStream);
inStream.pipe(outStream);
inStream.push("hi");
inStream.push("hi2");