const Buffer = require('buffer').Buffer;
// 짚고 넘어가야할 점. 우선 allocUnsafe() 계열 함수는 안전하지 않음
// 그 이유는 alloc()과는 다르게 디폴트로 초기화해주지 않기 때문임
// 그럼에도 사용하는 이유는 alloc()보다 할당속도가 빠르기 때문

// 두 번쨰로 짚고 넘어가야 하는 점은 allocUnsafe 계열 함수도 2가지임
// 하나는 allocUnsafe() 함수인데, 이 경우에는
// 4KB보다 작은 크기를 할당할 때 사용하게 되면
// 이미 할당된 단일 pre-allocated 메모리 버퍼의 일부를 잘라내서
// 할당하는 식으로 동작함
// 이런 방식을 통해 개별적인 버퍼 인스턴스 할당이 많이 이루어지는 경우의
// 가비지 콜렉션에 대한 오버헤드를 피할 수 있음
// 이런 접근 방식을 통해 성능과 메모리 관리 측면을 개선할 수 있음

// 두 번째 함수는 allocUnsafeSlow()라는 함수인데 이 경우에는
// 일반적으로 정해지지 않은 시간만큼 유지되어야 하는
// 작은 메모리 영역을 할당할 때 사용하는데, 기존의 allocUnsafe()와의
// 차별화된 점은 기존 함수랑은 다르게 un-pooled 상태의 버퍼 인스턴스를
// 생성한다는 점임. 그리고 관련된 비트들을 그저 복사하는 정도로 동작함.

const store = [];

socket.on('readable', () => {
	let data;
	
	while (null !== (data = readable.read())) {
		const sb = Buffer.allocUnsafeSlow(10);
		
		data.copy(sb, 0, 0, 10);
		store.push(sb);
	}
});