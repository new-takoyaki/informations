const repl = require('repl');
const msg = 'message';

// repl.start('> ').context.m = msg; // REPL 콘솔 내의 m이라는 변수는 시작부터 msg 값으로 지정

/*
const r = repl.start('> ');
Object.defineProperty(r.context, 'm', {
	configurable: false,
	enumerable: true,
	value: msg
});
*/
// 위 방식도 repl.start('> ').context.m = msg와 같은 효과
// 다만 defineProperty()로 속성을 지정해주었기에 read-only 속성을 부여할 수 있음

const { Translator } = require('translator');
const myTranslator = new Translator('en', 'fr');
function myEval(cmd, context, filename, callback) {
	callback(null, myTranslator.translate(cmd));
}

repl.start({ prompt: '> ', eval: myEval});