const { Buffer } = require('buffer');
const { Transform } = require('stream');

const transformStream = new Transform({
	transform(chunk, encoding, callback) {
		this.push(Buffer.from(chunk).toString('base64') + "\n");
		callback();
	}
});

process.stdin.pipe(transformStream).pipe(process.stdout);