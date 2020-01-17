const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`);
});

ls.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
});

/*
이런 pipeline은 기본적으로 child process와 parent nodejs process
사이에 생성된다.
이 때문에 만일 필요없는 파이프라인에 대한 생성을 차단하려면
속성을 명시적으로 제공해주면 된다.
*/

/*
전체적인 구성 메서드
 - child_process.exec()
 - child_process.execFile()
 - child_process.fork()
 - child_process.execSync()
 - child_process.execFileSync()
*/

// Windows상과 Linux 상과의 차이점
/*
	윈도우의 경우 .bat이나 .cmd 파일은 그들만의 terminal에서
	실행이 불가능하다. 이 때문에 일반적으로
	Unix 시스템 상에서는 child_process.execFile()이 더 효율적이고
	Windows 시스템 상에서는 child_process.execFile()이 유효하지 않기에
	child_process.spawn()을 활용하거나 child_process.exec()를 활용하여
	자식 프로세스를 생성할 수 있다.
	또는 spawn을 사용할 때 shell: true 옵션을 제공함으로 대체할 수도 있다.
*/

const { spawn } = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => {
	console.log(data.toString());
});


const { exec } = require('child_process');
exec('my.bat', (err, stdout, stderr) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(stdout);
});

const bat = spawn('"my script.cmd"', ['a', 'b'], {shell: true});
exec('"my script.cmd" a b', (err, stdout, stderr) => {
	// ...
});

/*
	* child_process.fork()
	참고로 생성된 자식 프로세스는 자신들만의 고유한 메모리와 v8 인스턴스를
	갖는다. 이 때문에 추가적인 리소스를 필요로 하는데
	이런 이유로 너무 많은 수의 자식 Node.js 프로세스에 대한 생성은
	그다지 추천되지 않는다. (즉 필요 시에만 사용하는 것을 권장)
	고려해야하는 점은 POSIX의 fork() system call과는 차별화된 부분이
	있는데, 현재 프로세스에 대한 복사본을 생성하지 않는다는 점이다. (명심)
*/