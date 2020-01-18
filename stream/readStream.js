const { Readable } = require("stream");

//읽을수 있는 Stream
const readStream = new Readable({
    read(size) {
        //현재 index가 10 이하면 글자로 바꾸어서 전달
        this.push(`${this.nowIndex++}`);
        if (this.nowIndex > 10) {
            //10 이상이면 null 
            this.push(null);
        }
    }
});

//현재 index를 0으로 설정
readStream.nowIndex = 0;

//위에서 만든 stream을 stdout으로 연결
readStream.pipe(process.stdout);