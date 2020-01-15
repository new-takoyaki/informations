const async_hooks = require('async_hooks');
const fs = require('fs');

let indent = 0;
async_hooks.createHook({
	init(asyncId, type, triggerAsyncId) {
		const eid = async_hooks.executionAsyncId();
		const indentStr = ' '.repeat(indent);
		
		fs.writeSync(
		1,
		`${indentStr}${type}(${asyncId}):` + 
		` trigger: ${triggerAsyncId} execution: ${eid}\n`);
	},
	before(asyncId){
		const indentStr = ' '.repeat(indent);
		fs.writeFileSync('log.out',
						`${indentStr}before: ${asyncId}\n`, { flag: 'a' });
		indent += 2;
	},
	after(asyncId) {
		indent -= 2;
		const indentStr = ' '.repeat(indent);
		fs.writeFileSync('log.out',
						`${indentStr}after: ${asyncId}\n`, {flag: 'a'});
	},
	destroy(asyncId) {
		const indentStr = ' '.repeat(indent);
		fs.writeFileSync('log.out',
						`${indentStr}destroy: ${asyncId}\n`, {flag: 'a'});
	},
}).enable();

require('net').createServer(() => {}).listen(8080, () => {
	setTimeout(() => {
		console.log('>>>', async_hooks.executionAsyncId());
	}, 10);
});

// 실행결과는 다음과 같음
/*
TCPSERVERWRAP(5): trigger: 1 execution: 1
TickObject(6): trigger: 5 execution: 1
  Timeout(7): trigger: 6 execution: 6
  TIMERWRAP(8): trigger: 6 execution: 6
    TickObject(9): trigger: 7 execution: 7
    TickObject(9): trigger: 7 execution: 7
*/

// 여기서 우리가 알 수 있는건 TCPSERVERWRAP과 TickObject는 독립적인 개체며
// 둘 다 실행은 root로부터 파생되었다는 점을 알 수 있음.
// 다만 트리거된 위치는 TCPSERVERWRAP이라는 것을 triggerAsyncId를 통해 알 수 있음.
// 또한 Timeout과 console.log는 독립적인 비동기 객체라는 점도 알 수 있음.

