const readline = require('readline');
const process = require('process');

const r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// 마찬가지로 r1.close()가 호출되면 close 이벤트가 emit됨
r1.on('close', () => {
	console.log("Close Event Emitted");
});

// line은 end-of-line을 만날 경우에 발생하는 이벤트인데 중요한 점은
// r1.question() 등에 의해 캐치된 메시지에 대해서는 발생하지 않는다는 점
r1.on('line', (input) => {
  console.log(`Received: ${input}`);
});

r1.on('pause', () => {
	console.log("paused");
});

r1.on('resume', () => {
	console.log("Readline resumed");
});

r1.on('SIGCONT', () => {
	console.log("signal");
});

/*
r1.question('What do you think of Node.js? ', (answer) => {
	console.log(`Thank you for your valuable feedback: ${answer}`);
	r1.close();
});
*/

r1.pause();
r1.resume();

r1.write("Delete this!");
r1.write(null, {ctrl: true, name: 'u'});
console.log(r1.getCursorPos());
/*
	readline 모듈은 stdin, stdout을 좀 더 효율적으로 처리하기 위한
	인터페이스를 설계하는 용도로 사용되는듯함
	내가 일반적으로 만들 어플리케이션의 경우에는 웹기반 어플리케이션이기
	때문에 이게 그다지 쓸모있지는 않을듯 함
*/