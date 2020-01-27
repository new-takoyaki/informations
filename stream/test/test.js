const { createReadStream, createWriteStream, existsSync, readFile} = require('fs');

function test_1() {
	if (!existsSync("./text")) {
		const ws = createWriteStream("./text");
		for(let i = 0; i < 1000 * 1000; i++) {
			ws.write("HelloWorld");
		}
		ws.end();
	}
	const rs = createReadStream("./text");
	rs.pipe(process.stdout);
}

function test_2() {
	readFile("./text", (err, da) => {
		if (err) throw err;
		console.log(da);
	});
}

// test_1();
test_2();