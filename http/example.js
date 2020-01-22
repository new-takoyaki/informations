const http = require('http');
http.get( {
	hostname: 'www.webhacking.kr',
	port: 80,
	path: '/',
	agent: false
}, (res) => {
	console.log(res);
});