const http = require('http');

const server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	res.write('Hello World!');
	res.end();
});

// 결국 http.Server()는 net.Server()를 Prototype으로 두고 있고 결과적으로
// net.Server()와 동일한 기능을함, options를 넘겨줄 때도 net.Server()의 
// options를 사용 가능
const server2 = http.Server({pauseOnConnect: true}, function(req, res) {
	console.log("new request here");
	console.log(req.headers);
	res.writeHead(200, {'Content-Type' : 'text/plain'});
	res.write('Hello World!');
	res.end();
});

server2.listen({host: 'localhost', port: 3000});

// server.listen(3000);

const options = {
	hostname: 'localhost',
	port: 3000,
	path: '/',
	method: 'POST'
};
const req = http.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ', JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	});
});

req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
});
req.write("data\r\n");
req.end();

/*
function Server(options, requestListener) {
  if (!(this instanceof Server)) return new Server(options, requestListener);

  if (typeof options === 'function') {
    requestListener = options;
    options = {};
  } else if (options == null || typeof options === 'object') {
    options = { ...options };
  } else {
    throw new ERR_INVALID_ARG_TYPE('options', 'object', options);
  }

  this[kIncomingMessage] = options.IncomingMessage || IncomingMessage;
  this[kServerResponse] = options.ServerResponse || ServerResponse;

  const maxHeaderSize = options.maxHeaderSize;
  if (maxHeaderSize !== undefined)
    validateInteger(maxHeaderSize, 'maxHeaderSize', 0);
  this.maxHeaderSize = maxHeaderSize;

  net.Server.call(this, { allowHalfOpen: true });

  if (requestListener) {
    this.on('request', requestListener);
  }

  // Similar option to this. Too lazy to write my own docs.
  // http://www.squid-cache.org/Doc/config/half_closed_clients/
  // http://wiki.squid-cache.org/SquidFaq/InnerWorkings#What_is_a_half-closed_filedescriptor.3F
  this.httpAllowHalfOpen = false;

  this.on('connection', connectionListener);

  this.timeout = 0;
  this.keepAliveTimeout = 5000;
  this.maxHeadersCount = null;
  this.headersTimeout = 60 * 1000; // 60 seconds
}
ObjectSetPrototypeOf(Server.prototype, net.Server.prototype);
ObjectSetPrototypeOf(Server, net.Server);
*/