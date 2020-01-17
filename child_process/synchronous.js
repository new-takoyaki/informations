/*
	* child_process.execFileSync()
	* child_process.spawnSync()
	일반적으로 child process들은 생성된 이후 동기적이 아닌 비동기적으로
	수행되기 때문에 Node.js의 event loop가 멈추지 않고 돌아간다.
	우리가 만일 동기적으로 자식 프로세스의 결과를 확인한 이후에
	event loop가 돌아가길 바란다면 Sync 계열 함수를 사용하면 된다.
*/

/*
	원래 해당 파일은 synchronous 계열 함수에 대해 정리하려고 했지만
	예제를 딱히 다룰 필요는 없어보이기에 다른 개념들도 한번에 정리한다.
	
	ChildProcess라는 클래스가 있다. 이는 EventEmitters에 포함되는데
	생성된 자식 프로세스를 표현하기 위한 인스턴스로 활용된다.
*/

/*
	수행되는 이벤트들은 close나 disconnect 등의 이벤트들이 있는데
	property목록을 보면 signal이라는 값이 있다.
	쉽게 callback에서 다룰 수 있는 내용들인데 이 signal을 이용해서
	웹 기반 fuzzing framework를 만드는것도 가능하지 않을까?
*/