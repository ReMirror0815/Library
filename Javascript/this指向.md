### 目录
  - this指向
    - 默认绑定(非严格模式下this指向全局对象, 严格模式下this会绑定到undefined)
    - 隐式绑定(当函数引用有上下文对象时, 如 obj.foo()的调用方式, foo内的this指向obj)
    - 隐式绑定的隐式丢失问题
    - 显式绑定
    - 显式绑定的其它用法
    - new 绑定
    - 箭头函数绑定



### this指向
  > 论点： this 不是变量，不是属性，不能为其赋值，它始终指向调用它的对象
  ####  1.默认绑定(非严格模式下this指向全局对象, 严格模式下this会绑定到undefined)
    ```Javascript
      let a = 10
      const b = 20
      var c = 30

      function foo () {
        var d = 40
        console.log(this.a) // undefined
        console.log(this.b) // undefined
        console.log(this.c) // 30
        console.log(this.d) // undefined d现在属于局部变量不属于全局变量所以在window下面没有
      }
      foo(); // window.foo()
    ```
  ####  2.隐式绑定(当函数引用有上下文对象时, 如 obj.foo()的调用方式, foo内的this指向obj)
    ```Javascript
      function foo () {
        console.log(this.a) // 1
      }
      var obj = { a: 1, foo }
      var a = 2
      obj.foo()
      // 如果直接调用foo则指向windos，
      // 通过对象obj调用，则this指向obj
    ```
  ####  3.隐式绑定的隐式丢失问题
    ```Javascript
      function foo () {
        console.log(this.a) // 2
      }
      function doFoo (fn) {
        console.log(this) // { a: 3, doFoo }
        fn()
      }
      var obj = { a: 1, foo }
      var a = 2
      var obj2 = { a: 3, doFoo }
      obj2.doFoo(obj.foo)
    // 现在调用obj2.doFoo()函数，里面的this指向的应该是obj2，因为是obj2调用的它。
     // 但是obj.foo()打印出来的a依然是2，也就是window下的。
     // 所以说，如果你把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的this指向无关
    ```
  #### 4.显式绑定
  > [参考博客](https://juejin.cn/post/6844904083707396109)
  > 功能如其名，就是强行使用某些方法，改变函数内this的指向。
  > 通过call()、apply()或者bind()方法直接指定this的绑定对象
  - 使用.call()或者.apply()的函数是会直接执行的
  - bind()是创建一个新的函数，需要手动调用才会执行
  - .call()和.apply()用法基本类似，不过call接收若干个参数，而apply接收的是一个数组
  ```Javascript
  function foo () {
    console.log(this.a)
  }
  var obj = { a: 1 }
  var a = 2

  foo() // 2
  foo.call(obj) // 1
  foo.apply(obj) // 1
  foo.bind(obj)() // 1
  ```
  ```Javascript
    var obj1 = {
      a: 1
    }
    var obj2 = {
      a: 2,
      foo1: function () {
        console.log(this.a)
      },
      foo2: function () {
        setTimeout(function () {
          console.log(this)
          console.log(this.a)
        }, 0)
      }
    }
    var a = 3
    obj2.foo1() // 2
    obj2.foo2() // Window,2
    // 定时器存在隐式绑定的隐式丢失问题指向windos
    // 可以通过显式绑定方法，指向obj2
  ```
  #### 5.显式绑定的其它用法
  > forEach、map、filter的第二个参数 可以改变this指向
  ```Javascript
    function foo (item) {
      console.log(item, this.a)
    }
    var obj = {
      a: 'obj'
    }
    var a = 'window'
    var arr = [1, 2, 3]
    // arr.forEach(foo, obj)
    // arr.map(foo, obj)
    arr.filter(function (i) {
      console.log(i, this.a) // this.a = obj
      return i > 2
    }, obj)
  ```
  #### 6.new 绑定
  > 构造函数内部this，正常情况下都指向构造函数本身
  > 通过call等方法或者函数再return一个函数来隐式丢失this
  ```Javascript
    var name = 'window'
    function Person (name) {
      this.name = name
      this.foo = function () {
        console.log(this.name)
        return function () {
          console.log(this.name)
        }
      }
    }
    var person1 = new Person('person1')
    var person2 = new Person('person2')
    person1.foo.call(person2)()
    // 'person2'
    // 'window'
    person1.foo().call(person2)
    // 'person1'
    // 'person2'
  ```
  #### 7.箭头函数绑定（了解箭头函数其他属性请参考ES6中的箭头函数）
  > 以上六点都适用“this 永远指向最后调用它的那个对象”
  > 但是对于箭头函数就不是这样，它里面的this是由外层作用域来决定的，且指向函数**定义时**的this而非**执行时**。
  > 箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。
  ```Javascript
  var name = 'window'
  var obj1 = {
    name: 'obj1',
    foo: function () {
      console.log(this.name)
      return function () {
        console.log(this.name)
      }
    }
  }
  var obj2 = {
    name: 'obj2',
    foo: function () {
      console.log(this.name)
      return () => {
        console.log(this.name)
      }
    }
  }
  var obj3 = {
    name: 'obj3',
    foo: () => {
      console.log(this.name)
      return function () {
        console.log(this.name)
      }
    }
  }
  var obj4 = {
    name: 'obj4',
    foo: () => {
      console.log(this.name)
      return () => {
        console.log(this.name)
      }
    }
  }
  // 两层都是普通函数，类似于题目4.6，分别打印出obj1和window。
  obj1.foo()() // 'obj1' 'window'
  // obj2.foo()()外层为普通函数，内层为箭头，类似于题目7.1，都是打印出obj2。
  obj2.foo()() // 'obj2' 'obj2'
  // obj3.foo()()外层为箭头函数，内层为普通函数，箭头函数的this由外层作用域决定，因此为window，内层普通函数由调用者决定，调用它的是window，因此也为window。
  obj3.foo()() // 'window' 'window'
  // obj4.foo()()两层都是箭头函数，第一个箭头函数的this由外层作用域决定，因此为window，第二个箭头函数的this也由外层作用域决定，它的外层作用域是第一个箭头函数，而第一个箭头函数的this是window，因此内层的this也是window。
  obj4.foo()() // 'window' 'window'
  ```
  > 再结合call方法，改变箭头函数，记住一句话
  > this是由外层作用域来决定的，且指向函数**定义时**的this而非**执行时**。
  ```Javascript
    var name = 'window'
    var obj1 = {
      name: 'obj1',
      foo1: function () {
        console.log(this.name)
        return () => {
          console.log(this.name)
        }
      },
      foo2: () => {
        console.log(this.name)
        return function () {
          console.log(this.name)
        }
      }
    }
    var obj2 = {
      name: 'obj2'
    }
    obj1.foo1.call(obj2)() // 'obj2' 'obj2'
    // 第一层为普通函数，并且通过.call改变了this指向为obj2，所以会打印出obj2，第二层为箭头函数，它的this和外层作用域中的this相同，因此也是obj2。
    obj1.foo1().call(obj2) // 'obj1' 'obj1'
    // obj1.foo().call(obj2)第一层打印出obj1，第二层为箭头函数，使用了.call想要修改this的指向，但是并不能成功，因此.call(obj2)对箭头函数无效，还是打印出obj1。
    obj1.foo2.call(obj2)() // 'window' 'window'
    // obj1.foo2.call(obj2)()第一层为箭头函数，并且想要通过.call(obj2)改变this指向，但是无效，且它的外层作用域是window，所以会打印出window，第二层为普通函数，this是最后调用者window，所以也会打印出window。
    obj1.foo2().call(obj2) // 'window' 'obj2'
    // obj1.foo2().call(obj2)第一层为箭头函数，外层作用域是window，打印出window，第二层为普通函数，且使用了.call(obj2)来改变this指向，所以打印出了obj2。
  ```
