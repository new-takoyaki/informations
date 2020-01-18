//가장 간단한 stream 테스트
//process의 stdin 으로 들어오는 입력 데이터를 process.stdout으로 연결
//pipe 함수를 활용하여 해당 스트림의 데이터를 다른 스트림으로 연결할수 있음
process.stdin.pipe(process.stdout);

//1초뒤에 파이프 연결 해제
setTimeout(()=>{
    console.log("unpipe");
    process.stdin.unpipe(process.stdout);
}, 1000);