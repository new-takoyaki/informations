const net = require('net');
const server = net.createServer((socket) => {
	socket.end("goodbye\n");
}).on('error', (err) => {
	throw err;
});

/*
	listening 이벤트는 listen() 메서드의 호출로 해당 포트와 호스트를 listen할 때
	발생함
*/

server.on('listening', () => {
	console.log("Listening start");
});



server.listen({ port: 12346, family: 'IPv4', address: '127.0.0.1' }, () => {
	console.log('opened server on', server.address());
});

server.on('close', () => { // close 이벤트는 server.close()가 호출되면 실행
	console.log("close");
});

/*
	connection 이벤트는 클라이언트가 서버에 연결했을 때
	발생하며, 서버측 이벤트임. 클라이언트 측 이벤트가 아니라
*/
server.on('connection', (socket) => {
	console.log("connection");
});

net.connect({port: 12346});
/*
	server.getConnections()는 연결되어있는 클라이언트에 대한 소켓을 반환함
	이 때문에 반환 타입이 net.Server임 (???) <= 뭐지? 왜 net.Server지?
	설명을 보면 err, count라는 파라미터를 콜백에 넣어줄 수 있고, 연결된 커넥션에 대한
	개수를 세는 용도인듯함
*/
/*
server.getConnections((err) => {
	if (err) throw err;
});
*/
console.log(server.listening);