const os = require('os');

// os.EOL은 End Of Line 특수문자를 의미함
console.log("Hello" + os.EOL + "World");
console.log(os.arch()); // os.arch()는 현재 시스템의 운영체제 아키텍처 정보를 리턴함
console.log(os.cpus()); // cpu의 정보를 나열
console.log(os.endianness()); // 운영체제의 endian 정보를 표시, big이나 little

console.log(os.freemem());
console.log(os.getPriority(1)); // 해당 pid 프로세스의 스케줄링 우선순위를 출력
console.log(os.homedir()); // home directory의 path를 출력
console.log(os.hostname()); // 운영체제의 hostname을 출력
console.log(os.loadavg()); // 용도를 아직 잘 모르겠음

console.log(os.networkInterfaces()); // 네트워크 인터페이스 정보를 보여줌
console.log(os.platform()); // 운영체제의 플랫폼 (리눅스, 윈도우 등)을 보여줌

console.log(os.release()); // 운영체제의 릴리즈 버전을 알려줌
console.log(os.tmpdir()); // 운영체제상의 tmp 디렉토리를 알려줌
console.log(os.totalmem()); // 운영체제가 가지는 최대 메모리의 크기를 알려줌
console.log(os.type()); // 운영체제의 타입을 알려줌, 가령 Windows_NT는 윈도우를 가르킴
console.log(os.uptime()); // 운영체제의 부팅이후 시간을 알려줌
console.log(os.userInfo()); // 현재 실행중인 user의 정보를 보여줌