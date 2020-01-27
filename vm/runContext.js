const vm = require('vm');

var localVar = 123,
	usingscript, evaled;

usingscript = vm.runInThisContext('localVar = 1;', 'myfile.vm');
console.log('localVar: ' + localVar + ', usingscript: ' + usingscript);

evaled = eval('localVar = 1');
console.log('localVar: ' + localVar + ', evaled: ' + evaled);

/*
	node.js의 vm 모듈의 sandbox는 local variable에는 액세스하지 못함
	global variable에만 액세스 가능하기 때문에 이를 고려해야함 가령
	다음과 같이 사용할 수 있음.
*/

sandbox = {animal: 'cat', count: 2};
vm.runInThisContext('sandbox[\'name\'] = \"kitty\";', 'myfile.vm');
console.log(sandbox);

// 이렇게도 실행이 가능하고, 특정 객체를 넘겨주는 sandbox라는 옵션도 있음

sandbox = {animal: 'cat', count: 2};
vm.runInNewContext('count += 1; name = "kitty"', sandbox, 'myfile.vm');
console.log(sandbox);

// vm.createContext()
initSandbox = { animal: 'cat', count: 2 };
context = vm.createContext(initSandbox);

vm.runInContext('count += 1; name = "CATT"', context, 'myfile.vm');
console.log(context);
console.log(initSandbox); // initSandbox에도 영향을 미침

globalVar = 0;
var script = vm.createScript('globalVar += 1', 'myfile.vm');
for(var i = 0; i < 1000; i++) {
	script.runInThisContext();
}
console.log(globalVar);