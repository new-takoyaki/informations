const fs = require('fs');
const { spawn } = require('child_process');
const out = fs.openSync('./out.log', 'a');
const err = fs.openSync('./out.log', 'a');

const subprocess = spawn('prg', [], {
	detached: true,
	stdio: ['ignore', out, err] // 여기서 stdio에서 stdin필드가 ignore됬으니
								// 부모 프로세스에서 오는 stdin을 무시한다.
});

subprocess.unref();				// subprocess에 대한 reference를 제거함으로
								// 부모 프로세스는 자식 프로세스의 종료를 대기하지 않는다

// 위 예제는 완전히 독립적인 자식프로세스를 생성하는 것을 보여준다
