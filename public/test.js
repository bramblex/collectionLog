function message() {
  // 抛出错误，可以分别被window.onerror和window.addEventLisner('error')捕获
  adddlert("never excute")
}

function message2() {
  new Promise((resolve, reject) => {
    reject('reject promise');
  }).then((res) => {
    console.log(res);
  })
}