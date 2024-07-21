## 

## 参考文献

## 目录
- [](#)
- [参考文献](#参考文献)
- [目录](#目录)
- [内容](#内容)
  - [React相比原生的好处](#react相比原生的好处)
  - [React和Vue比对](#react和vue比对)
  - [React生命周期](#react生命周期)
    - [生命周期](#生命周期)
    - [挂载阶段](#挂载阶段)
    - [更新阶段](#更新阶段)
    - [卸载阶段](#卸载阶段)
  - [setState](#setstate)
    - [调用setState之后发生了什么](#调用setstate之后发生了什么)
  - [React虚拟dom](#react虚拟dom)
  - [Reactdiff算法](#reactdiff算法)
  - [React合成事件](#react合成事件)
  - [React中this问题](#react中this问题)
  - [受控组建/非受控组件](#受控组建非受控组件)
  - [组件通讯](#组件通讯)
  - [Redux](#redux)
  - [Mobx](#mobx)
  - [纯函数/函数组件/高阶组件](#纯函数函数组件高阶组件)
  - [服务端渲染](#服务端渲染)
  - [基础面试题](#基础面试题)
  - [进阶篇](#进阶篇)

## 内容

### React相比原生的好处
  - 组件化: 其中以 React 的组件化最为彻底，甚至可以到函数级别的原子组件，高度的组件化可以是我们的工程易于维护、易于组合拓展。
  - 天然分层: JQuery 时代的代码大部分情况下是面条代码，耦合严重，现代框架不管是 MVC、MVP 还是 MVVM 模式都能帮助我们进行分层，代码解耦更易于读写。
  - 生态: 现在主流前端框架都自带生态，不管是数据流管理架构还是 UI 库都有成熟的解决方案。
  - 开发效率: 现代前端框架都默认自动更新 DOM，而非我们手动操作，解放了开发者的手动 DOM 成本，提高开发效率，从根本上解决了 UI 与状态同步问题.

### React和Vue比对
  - 相同之处：
    1. 虚拟 DOM。映射真实 DOM，通过新旧 DOM 的 diff 对比，更好的跟踪渲染页面。
    2. 组件化。将应用拆分成一个个功能明确的模块，每个模块之间可以通过合适的方式互相联系。
    3. 构建工具。都有自己的构建工具，通过 Webpack + Babel 去搭建脚手架。
    4. Chrome 开发工具。两者都有很好的 Chrome 扩展去帮助查找 Bug。
    5. 配套框架。Vue 有 Vue-router 和 Vuex，而 React 有 React-router 和 React-Redux。

  - 不同之处
    1. 模板 VS JSX。Vue 推荐编写近似常规 HTML 的模板进行渲染，而 React 推荐 JSX 的书写方式。
    2. 监听数据变化的不同。Vue 使用的是可变数据，而 React 更强调数据的不可变。在 Vue 中通过 v-model 绑定的数据，用户改变输入值后对应的值也相应改变。而 React 需要通过 setState 进行设置变化。
    3. Diff 不同。Vue 通过双向链表实现边对比边更新 DOM，而 React 通过 Diff 队列保存需要更新的 DOM，得到 patch 树，再统一批量更新 DOM。
    4. 开发团队。Vue 一开始核心就是 Evan You，后面再招了其他人组成团队；React 的话是一开始就是 Facebook 团队搞的。所以网上的人比对源码情况的话，Vue 的比 React 的简单易懂点。

### React生命周期
#### 生命周期
- 挂载阶段：constructor、getDerivedStateFromProps、render、componentDidMount
- 更新阶段：getDerivedStateFromProps、shouldComponentUpdate、render、getSnapshotBeforeUpdate、componentDidUpdate
- 卸载阶段：componentWillUnmount
- React 逐渐废弃的生命周期方法：componentWillMount、componentWillReceiveProps、componentWillUpdate
- 版本更新之前
 ![图片](/Users/futurngazer/Desktop/2024面试题汇总/React/images/image1.png)
- 版本更新之后
 ![图片](/Users/futurngazer/Desktop/2024面试题汇总/React/images/image2.png)

 #### 挂载阶段
 - constructor：构造函数，最先被执行，通常在构造函数中初始化 state 对象或者给自定义方法绑定 this
 - getDerivedStateFromProps：static getDerivedStateFromProps(nextProps, prevState)，这是个静态方法，当我们接收到新的属性想去修改我们 state，可以使用 getDerivedStateFromProps。
 - render：render 函数是个纯函数，只返回需要渲染的东西，不应该包含其他的业务逻辑，可以返回原生 DOM、React 组件、Fragment、Portals、字符串和数字等内容。
 - componentDidMount：组件装载之后调用，此时我们可以获取到 DOM 节点并操作，比如对 Canvas、SVG 等操作。服务器请求、订阅都可以写这个里面，但是记得在 componentWillUnmount 中取消订阅。


React 的接口请求是放在 componentDidMount 里面比较合适，旧版本有人放在 componentWillMount 里面，从而导致多次请求，现在 componentWillMount 不推荐使用了，所以转 componentDidMount 就非常科学了。

存在以下问题：
- 为什么 getDerivedStateFromProps 是静态的？
当它设置为静态函数，表明这个函数不能通过 this 访问到 class 的属性，也并不推荐直接访问属性。
- 哪些生命周期可以 setState？
可以在 componentDidMount 和 componentDidUpdate 中使用，此时 DOM 已经稳定下来了，可以进行数据的操作了。


#### 更新阶段
- getDerivedStateFromProps：此方法在更新阶段也会被调用。
- shouldComponentUpdate：shouldComponentUpdate(nextProps, nextState)，有两个参数，表示新的属性和变化之后的 state，返回一个布尔值。如果是 true 表示会触发重新渲染，false 表示不会触发重新渲染，默认返回 true。可以利用这个生命周期来优化 React 程序性能。
- render：同挂载阶段 render。
- getSnapshotBeforeUpdate：getSnapshotBeforeUpdate(prevProps, prevState)，这个方法会在 render 之后，componentDidUpdate 之前调用，有两个参数，表示之前属性和之前的 state。这个函数有一个返回值，会作为第三个参数传给
- componentDidUpdate，如果不需要返回值，可以返回 null，这个方法必须和 componentDidUpdate 配合使用。
- componentDidUpdate：componentDidUpdate(prevProps, prevState, snapshot)，在 getSnapshotBeforeUpdate 之后调用，有三个参数，表示之前的 props，之前的 state，以及 snapshot。参数 snapshot 是 getSnapshotBeforeUpdate 返回的，如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或者计算过程迁移到 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或者更新状态。

#### 卸载阶段
- componentWillUnmount：当组件被卸载或者销毁时会被调用，在这里清除定时器，或者取消网络请求，用来清理无效的 DOM 元素等垃圾回收工作。
 

### setState
> setState 是 React 中用于修改状态，更新视图的方法。
#### 调用setState之后发生了什么


### React虚拟dom


### Reactdiff算法



### React合成事件


### React中this问题


### 受控组建/非受控组件


### 组件通讯


### Redux


### Mobx


### 纯函数/函数组件/高阶组件


### 服务端渲染



### 基础面试题

### 进阶篇
  > 查看React进阶篇
