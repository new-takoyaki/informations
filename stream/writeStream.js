const { Writable } = require('stream');

//출력 스트림을 아래처럼 만들어서 쓸수도 있음

//chunk는 들어오는 데이터 일부분 
//encoding은 chunk가 String일 경우의 인코딩
//callback은 스트림 처리 이후에 실행할 콜백
//에러 객체를 넘기면 에러 처리 가능
const outStream = new Writable({
    write(chunk, encodeing, callback) {
        //입력된 데이터가 숫자면 2로 나눠서 출력
        if(!isNaN(Number(chunk))){
            console.log(Number(chunk) / 2);
        }else{
            //아닌 경우 그냥 출력
            console.log(chunk.toString());
        }
        /*
        출력 결과
            stdin : asdf
            asdf

            stdin : 123
            61.5
        */
        callback();
    }
});

process.stdin.pipe(outStream);