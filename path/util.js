const { relative, resolve, isAbsolute, join } = require("path");

function absolute(path){
    //인자로 주어진 경로가 절대 경로인지 확인하여 boolean값으로 반환함
    if(isAbsolute(path)){
        console.log("Absolute")
    }else{
        console.log("NOP");
    }
}
absolute("/asdf");
absolute("asdf");

//첫번째 인자의 경로에서 두번째 인자의 경로를 가르키는 상대 경로를 반환
console.log(relative('/test/asdf/test/321q', '/test/asdf/acsa/wqre'));
// ../../acsa/wqre'


//인자로 주어진 모든 경로를 이동했을때의 경로를 반환한다
//처음 인자가 절대 경로가 아닌경우 현재 pwd를 기준으로 계산하니 주의
console.log(resolve('asdf', 'as/fds', '..', 'asdf/..'));

//위와는 다르게 모든 경로를 합쳐서 경로를 반환한다
//하위 파일에 접근하기 위해서 가장 자주사용한다.
console.log(join(__dirname, "asdf"));