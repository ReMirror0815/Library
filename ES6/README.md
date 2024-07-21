##

## 参考文献 http://caibaojian.com/es6/promise.html

## 目录
- [](#)
- [参考文献 http://caibaojian.com/es6/promise.html](#参考文献-httpcaibaojiancomes6promisehtml)
- [目录](#目录)
- [内容](#内容)
  - [let\&var\&const](#letvarconst)
    - [let](#let)
    - [const](#const)
    - [let、var 和 const 比较](#letvar-和-const-比较)
    - [深度理解let、var的作用域](#深度理解letvar的作用域)
    - [扩展](#扩展)
  - [解构赋值](#解构赋值)
  - [展开运算符](#展开运算符)
  - [数组扩展、对象扩展](#数组扩展对象扩展)
  - [箭头函数](#箭头函数)
  - [ES6同步和异步](#es6同步和异步)
  - [Promise详细请看es6/promise](#promise详细请看es6promise)
  - [async和await](#async和await)
  - [class、constructor、this](#classconstructorthis)
    - [constructor](#constructor)
    - [this](#this)
    - [class的继承](#class的继承)
    - [类的prototype属性和\_\_proto\_\_属性](#类的prototype属性和__proto__属性)
    - [super关键字](#super关键字)
    - [Class的静态方法](#class的静态方法)
  - [Generator](#generator)
    - [Generator.prototype.return()](#generatorprototypereturn)
  - [proxy\&vue3源码采用的就是这个特性](#proxyvue3源码采用的就是这个特性)
    - [get()](#get)
    - [set()](#set)
    - [apply()](#apply)
    - [has()](#has)
    - [扩展 使用 Proxy 实现观察者模式](#扩展-使用-proxy-实现观察者模式)

## 内容
### let&var&const
#### let
- 暂时性死区：只要块级作用域内存在 let 命令，它所声明的变量就绑定这个区域，不再受外部的影响。在代码块内，使用 let 声明变量之前，该变量都是不可用的，所以叫 “暂时性死区”。
- 不能重复声明
- 块级作用域
- let 不会被预解析(重要)
  
#### const 
- let的所有特性
- 常量不能重新赋值；数组、对象的值可被修改
- 初始化必须赋值
- 赋值后不能改动类型
- const 不会被预解析(重要)
  - 补充：可以去了解一下javascript解析机制
  - 比如说先使用一个变量再去定义，let、const则报错，var会被预解析，能正常使用
    - error: Uncaught SyntaxError: Identifier 'a' has already been declared

#### let、var 和 const 比较
- var
  - var 可以重复声明
  - 作用域：全局作用域 和 函数作用域
  - 会进行预解析
  
- let 
  - 统一作用域下不能重复声明
  - 作用域：全局作用域 和 块级作用域 {}
  - 不进行预解析
  
- const 
  - let 有的它也有
  - 初始化必须赋值
  - 赋值后不能改动类型

#### 深度理解let、var的作用域
``` JavaScript
for(var i = 0; i <5; i ++){ 
  setTimeout(()=> console.log(i)) 
}
// 输出为：5 5 5 5 5

for(let i = 0; i <5; i ++){ 
  setTimeout(()=> console.log(i)) 
}
// 输出为：0 1 2 3 4

// 解答：
// 遇到宏任务定时器，我们知道这是一个异步语句，会进入异步队列。所以回调函数不会执行
// 声明变量var i = 0，因为var声明的变量不存在块级作用域概念，i是一个全局变量，数值被不断覆盖
// 但是let都是都块级作用域
// 结论：
// 在for循环的判断阶段，会产生新的词法作用域（包括初始化的时候），并在作用域中声明新的变量i。但是由于var声明时候存在变量声明的提升，被提升到了词法作用域外。因此，var输出时候，寻找到的变量i是作用域外（已经变为5的i）。但是let的声明提升是在块级作用域中的。输出的会是当前词法作用域下的变量i
```
  
#### 扩展
  - 全局作用域、函数作用域、块级作用域、作用域链
    - 作用域链
      - 作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。在JavaScript中，变量的作用域有**全局作用域**和**局部作用域**两种
      - 当javascript查找与变量相关联的值时,会遵循一定的规则,也就是沿着**作用域链**从当前**函数作用域**内逐级的向上查找,直到顶层**全局作用域**结束,若找到则返回该值,若无则返回undefined
        - 全局作用域
          - 可以在代码的任何地方访问，一般来说，下面情况的对象会在全局作用域中：
          - 最外层函数和在最外层函数外面定义的变量。
          - 没有通过关键字"var"声明的变量。
          - 浏览器中，window对象的属性。
        - 局部作用域
          - 函数作用域（Function scope），所有的变量和函数只能在作用域内部使用

### 解构赋值
  - 解构赋值语法是一种 Javascript 表达式。通过解构赋值，可以将属性/值从对象/数组中取出，赋值给其他变量。
    - 对象的解构赋值
    - 数组的解构赋值
    - 字符串的解构赋值

```JavaScript
// 对象的解构赋值
const obj = {
  a: 1,
  b: 2,
};
const {objA, objB, objC} = obj;
console.log(objA, objB, objC); // 1 2 undefined

// 数组的解构赋值
let a = 0, b = 1;
// 数组：swap
const c = a;
a = b;
b = c;
console.log(a, b); // 1 0
// 数组：结构赋值
const [d, e] = [b, a];
console.log(d, e); // 0 1

// 字符串的解构赋值
const str = 'abc';
const [str1, str2] = str;
console.log(str1, str2); // a b

// 数字的解构赋值
const [a1, b1] = 123;
// 报错：VM208:1 Uncaught TypeError: 123 is not iterable
// MDN：为了统一集合类型，ES6 标准引入了新的 iterable 类型，Array、Map 和 Set 都属于 iterable 类型。
```

### 展开运算符
  - ...
    - 对象展开
    - 数组展开
    - 函数拓展
```JavaScript
let a1 = {a:11,b:22,c:33}
let a2 = [1,2,3,4,5]
let { a,...reset1 } = a1
console.log(a, reset1, ...a2)
//  11, {b: 22, c: 33}, 1 2 3 4 5

// 不定参 - rest 参数
const fn3 = (a, b, ...arg) => {
  console.log(a, b, arg);
};
fn3(1, 2, 3, 4); // 1 2 [3, 4]
```

### 数组扩展、对象扩展
  - 常用的一些新的数组方法
    - Array.from()、Array.of()
    - find()、findIndex()、includes()
    - flat()、flatMap()
    - fill()

  - 常用的一些新的对象方法
    - Object.assign()
    - Object.is
  
### 箭头函数
  - （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
  - （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
  - （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
  - （4）不可以使用yield命令，因此箭头函数不能用作Generator函数。
> **箭头函数**可以让setTimeout里面的this，绑定**定义时**所在的**作用域**，而不是指向运行时所在的作用域(普通函数则是这样)
```JavaScript
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```
  
### ES6同步和异步
  - 同步和异步是一种消息通知机制
  - 同步阻塞
    - A 调用 B，B 处理获得结果，才返回给 A。
    - A 在这个过程中，一直等待 B 的处理结果，没有拿到结果之前，需要 A（调用者）一直等待和确认调用结果是否返回，拿到结果，然后继续往下执行。
    - 做一件事，没有拿到结果之前，就一直在这等着，一直等到有结果了，再去做下边的事
  - 异步非阻塞
    - A 调用 B，无需等待 B 的结果，B 通过状态，通知等来通知 A 或回调函数来处理。
    - 做一件事，不用等待事情的结果，然后就去忙别的了，有了结果，再通过状态来告诉我，或者通过回调函数来处理。
  
### Promise详细请看es6/promise
  - 自己封装核心API queueMicrotask（微任务）
  - Promise 的三种状态：
    - pedding
    - resolved
    - reject
  
### async和await
  - async 和 await 是一起出现的，基于 Promise。

### class、constructor、this
- ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类
- 基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已
``` Javascript
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
typeof Point // "function"
Point === Point.prototype.constructor // true, 可以看到里面有一个constructor方法，这就是构造方法
new Point() instanceof Point // true
```
> 另外，类的内部所有定义的方法，都是不可枚举的
> 采用ES5的写法，toString方法就是可枚举的
```Javascript
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
#### constructor
  - constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  - constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
```JavaScript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

- 与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
```JavaScript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```
> p1和p2都是Point的实例，它们的原型都是Point.prototype，所以__proto__属性是相等的。这也意味着，可以通过实例的__proto__属性为Class添加方法。
```JavaScript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```
#### this
  - 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错
  - 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。 this.printName = this.printName.bind(this);
  - 另一种解决方法是使用箭头函数.this.printName = (name = 'there') => {this.print(`Hello ${name}`);};
```JavaScript
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

#### class的继承
  - Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。 
    - class ColorPoint extends Point {}
  - 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象
  - 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。constructor(...args) {super(...args);}
```JavaScript
  class ColorPoint extends Point {
    constructor(x, y, color) {
      super(x, y); // 调用父类的constructor(x, y)
      this.color = color;
    }

    toString() {
      return this.color + ' ' + super.toString(); // 调用父类的toString()
    }
  }

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  class ColorPoint extends Point {
    constructor(x, y, color) {
      this.color = color; // ReferenceError
      super(x, y);
      this.color = color; // 正确
    }
  }
```
#### 类的prototype属性和__proto__属性
  - 大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
  - 子类的__proto__属性，表示构造函数的继承，总是指向父类。
  - 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
```JavaScript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true

// -----
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

#### super关键字
  - super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。
  - 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数
  - 第二种情况，super作为对象时，指向父类的原型对象
  - 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)。
```JavaScript
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B


class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```
#### Class的静态方法
- 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```JavaScript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

### Generator
  - Generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。
  - 执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。
  - 形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）。
  - 另外需要注意，yield语句不能用在普通函数中，否则会报错
  - for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。

```JavaScript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```
- 上面代码定义了一个Generator函数helloWorldGenerator，它内部有两个yield语句“hello”和“world”，即该函数有三个状态：hello，world和return语句（结束执行）。
- 然后，Generator函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。
- 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield语句（或return语句）为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。

```JavaScript
hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }
```
- 第一次调用，Generator函数开始执行，直到遇到第一个yield语句为止。next方法返回一个对象，它的value属性就是当前yield语句的值hello，done属性的值false，表示遍历还没有结束。
- 第二次调用，Generator函数从上次yield语句停下的地方，一直执行到下一个yield语句。next方法返回的对象的value属性就是当前yield语句的值world，done属性的值false，表示遍历还没有结束。
- 第三次调用，Generator函数从上次yield语句停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。
- 第四次调用，此时Generator函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。
- 总结一下，调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

```JavaScript
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

#### Generator.prototype.return()
- Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。
``` JavaScript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```


### proxy&vue3源码采用的就是这个特性
  - Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
  - new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
``` Javascript
  var proxy = new Proxy({}, {
    get: function(target, property) {
      return 35;
    }
  });

  proxy.time // 35
  proxy.name // 35
  proxy.title // 35
```

> Proxy 实例也可以作为其他对象的原型对象
``` Javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
obj.time2 // 35
obj.time3 // 35 被拦截
```
#### get()
- get方法用于拦截某个属性的读取操作。上文已经有一个例子，下面是另一个拦截读取操作的例子。
- 如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined
```Javascript
var person = {
  name: "张三"
};

var proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError("Property \"" + property + "\" does not exist.");
    }
  }
});

proxy.name // "张三"
proxy.age // 抛出一个错误 
```
- get方法可以继承
``` Javascript
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET '+propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.xxx // "GET xxx"
```
#### set()
  - set方法用来拦截某个属性的赋值操作。
  - 假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求
```Javascript
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```
#### apply()
  - apply方法拦截函数的调用、call和apply操作。
  - apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组

> 变量p是Proxy的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。
``` Javascript
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"
```

> 上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截
``` Javascript
var twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left + right;
};
var proxy = new Proxy(sum, twice);
proxy(1, 2) // 6
proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) // 30
```

#### has()
- has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
> 下面的例子使用has方法隐藏某些属性，不被in运算符发现。
``` Javascript
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
'prop' in proxy // true
```

#### 扩展 使用 Proxy 实现观察者模式
- 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
```Javascript
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
// ------
// 上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。

// 下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
// ------
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20
```