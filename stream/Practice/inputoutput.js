const { Duplex } = require('stream');

const duplex = new Duplex({
	write(chunk, encoding, callback) {
		this.push(chunk);
		callback();
	},
	read(size) {
		console.log("size : ", size.toString());
	}
});

process.stdin.pipe(duplex).pipe(process.stdout);