const { spawn } = require('child_process');
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
	console.log(
	`child process terminated due to receipt of signal ${signal}`);
});

// grep.kill('SIGHUP');
grep.kill('SIGSEGV');
// grep.kill('SIGNAL');			-> An error occured

// 참고로 자식 프로세스에 의해 생성된 자식의 자식 프로세스는
// 자식 프로세스가 kill()에 의해 종료된다고 해도 종료되지 않는다
// 이는 즉 orphan 프로세스가 생성된다는 의미로 해석할 수 있다.