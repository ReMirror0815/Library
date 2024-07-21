### Promise
  - 核心api： queueMicrotask（微任务）
  - 状态
    - pedding
    - resolved
    - reject
``` Javascript
  const p1 = new Promise((resolve, reject) => {});
  console.log(p1); // Promise {<pending>}

  const p2 = new Promise((resolve, reject) => {
    resolve('解决了！');
  });
  console.log(p2); // Promise {<resolved>: "解决了！"}

  const p3 = new Promise((resolve, reject) => {
    reject('失败了！');
  });
  console.log(p3); // Promise {<rejected>: "失败了！"}
  // 报错：Uncaught (in promise) 失败了！
```

#### resolve & reject
```Javascript
const p1 = Promise.resolve('成功');
console.log(p1); // Promise {<resolved>: "成功"}

const p2 = Promise.reject('失败');
console.log(p2); // Promise {<rejected>: "失败"}
```

> then：Promise 对象会有 then 方法，它传递两个参数：onresolve 和 onreject。
```Javascript
  const p1 = new Promise((resolve, reject) => {
    resolve({ name: 'jsiang', age: '25' });
  }).then((res) => {
    console.log('调用成功：', res);
  }, (error) => {
    console.log('调用失败：', error);
  });
  // 调用成功： {name: "jsiang", age: "25"}

  const p2 = new Promise((resolve, reject) => {
    reject({ code: '999', message: '接口报错' });
  }).then((res) => {
    console.log('调用成功：', res);
  }, (error) => {
    console.log('调用失败：', error);
  })
  // 调用失败： {code: "999", message: "接口报错"}


  new Promise((a,b)=>{
    a(1)
  }).then(res=>{
      console.log('then',res)
  }).catch(err=>{
      console.log('err',err)
  })
  // then 1
  new Promise((a,b)=>{
    b(22)
  }).then(res=>{
      console.log('then',res)
  }).catch(err=>{
      console.log('err',err)
  })
  // err 22
```

#### all
  - all：所有内容成功则成功
``` Javascript
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log();
      resolve('p1 执行完毕');
    }, 1000);
  });
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p2 执行完毕');
      // reject('p2 执行完毕');
    }, 3000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p3 执行完毕');
    }, 2000);
  });
  Promise.all([p1, p2, p3]).then(res => {
    console.log(res); // ["p1 执行完毕", "p2 执行完毕", "p3 执行完毕"]
  }).catch(err => {
    console.log(err);
  });
```

#### race：执行最快的结果
  - race：执行最快的结果
``` Javascript
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1 执行完毕');
    }, 1000);
  });
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p2 执行完毕');
      // reject('p2 执行完毕');
    }, 3000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p3 执行完毕');
    }, 2000);
  });
  Promise.race([p1, p2, p3]).then(res => {
    console.log(res); // p1 执行完毕
  }).catch(err => {
    console.log(err);
  });
```

#### 实现一个promise
- 核心微任务api：queueMicrotask
- 详细请看ES6/MPromise.js

#### 实现一个promise.all
- tudu