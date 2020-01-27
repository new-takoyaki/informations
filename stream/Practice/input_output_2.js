const { Readable, Writable } = require('stream');

const readable = new Readable({
	highWaterMark: 10,
	read(size) {
		console.log(size);
	}
});

const writable = new Writable({
	highWaterMark: 10,
	write(chunk, encoding, callback) {
		callback();
	}
});

readable.on('data', (chunk) => {
	console.log(chunk);
});
readable.push("helloworldasdfsfdsa");
console.log(readable.read());