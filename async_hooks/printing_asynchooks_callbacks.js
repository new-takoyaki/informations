const fs = require('fs');
const util = require('util');

function debug(...args) {
	fs.writeFileSync('log.out', `${util.format(...args)}\n`, {flag: 'a'});
}

// 이렇게 해야하는 이유는 console.log의 경우에는 그 자체가 비동기 처리이기 때문에 비동기 callback에 대한 무한 재귀 호출이 이루어질 가능성이 있음.
// 이 때문에 fs.writeFileSync() 같은 동기함수를 사용해서 callback에 대한 무한루프에 빠지지 않고 우리가 원하는 정보를 특정 파일에 기록하도록 작성해야함.

const async_hooks = require('async_hooks');
async_hooks.createHook({
	init(asyncId, type, triggerAsyncId) {
		const eid = async_hooks.executionAsyncId();
		fs.writeSync(1, `${type}(${asyncId}): trigger: ${triggerAsyncId} execution: ${eid}\n`);
	}
}).enable();

require('net').createServer((conn) => {}).listen(3000);

// 참고로 triggerAsyncId는 init이 호출되는 순간에 생성되는 resource의 id이며 async_hooks.executionAsyncId()와의 차이점은, executionAsyncId()는 리소스가 생성되었다는 것만 보여주지만 triggerAsyncId는 왜 리소스가 생겨난 것인지에 대해서 알려준다는 점이 다르다.

// 위 코드에서는 TCPSERVERWRAP이라는 메시지의 경우 서버가 생성되었을 경우에 만들어지며 TCPWRAP의 경우에는 서버에 누군가가 클라이언트로서 접속했을때 발생한다.

// 리소스 (resource)는 비동기 리소스들이 초기화되어쓸 때 표현하기 위한 객체의 한 방식인데, 가령 net.Server.listen()을 호출할 경우찾기 위한 IP 주소와 같은 정보들을 가지는 객체다. 일반적으로 API로는 접근이 불가능하지만 Embedder API등을 활용하면 자기자신의 리소스 오브젝트에는 제한적으로 접근이 가능하다.

// Promise 리소스의 경우에는 객체가 isChainedPromise라는 속성을 가지는데, 이게 true로 설정되면 부모 Promise 객체가 존재한다는 뜻이고 없을 경우 false라는 속성을 가진다.
// 가령 b = a.then(handler)라는 예시로 설명하면 a는 b Promise 객체의 부모 객체를 고려한다.

