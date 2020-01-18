const { Transform } = require("stream");
const { createGzip } = require('zlib');
const { createReadStream ,createWriteStream } = require("fs");

//Transform 클래스는 새로 만들경우 아래처럼
//transform 함수를 오버라이딩
const objToJson = new Transform({
    transform(chunk, encoding, callback) {
        //입력된 데이터를 json 으로 변환하여 출력
        this.push(`${JSON.stringify(chunk)}\n`);
        callback();
    }
});

//objToJson 에서 변환된 데이터를 stdout으로 출력
process.stdin
    .pipe(objToJson)
    .pipe(process.stdout);

//5초뒤에 파이프 연결 해제
setTimeout(()=>{
    process.stdin.unpipe(objToJson);
    //입력된 데이터를 GZip으로 인코딩 해서 출력
    createReadStream('./whyuse.js')
        .pipe(createGzip())
        .on('data', () => process.stdout.write('.'))
        .pipe(createWriteStream('./whyuse.js.gz'))
        .on('finish', () => console.log('Done'));
}, 5000);
