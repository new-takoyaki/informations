const process = require('process');

/*
	beforeExit 이벤트는 Nodejs 프로세스가 더이상 추가적인
	스케줄링이 필요한 작업을 가지지 않을 때 호출됨
	근데 beforeExit의 경우에는 process.exit()같은 명시적인 종료에서는
	호출되지 않지만 정상종료 작업의 경우에는 호출됨
	반면에 exit 이벤트는 process.exit()에서도 발생
	참고로 beforeExit의 경우에는 비동기적인 처리를 수행하기 때문에
	종료를 지연시킬 수 있고, 또한 만일 추가적으로 스케줄되야하는 작업이
	있는 경우가 아니라면 절대로 beforeExit을 exit의 대안으로 사용해선
	안된다.
*/
process.on('beforeExit', (code) => {
	console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
	console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first');
process.on('disconnect', () => {
	console.log("disconnected");
});

const child_process = require('child_process');
const handle = child_process.spawn('grep', ['helloworld']);
handle.disconnect();