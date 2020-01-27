const { Writable } = require('stream');

const outStream = new Writable({
	write(chunk, encoding, callback) {
		console.log(chunk.toString());
		console.log(callback);
		console.log(encoding);
		callback();
	}
});

process.stdin.pipe(outStream);