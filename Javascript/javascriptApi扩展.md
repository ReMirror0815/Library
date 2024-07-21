## 

### 参考文献

### 目录
  - 判断数据类型
  - Object.defineProperty 和 Proxy
  - 各种数组方法（创建指定长度、降纬等方法）
  - 各种对象方法

### 判断数据类型
  - typeof() 常用
  - instanceof 常用
  - constructor
  - Object.prototype.toString.call() 常用，推荐，在不强制改变对象原型的情况下能精确判断数据类型

#### typeof() 适合判断基本数据类型
  > typeof operand 或者 typeof(operand)

| 类型| 结果|
| -------- | -----------|
| Undefined | 'undefined'|
| Null	| 'object'|
| Boolean	|'boolead'|
| Number	|'number'|
| BigInt	|'bigint'|
| String	|'string'|
| Symbol	|'symbol'|
| Function	|'function'|
| 其他任何对象	|'object'|

- 缺点
  - 判断 typeof null，会得到 object；
  - 判断构造函数 typeof new String('String') 或者 typeof new Number(123) 等……，也会得到 object

#### instanceof
> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

```JS
const simpleNumber = 123;
const newNumber = new Number(123);

console.log(simpleNumber instanceof Number); // false
console.log(newNumber instanceof Number); // true

const arr = [];
console.log(arr instanceof  Array); // true
console.log(arr instanceof Object); // true
```


#### constructor
> constructor 返回创建实例对象的 Object 构造函数的引用
> constructor 和前面的 typeof、instanceof 不同，typeof 和 instanceof 是属于 表达式和运算符 分类下的，而 constructor 是直接关系到内置对象 Object 下

```JS
const arr = [];
console.log(arr.constructor === Array); // true

const obj = {};
console.log(obj.constructor === Object); // true

const num = 1;
console.log(num.constructor === Number); // true

const str = '1';
console.log(str.constructor === String); // true

const bool = true;
console.log(bool.constructor === Boolean); // true

const nul = null;
// console.log(nul.constructor); // 报错：Uncaught TypeError: Cannot read property 'constructor' of null at <anonymous>:1:5

const undefin = undefined;
// console.log(undefin.constructor); // 报错：Uncaught TypeError: Cannot read property 'constructor' of null at <anonymous>:1:5
```

#### Object.prototype.toString.call()
  - 功能：toString() 方法返回一个表示该对象的字符串。
  - 方法：obj.toString()
  - 返回值：一个表示该对象的字符串。
  
```JavaScript
/**
 * @name 示例
 * @description toString 检测对象类型
 */
const toString = Object.prototype.toString;

console.log(toString.call(new Date));     // [object Date]
console.log(toString.call(new String));   // [object String]
console.log(toString.call(Math));         // [object Math]
console.log(toString.call('jsliang'));    // [object String]
console.log(toString.call(123));          // [object Number]
console.log(toString.call([]));           // [object Array]
console.log(toString.call({}));           // [object Object]
console.log(toString.call(undefined));    // [object Undefined]
console.log(toString.call(null));         // [object Null]

console.log('------');

console.log(toString.apply(new Date));     // [object Date]
console.log(toString.apply(new String));   // [object String]
console.log(toString.apply(Math));         // [object Math]
console.log(toString.apply('jsliang'));    // [object String]
console.log(toString.apply(123));          // [object Number]
console.log(toString.apply([]));           // [object Array]
console.log(toString.apply({}));           // [object Object]
console.log(toString.apply(undefined));    // [object Undefined]
console.log(toString.apply(null));         // [object Null]
```

### Object.defineProperty 和 Proxy
  > Object.defineProperty
```JS
observer(data) {
  const dep = new Dep();
  for (let key in data) {
    let value = data[key];
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        if (Dep.target) {
          dep.addSub(Dep.target);
        }
        return value;
      },
      set(newValue) {
        dep.notify(newValue, key);
        if (newValue !== value) {
          value = newValue;
        }
      }
    });
  }
};

// 绑定事件二次渲染视图
for (let i = 0; i < result.length; i++) {
  new Watcher(this._data, result[i], (newValue, key) => {
    if (result[i] === key) {
      textContent = textContent.replace(this._data[result[i]], newValue);
    }
    node.textContent = textContent;
  });
}
```

> Proxy
```JS
observer(data) {
  const dep = new Dep();
  this._data = new Proxy(data, {
    get(target, key) {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return target[key];
    },
    set(target, key, newValue) {
      dep.notify(newValue, key);
      target[key] = newValue;
      return true;
    }
  })
};

// 绑定事件二次渲染视图
for (let i = 0; i < result.length; i++) {
  new Watcher(this._data, result[i], (newValue, key) => {
    if (result[i] === key) {
      textContent = textContent.replace(this._data[result[i]], newValue);
    }
    node.textContent = textContent;
  });
}
```

> 发布订阅
```JS
// 发布订阅
// 发布者
class Dep {
  constructor() {
    this.subs = [];
  };
  addSub(sub) {
    this.subs.push(sub);
  };
  // 发布
  notify(newValue, key) {
    this.subs.forEach((sub) => {
      sub.update(newValue, key);
    });
  }
}
// 订阅者
class Watcher {
  constructor(data, key, cb) {
    Dep.target = this;
    this.cb = cb;
    // 人为触发 get
    data[key];
    Dep.target = null;
  };
  update(newValue, key) {
    this.cb(newValue, key);
  }
}
```

Proxy 和 Object.defineProperty 的使用方法看似很相似，其实 Proxy 是在 「更高维度」 上去拦截属性的修改的，怎么理解呢？

Vue2 中，对于给定的 data，如 { count: 1 }，是需要根据具体的 key 也就是 count，去对「修改 data.count 」 和 「读取 data.count」进行拦截，也就是

```JS
Object.defineProperty(data, 'count', {
  get() {},
  set() {},
})
```

复制代码必须预先知道要拦截的 key 是什么，这也就是为什么 Vue2 里对于对象上的新增属性无能为力。

而 Vue3 所使用的 Proxy，则是这样拦截的：

```JS
new Proxy(data, {
  get(key) { },
  set(key, value) { },
})
```


复制代码可以看到，根本不需要关心具体的 key，它去拦截的是 「修改 data 上的任意 key」 和 「读取 data 上的任意 key」。

所以，不管是已有的 key 还是新增的 key，都逃不过它的魔爪。

但是 Proxy 更加强大的地方还在于 Proxy 除了 get 和 set，还可以拦截更多的操作符。

### 各种数组方法（创建指定长度、降纬等方法）
> ...

### 各种对象方法
> ...


