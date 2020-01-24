/*
	Class: net.Socket
	net.Socket은 EventEmitter의 종류이며, stream.Duplex의 확장 클래스다.
	TCP 소켓 통신이나 IPC 통신을 위해 사용되며, net.createConnection()에 의해
	리턴된다.
*/

const net = require('net');

// new net.Socket()은 기존에 존재하는 file descriptor로 이미 열린 socket을
// wrapping하는 것도 가능하며, 이렇게 생성된 객체는 net.Socket 타입을 가진다.
const socket = new net.Socket({}).on('close', (err) => {
	if (err) throw err;
	console.log("Close the socket");
});

socket.on('ready', () => {
	console.log("socket already ready");
});

// socket.destory()가 호출될 경우 socket은 닫히며, 연결이 닫히는 순간 close이벤트가 emit된다
socket.connect({host:'www.google.com', port: 80}, () => {});
console.log(socket.connecting);
socket.on('data', (chunk) => {
	console.log("send and receive");
	console.log(chunk);
});

socket.on('timeout', () => {
	console.log("Time expired");
	socket.destroy();
});
// connect()에 의해 소켓이 연결되어 있는 동안은 socket.connecting은 true로 활성화됨
// socket.end("hello\r\n");

socket.setTimeout(3000);
// console.log(socket.destroyed);
// socket.destroyed는 socket.destroy()가 호출되면 발생함

/*
	data 이벤트는 우리가 write나 end를 통해 연결된 소켓에 무언가 데이터를 써줄 경우에만
	response가 반환되며 그 결과를 argument로 받아줄 수 있다.
	보통 Buffer 타입이나 String 타입이 반환된다.
	
	timeout 이벤트는 socket.setTimeout()에 의해 지정된 밀리세컨드 단위의 시간이
	지날 경우 발생하는 이벤트이며, 이를 통해 소켓을 강제종료하는 것도 가능하다.
	특정 소켓 연결에 대한 시간을 지정해주고 싶을 때 사용하면 된다.
*/

// 일반적인 net.createConnection 예시
const client = net.createConnection({host: 'www.google.com', port: 80}, () => {
	console.log("connected to server!");
	client.write("world\r\n");
});
client.on('data', (data) => {
	console.log(data.toString());
	client.end();
});

client.on('end', () => {
	console.log("disconnected from server");
});

// 그 이외의 method
console.log(net.isIPv4('127.0.0.1')); // IPv4가 맞을 경우 true리턴, isIPv6()도 존재
console.log(net.isIP('127.0.0.1')); // IP 포맷이 맞을 경우 버전을 리턴, 이 경우는 4가 리턴