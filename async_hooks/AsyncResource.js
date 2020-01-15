class DBQuery extends AsyncResource {
  constructor(db) {
    super('DBQuery');
    this.db = db;
  }

  getInfo(query, callback) {
    this.db.get(query, (err, data) => {
      this.runInAsyncScope(callback, null, err, data);
    });
  }

  close() {
    this.db = null;
    this.emitDestroy();
  }
}

// AsyncResource는 runInAsyncScope()라는 메서드를 제공해줌.
// runInAsyncScope()는 넘겨받은 callback을 현재 비동기 리소스의
// 실행 흐름 내에서 실행할 수 있도록 기능을 지원해줌
// emitDestroy()는 그렇게 만들어진 후킹용 callback의 설치를 제거함으로
// 기존의 실행흐름을 복구해주는데, 가장 큰 장점은 그 실행흐름 중간에서
// callback을 호출할 수 있게 해주면서도 호출후의 실행흐름을 복원가능하도록 지원해준다는 점이다.