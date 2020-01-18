const { win32, posix } = require("path");
const { platform } = require("process");

//win32를 사용해야되는지 체크
console.log(`your platform is ${platform}`);
const isWin = platform === "win32";

//window와 다른 OS는 같은 명령어를 사용해도 다른 결과가 나올때가 있음
//posix 표준을 준수하는지 차이 떄문인데 내부적으로 OS와 통신할때 차이가 발생해서
//window의 경우에는 path모듈안에 있는 win32를 활용하여 접근을 해야 다른 결과가 나오지 않음

//sep의 경우에도 win32에서 가져오면 \\가
//posix에서 가져오면 /를 반환한다.
if(isWin){
    console.table(win32.parse("~/.bashrc"));
    console.log(win32.sep);
}else{
    console.table(posix.parse("~/.bashrc"));
    console.log(posix.sep);
}

/*
your platform is darwin
┌─────────┬───────────┐
│ (index) │  Values   │
├─────────┼───────────┤
│  root   │    ''     │
│   dir   │    '~'    │
│  base   │ '.bashrc' │
│   ext   │    ''     │
│  name   │ '.bashrc' │
└─────────┴───────────┘
/
*/