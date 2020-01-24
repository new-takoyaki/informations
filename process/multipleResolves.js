const process = require('process');

process.on('multipleResolves', (type, promise, reason) => {
	console.error(type, promise, reason);
	setImmediate(() => process.exit(1));
});

async function main() {
	try {
		return await new Promise((resolve, reject) => {
			resolve('First call');
			resolve('Swallowed resolve');
			reject(new Error('Swallowed reject'));
		});
	} catch {
		throw new Error('Failed');
	}
}

main().then(console.log);

/*
	multipleResolves는 Promise를 다룰 때 resolve가 1번보다 많을 경우
	또는 reject가 1번보다 많을 경우, reject 후에 resolve가 일어날 경우
	그리고 resolve 뒤에 reject가 일어날 경우에 발생하는 이벤트다.
	즉, resolve, reject는 한번씩만 호출될 수 있는데
	여러번 일어나는 경우에 이를 방지하기 위해서 사용하는 이벤트 핸들러이다
*/