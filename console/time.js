//소요된 시간을 출력할때 사용한다
//time 함수인자로 label을 설정하고
//timeEnd에서 설정한 label을 인자로 주면 
//그동안 소요된 시간을 stdout으로 출력한다.

console.time('test');
for (let i = 0; i < 100 * 1000; i++) {
    
}
console.timeEnd('test');
//test: 2.073ms
