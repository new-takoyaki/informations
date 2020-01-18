const cluster = require('cluster');
cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
	const worker = cluster.fork();
	worker.on('message', (message) => {
		console.log("Message by child: " + message);
	});
	worker.send("Hello");
	
	cluster.on('disconnect', (worker) => {
		console.log("Killed: " + worker.process.pid);
	});
	cluster.on('exit', (worker, code, signal) => {
		console.log("Exited: " + worker.process.pid + " " + (code || signal));
	});
	worker.kill();
} else {
	process.on('message', (message) => {
		console.log("Message by Parent: " + message);
	});
	process.send("World");
}

/*
	사실 위의 내용이 cluster 모듈에 대한 전반적인 내용이라고 할 수 있다.
	cluster는 POSIX의 fork() 시스템 콜과 마찬가지로
	isMaster라는 값을 통해 현재 인스턴스가 fork를 수행한 부모인지
	fork로 만들어진 자식 인스턴스인지 확인할 수 있다.
	
	그런데 child_process.fork()가 있는데 왜 굳이 cluster라는 녀석을
	사용하는 것인지 의문이 들 수도 있다.
	그 이유는 cluster만의 장점 때문인데, Load-Balancing과 Port Sharing을
	지원해주고 있기 때문이다.
	만일 특정한 웹에 대해 포트를 listen하고 있을 때 여러번의 fork를
	수행할 경우 cluster에서는 Port-Sharing 기능 때문에 여러개의 인스턴스가
	한 개의 포트를 공유하게 된다.
	이 때문에 보통 웹서비스를 대상으로 하는 분산처리 환경을 개발할 때는
	cluster를 사용한다.
	
	그리고 한 가지 더 뭐 깊게 고민할 내용은 아니고 이야기해볼만한 이슈는
	원래 Node.js 초기 버전에서 cluster에는 Load-Balancing 이슈가
	해결되지 않았기 때문에 하나의 worker에 퀀텀이 집중되어버리는 문제가
	있었다. 이는 차후에 시간이 지나면서 Round-Robin 알고리즘의
	스케줄링이 도입되면서 해결되었다.
	
	또한 Parent Instance와 Child Instance 사이에는
	Inter-Process Communication (IPC)가 제공되는데, send() 함수로
	사용이 가능하며 전달된 메시지는 message 이벤트 핸들러로 받아줄 수 있다.
	
	아 그리고 마지막으로 exit와 disconnect라는 이벤트가 있는데 이 두
	이벤트의 차이는 exit는 cluster가 종료될 경우 발생하는 것이고
	disconnect는 IPC의 채널이 끊겼을 경우에 발생한다.
	이 때문에 kill() signal (SIGKILL)이 발생할 경우
	disconnect 이벤트 발생 이후 exit 이벤트가 발생하지만
	disconnect만 호출할 경우에는 exit 이벤트가 발생하지 않는다.
	해당 내용에 대한 증명은 위 코드를 통해 알 수 있다.
*/