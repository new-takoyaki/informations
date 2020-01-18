const { Duplex } = require('stream');

//입출력을 동시에 할수 있는 Stream 객채
const duplexStream = new Duplex({
    write(chunk, encodeing, callback) {
        //입력된 데이터가 숫자면 2로 나눠서 출력
        if (!isNaN(Number(chunk))) {
            console.log(Number(chunk) / 2);
            this.nowIndex = Number(chunk);
        } else {
            //아닌 경우 그냥 출력
            console.log(chunk.toString());
        }
        callback();
    },

    read(size) {
        //현재 index가 10 이하면 글자로 바꾸어서 전달
        this.push(`${this.nowIndex++}`);
        if (this.nowIndex > 10) {
            //10 이상이면 null 
            this.push(null);
        }
    }
});

duplexStream.nowIndex = 0;


//stream은 pipe로 여러번 연결할수 있음
process.stdin
    .pipe(duplexStream)
    .pipe(process.stdout);