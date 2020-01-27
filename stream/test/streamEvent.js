const { createReadStream, createWriteStream, existsSync } = require('fs');

if (!existsSync("./bin")) {
	const ws = createWriteStream("./bin");
	ws.write("HelloWorld");
	ws.end();
}

const rs = createReadStream("./bin");
rs.on('data', (chunk) => {
	console.log(chunk);
});

rs.on('end', () => {
	console.log("end event emitted");
});

/*
	end 이벤트는 ReadStream에서 더이상 읽을 데이터가 없을 경우 발생
	data 이벤트는 스트림이 데이터 chunk를 전송할 때 발생
*/