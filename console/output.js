//가장 일반적으로 사용되는 형식
//주로 로그를 남길때 사용함

console.log("test!");
//test!
console.warn("test?");
//test?
console.error("test!!?");
//test!!?
console.info("test!");
//test!
console.assert(true, 'Hello');
// OK
console.assert(false, '%s work', '? why');
// Assertion failed: Whoops didn't work


const data = {
    how : "어떻게?",
    why : "왜??"
};

//object 데이터를 사람이 보기 편하게 출력해줌
console.dir(data);

const tableTest = [data, data];
//리스트를 테이블 형식으로 출력해준다.
console.table(tableTest);
/*

┌─────────┬───────────┬────────┐
│ (index) │    how    │  why   │
├─────────┼───────────┼────────┤
│    0    │ '어떻게?'   │ '왜??'  │
│    1    │ '어떻게?'   │ '왜??'  │
└─────────┴───────────┴────────┘
*/