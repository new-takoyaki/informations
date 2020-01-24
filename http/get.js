const http = require('http');

http.get('http://www.google.com', function(res) {
	console.log('GOT response: ' + res.statusCode);
	// console.log(res);
	console.log(res.socket);
}).on('error', function(e) {
	console.log('Got error: ' + e.message);
});