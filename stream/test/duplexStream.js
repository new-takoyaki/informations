const { Duplex } = require('stream');

const inoutStream = new Duplex({
	highWaterMark: 1000, 
	write(chunk, encoding, callback) { // 스트림에 데이터가 들어올때마다 발생
		console.log("Write : " + chunk.toString());
		callback();
	}, 
	read(size) { // inoutStream.push()가 불릴 경우 발생
		console.log(size);
		console.log("read data");
	}
});

inoutStream.on('data', (chunk) => {
	console.log("read data : " + chunk);
});

process.stdin.pipe(inoutStream);
inoutStream.push("Hi");
inoutStream.push("hi2");
inoutStream.push("hihih");
inoutStream.push("hello");