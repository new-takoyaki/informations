const http = require('http');
const agent = new http.Agent();

var socket = agent.createConnection({host: 'www.google.com', port: 80}, () => {
	console.log('Connected to server!');
	console.log(agent.requests);
	socket.write('world\r\n');
});

const options = {
	agent: agent
};

const req = http.request(options, (res) => {
	res.on('data', (chunk) => {
		console.log(chunk);
	});
});

var socket_2 = agent.createSocket(req, options, () => {
	console.log("Connected");
});
console.log(agent.sockets);
req.write("hello\r\n");