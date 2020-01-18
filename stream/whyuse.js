//Stream은 한번에 모든 데이터를 가져올수는 없지만
//엄청큰 데이터를 다룰때나, 순차적으로 일부를 쓰고 가져올때
//효율적으로 사용할수 있음.
const { createWriteStream, createReadStream, existsSync } = require('fs');

//exists 함수는 deprecated
//테스트용 파일이 없으면 생성
if(!existsSync('./test.bin')){
    const writeFile = createWriteStream('./test.bin');
    for(let i = 0;i<1000 * 1000 * 10;i++){
        //약 150MB 파일 생성
        writeFile.write("I want go home\n"); //15bytes
    }
    writeFile.end();
}

//프로그램의 stdout으로 출력
const readFile = createReadStream('./test.bin');
readFile.pipe(process.stdout);