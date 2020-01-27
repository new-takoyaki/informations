const cluster = require('cluster');
const dgram = require('dgram');

if (cluster.isMaster) {
	cluster.fork();
} else {
	const s = dgram.createSocket('udp4');
	s.on('close', () => {
		console.log("Close");
	});
	s.on('connect', () => {
		console.log("Some client connected");
	});
	s.bind(1234, () => {
	});
}


/*
	bind()에는 옵션을 제공할 수 있음
	옵션에는 exclusive 옵션이 있는데, boolean 타입이다.
	이 부분이 좀 중요한데, 이 옵션이 false로 지정되있다면
	포트 쉐어링을 통해 새롭게 접속하는 다중 사용자에 대해 포트를 공유해주지만
	true로 지정될 경우에는 배타적 옵션이 적용되어 포트 쉐어링을 허용하지 않는다.
	이 얘기는 즉 한 번에 한 개의 클라이언트만 접근이 가능해진다는 뜻이다.
*/