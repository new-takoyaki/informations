const { basename, dirname, extname, format, normalize, parse } = require("path");

//파일명을 가져올때 사용하는 함수
console.log(basename("~/test.bin"));
//인자를 추가하여 확장자를 거를수 있음
console.log(basename("~/test.bin", ".bin"));

//파일의 확장자를 반환
//파일 확장자가 없는경우 빈 스트링 반환
console.log(extname("~/test.bin"));


//인자로 넣은 위치의 상위 폴더 주소를 반환
// /Volumes/External/dev/ 넣으면 /Volumes/External/ 를 반환함
console.log(dirname("/Volumes/External/dev/"));

//인자로 주어진 값을 object로 파싱하여 반환
//dir, 파일명, 확장자 등으로 분리하여 반환
console.log(parse('/home/user/dir/file.txt'));
// returns
// {
//    root : "/",
//    dir : "/home/user/dir",
//    base : "file.txt",
//    ext : ".txt",
//    name : "file"
// }

//parse에서 파싱된 데이터와 같은 형식으로 인자를 주면
//다시 파일 경로를 반환해줌 
console.log(format({
    root: "/",
    dir: "/home/user/dir",
    base: "file.txt",
    ext: ".txt",
    name: "file"
}));
// /home/user/dir/file.txt

//주소가 가르키고있는 폴더의 경로명을 간단화 하여 표시
console.log(normalize('/test/asdf/cdas/../../asdf/'));
// /test/asdf/