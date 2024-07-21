## 

## 参考文献
- [文献](https://blog.poetries.top/browser-working-principle/guide/part2/lesson09.html#%E6%80%9D%E8%80%83%E6%97%B6%E9%97%B4)
- [文献](https://blog.csdn.net/halations/article/details/109218377?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522171004138016800211517404%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=171004138016800211517404&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-109218377-null-null.nonecase&utm_term=%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87&spm=1018.2226.3001.4450)
- [文献](https://blog.csdn.net/halations/article/details/109218377?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522172092435016800186510013%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=172092435016800186510013&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-1-109218377-null-null.nonecase&utm_term=javascript&spm=1018.2226.3001.4450)

## 目录
- [](#)
- [参考文献](#参考文献)
- [目录](#目录)
  - [变量提升、函数提升、浏览器解析变量的机制](#变量提升函数提升浏览器解析变量的机制)
    - [JS预解析](#js预解析)
  - [理解上下文和作用域](#理解上下文和作用域)
  - [ES6是如何解决变量提升带来的缺陷](#es6是如何解决变量提升带来的缺陷)
    - [深度理解let、var的作用域](#深度理解letvar的作用域)
    - [扩展](#扩展)


### 变量提升、函数提升、浏览器解析变量的机制
#### JS预解析
  - 当浏览器加载html页面的时候，首先会提供一个全局JS代码执行的环境(全局作用域)
  - 预解析（变量提升，浏览器的加载机制）
  - 在当前的作用域中，js代码执行之前，浏览器首先会默认把所有带var和function的进行提前的声明或者定义
  - **注意** 对于变量只是进行了变量提前声明，而函数是提前声明并且定义

```JavaScript
var num = 1;
// 理解声明和定义
//    声明（declare）：var num； --> 告诉浏览器在全局作用域中有一个num的变量了，如果一个变量只是声明了但是没有赋值，默认的值是undefined。
//    定义（defined）：num = 1； --> 给变量进行赋值
```

```JavaScript
//  var ->在预解释的时候只是提前的声明
//  function ->在预解释的时候提前的声明+定义都完成了
console.log(number);  // num is not defined
console.log(num); // undefined
var num = 1;
console.log(num); // 1
 
console.log(fn); // 打印出函数体
function fn (){
    console.log('fn')
};
console.log(fn); // 打印出函数体
```

> 变量和函数**重名**时：
> 变量只是提前声明了，函数声明并且定义了，所以先打印的fn
> 然后开始执行时，变量开始赋值，函数不进行赋值
```JavaScript
console.log(fn) // fn(){console.log(4)}
function fn(){
    console.log(2)
}
console.log(fn) //  // fn(){console.log(4)}
var fn = 3
console.log(fn) // 3
function fn(){
    console.log(4)
}
console.log(fn) // 3
```

> 预解析只发生在当前的作用域(全局作用域/局部作用域)下，
> 例如：开始只对window下的进行预解释，只有函数执行的时候才会对函数中的进行预解析
```JavaScript
var a = 10;
function fn (){
    console.log(a); // undefined
    var a  = 11;
    console.log(a); // 11
}
fn()
console.log(a); // 10
// 相当于
var a = 10; // 全局变量
function fn (){
    var a; // 局部变量
    console.log(a); // undefined;
    var a  = 11;
    console.log(a); // 11;
}
fn()
console.log(a); // 10
```

### 理解上下文和作用域
  - 上下文与作用域是两个不同的概念
  > 有时我自己也经常混淆,把它们视为是同一个东西,我们知道函数的每次调用都会有与之紧密相连的作用域和上下文
  > 从本质上说,作用域其实是基于函数的,而上下文是基于对象的
  > 也就是说作用域是涉及到它所被调用函数中的变量访问,而调用方法和访问属性又存在着不同的调用场景(4种调用场景,函数调用,方法调用,构造器函数调用,call(),apply()间接调用)
  > 而上下文始终是this所代表的值,它是拥有控制当前执行代码的对象的引用


### ES6是如何解决变量提升带来的缺陷
```JavaScript
function foo(){
  for (var i = 0; i < 7; i++) {
  }
  console.log(i); 
}
foo()
// 7

function foo(){
  for (let j = 0; j < 7; j++) {
  }
  console.log(j); 
}
foo()
// 报错 Uncaught ReferenceError: j is not defined
```

- 由于JavaScript的变量提升存在着变量覆盖、变量污染等设计缺陷，所以ES6引入了块级作用域关键字来解决这些问题
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