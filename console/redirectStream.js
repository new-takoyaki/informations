const { createWriteStream } = require("fs");
const { Console } = require("console");

//출력과 에러 출력에 사용할 스트림 생성
const output = createWriteStream('./stdout.log');
const errorOutput = createWriteStream('./stderr.log');

//새 콘솔 인스턴스 생성
//이때 인자로 준 스트림으로 출력이 된다.
const logger = new Console({ stdout: output, stderr: errorOutput });



logger.log('count: %d', 123);
//count: 123
