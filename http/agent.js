
// const http = require('http');
/*http.get({
	hostname: 'www.webhacking.kr',
	port: 80,
	path: '/',
	agent: new http.Agent({keepAlive: true})
}).on('socket', (socket) => {
});*/

/*
	keep-alive의 경우에는 미해결된 http 요청이 없을 경우에도
	연결을 계속 유지하기 때문에 이후에 열려있는 소켓을 사용해서
	원하는 처리를 수행할 수 있다. 이를 통해 소켓을 새로 생성하는
	오버헤드를 줄일 수 있지만 리소스가 장기 유지되면서 단편화되거나
	메모리의 영역을 차지하는 문제는 있을듯하다.
	이는 http.Agent() class를 활용해서도 선언할 수 있다.
*/

var http = require('http');
const keepAliveAgent = new http.Agent();
const options = {
    host: 'www.google.com',
    path: '/',
	agent: keepAliveAgent
  };
/*
http.request(options, function(response){
  // console.log(response);
}).end(); // 반드시 end()를 붙여줘야함, 안붙이면 리퀘스트가 전달되지 않음
*/
var socket = keepAliveAgent.createConnection(80, 'www.google.com');
// socket.setKeepAlive(true, 3000);
console.log("Hello");
// socket.setKeepAlive(false, 5);
console.log(keepAliveAgent.keepSocketAlive(socket));
keepAliveAgent.removeSocket(socket, options);
console.log(keepAliveAgent.freeSockets);
// socket.destroy();
// keepAliveAgent.keepSocketAlive(socket); // 이걸 넣게 되면 createConnection이 지속 유지 되지 않음, 이유가 뭐지?
// socket.end();

// console.log(socket);

/*
const net = require('net');
const client = net.createConnection({ host:'www.google.com', port: 80 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
*/

// createConnection은 net의 createConnection과 동일함
var socket = keepAliveAgent.createConnection({host:'www.google.com', port:80}, () => {
	keepAliveAgent.keepSocketAlive(socket);
	keepAliveAgent.reuseSocket(socket);
	console.log(keepAliveAgent.getName({host: 'www.google.com', port:80}));
	console.log(keepAliveAgent.maxSockets);
	console.log(keepAliveAgent.requests);
	console.log(keepAliveAgent.sockets);
	console.log("Connected to server!");
	socket.write("Hello\r\n");
});

socket.on('data', (data) => {
	console.log(data.toString());
	socket.end();
});
socket.on('end', () => {
	console.log("Disconnected from server");
});