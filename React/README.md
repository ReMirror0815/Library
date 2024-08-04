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
    - [setState 是同步还是异步](#setstate-是同步还是异步)
  - [React虚拟dom](#react虚拟dom)
  - [Reactdiff算法](#reactdiff算法)
  - [React合成事件](#react合成事件)
  - [受控组建/非受控组件](#受控组建非受控组件)
  - [组件通讯](#组件通讯)
    - [父组件向子组件通讯](#父组件向子组件通讯)
    - [子组件向父组件通讯](#子组件向父组件通讯)
    - [复杂点的通讯](#复杂点的通讯)
  - [Redux](#redux)
  - [Mobx observable观察者设计模式](#mobx-observable观察者设计模式)
  - [其他主流状态管理](#其他主流状态管理)
    - [Dva](#dva)
    - [mobx](#mobx)
    - [Zustand](#zustand)
    - [Jotai（推荐使用/了解）](#jotai推荐使用了解)
  - [纯函数/函数组件/高阶组件](#纯函数函数组件高阶组件)
    - [高阶组件](#高阶组件)
    - [纯函数](#纯函数)
  - [服务端渲染](#服务端渲染)
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
 ![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image1.png)
- 版本更新之后
 ![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image2.png)

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
  - 在代码中调用 setState 之后，React 会将传入的参数对象与组件当前的状态合并，触发所谓的调和过程（Reconciliation）。
  - 经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。
  - 在 React 得到元素树之后，React 会自动计算新树和老树之间的节点差异，然后根据差异对界面进行最小化重新渲染。
  - 在差异计算算法（Diff）中，React 能够相对精确地知道哪些位置发生了改变以及英国如何改变，保证了按需更新，而不是全部重新渲染。
  总结：
    1. 合并参数对象，触发调和过程
    2. 计算新树和老树差异（Diff）
    3. 根据差异进行最小化重新渲染

#### setState 是同步还是异步
  - setState 在合成事件和钩子函数中是异步的，在原生事件和 setTimeout 是同步的。
  - setState 的异步，并不是说内部由异步代码实现，它本身执行的过程和代码是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，从而形成了所谓的异步。
  - setState 可以通过第二个参数 setState(partialState, callback)，在回调方法中拿到更新后的结果。


### React虚拟dom
  > 虚拟dom.md

### Reactdiff算法
  > diff算法.md


### React合成事件
  > 合成事件.md
  > React合成事件是指将原生事件合成一个React事件，之所以要封装自己的一套事件机制，目的是为了实现全浏览器的一致性，抹平不同浏览器之间的差异性。比如原生onclick事件对应React中的onClick合成事件。

  ![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image9.png)

  如上图所示，所谓事件流包括三个阶段：事件捕获、目标阶段和事件冒泡。事件捕获是从外到里，对应图中的红色箭头标注部分window -> document -> html ... -> target，目标阶段是事件真正发生并处理的阶段，事件冒泡是从里到外，对应图中的target -> ... -> html -> document -> window。

  之前多版本并存的主要问题在于React 事件系统默认的委托机制，出于性能考虑，React 只会给document挂上事件监听，DOM 事件触发后冒泡到document，React 找到对应的组件，造一个 React 事件出来，并按组件树模拟一遍事件冒泡（此时原生 DOM 事件早已冒出document了）

![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image10.png)

因此，不同版本的 React 组件嵌套使用时，e.stopPropagation()无法正常工作（两个不同版本的事件系统是独立的，都到document已经太晚了）

而React17解决了这个问题，React 17 不再往document上挂事件委托，而是挂到 DOM 容器上

![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image11.png)

![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image10.png)


另一方面，将事件系统从document缩回来，也让 React 更容易与其它技术栈共存（至少在事件机制上少了一些差异）



### 受控组建/非受控组件
  - 具体来说这是一种 React 非受控组件，其状态是在 input 的 React 内部控制，不受调用者控制。
  - 所以受控组件就是可以被 React 状态控制的组件。双向数据绑定就是受控组件，你可以为 form 中某个输入框添加 value 属性，然后控制它的一个改变。而非受控组件就是没有添加 value 属性的组件，你并不能对它的固定值进行操作。


### 组件通讯

#### 父组件向子组件通讯
  父组件向子组件通讯：父组件向子组件传 props 方式，向子组件进行通讯。

#### 子组件向父组件通讯
  子组件向父组件通讯：父组件在 props 中传递方法，然后子组件调用这个方法，将自身需要传递的信息，传递到父组件的作用域中。

#### 复杂点的通讯
    复杂点的通讯：借助 React 的 Context，或者 Redux 进行数据通讯。


### Redux
  > 事例
```
- 某个页面文件夹
   - View.jsx     当前页面主入口
   - Child.jsx    子组件
   - Brother.jsx  兄弟组件
   - action.js    动作
   - types.js     类型
   - saga.js      调用接口
   - reducers.js  处理数据
```

正常的一个工作目录如上所示，我们工作中是怎么个使用方式呢？

 - 首先，在 View.jsx 中通过 React-Redux 连接 React 和 Redux

 - 然后，假设现在 Child.jsx 需要调用接口（异步处理），那么会：
    1. 在 action.js 中定义这个方法，会传递什么参数。
    2. 其中 types.js 是辅助 action.js 的一个内容，为了防止方法体的重复，我们会在 types.js 中定义大写的 action 名字。
    3. 这时候就可以在 View.jsx 中通过 dispatch 触发方法，例如 dispatch(getPage(page, perPage))。
    4. 这时候，在 reducers.js 中和 sage.js 中都能监听到这个方法，但是我们是在 sage.js 中调用接口并处理数据。
    5. 处理完毕之后，再将 sage.js 中的传递给 reducers.js 中，让它去处理数据。
- 接着，如果 Brother.jsx 只是单纯地想处理数据并在 Child.jsx 中使用，那么我们处理方式是跟上面一样的，只是直接在 reducers.js 中处理，而不需要再在 sage.js 中调用接口而已。
- 最后，我们再看看 redux 和 react-reduxt 的工作流程加深印象：

redux 和 react-redux 的工作流程:

redux:

![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image3.png)

react-reduxt:

![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image4.png)


总结：redux就是一个状态管理工具，他有一个store，你可以理解是一个容器，通过**createstore**来创建**store**，在**store**下面定义**state**，state的改变直接影响到view的改变，但是在view曾，用户是没办法直接接触到state的，所有需要一个**action**，通过**actioncreate**来创建一个action，创建aciton的唯一方法就是store.dispatch，这个store.dispatch接受一个type和新的state，创建完action之后，通过**Reducer**来修改state，Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 **Reducer**。Reducer 它接受 Action 和当前 State 作为参数，返回一个新的 State。等state更新之后，store通知view，state发生了改变，view层重新获取state

### Mobx observable观察者设计模式
MobX 的一些核心原则包括：

- 可能有多个 store 来存储应用程序的状态
- 整个应用程序的状态存储在单个对象树中
- 任何一段代码中的动作都可以改变应用程序的状态
- 当状态改变时，状态的所有派生都会自动和原子地更新

![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image5.png)

优点
![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image6.png)

工作流程
![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image7.png)

> 「首先从左往右看，事件触发了 Actions，Actions 作为唯一修改 State 的方式，修改了 State，State 的修改更新了计算值 Computed，计算值的改变引起了 Reactions 的改变，导致了 UI 的改变(re-render)，Reactions 可以经过事件调用 Actions。」

几个概念
  - Observable state(可观察的状态)
  - Computed values(计算值)
  - Reactions(反应)
  - Actions(动作)


### 其他主流状态管理
> React 的外部状态管理库一直以来是 React 生态中非常内卷的一个领域。目前比较常见的状态管理库有 Redux（包括基于 Redux 的 Dva、Icestore）、Mobx、Zustand、Recoil、Jotai、Valtio、Hox 等

Class 时代中 Redux 和 Mobx 都是非常优秀的状态库。随着 Hooks 时代的到来，状态管理的心智模型也逐步发生着演变(react 18 不太好兼容mobx)

Redux，设计理念是状态 「自上而下」流动。它「倾向于在组件树的顶端吸走所有的状态」。状态被维护在组件树的高处，下面的组件通过选择器拉取他们需要的状态。一种「自下而上」的观点对构建具有组合模式的应用具有很好的指导作用

通过 hook，我们可以从具有巨大全局存储的「单体状态管理」转变为向自下而上的 「微状态管理」，通过hook消费更小的状态片。

所以因为这个hook的到来，redux下载量逐渐减少。

#### Dva
> dva 首先是一个基于 redux和 redux-saga的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router和 fetch，所以也可以理解为一个轻量级的应用框架。
Dva 的特点：
  - 易学易用，仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API
  - elm 概念，通过 reducers, effects 和 subscriptions 组织 model
  - 插件机制，比如 dva-loading可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
  - 支持 HMR，基于 babel-plugin-dva-hmr实现 components、routes 和 models 的 HMR

#### mobx
> React 和 MobX 是一对强力组合。React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而MobX提供机制来存储和更新应用状态供 React 使用。

> 对于应用开发中的常见问题，React 和 MobX 都提供了最优和独特的解决方案。React 提供了优化UI渲染的机制， 这种机制就是通过使用虚拟DOM来减少昂贵的DOM变化的数量。MobX 提供了优化应用状态与 React 组件同步的机制，这种机制就是使用响应式虚拟依赖状态图表，它只有在真正需要的时候才更新并且永远保持是最新的。

Mobx的心智模型和react很像，它区分了应用程序的三个概念：

- State(状态)
- Actions(动作)
- Derivations(派生)

首先创建可观察的状态（Observable State），通过Action更新State，然后自动更新所有的派生（Derivations）。派生包括Computed value（类似useMemo或useSelector）、副作用函数(类似useEffect)和UI（render）。

![图片](https://github.com/ReMirror0815/Library/blob/master/React/images/image8.png)


使用反react的数据流模式，注定会有成本：

1. Mobx的响应式脱离了react自身的生命周期，就不得不显式声明其派生的作用时机和范围。比如副作用触发需要在useEffect里再跑一个autorun/reaction，要给DOM render包一层useObserver/Observer，都加大了开发成本。
2. Mobx会在组件挂载时收集依赖，和state建立联系，这个方式在即将到来的react 18的并发模式（Concurrent Mode）中，可能无法平滑地迁移。为此，react专门开发了create-subscription方法用于在组件中订阅外部源，但是实际的应用效果还未可知。


#### Zustand
zustand 是一个轻量级状态管理库，和 redux 一样都是基于不可变状态模型和单向数据流的，状态对象 state 不可被修改，只能被替换。渲染优化要手动通过 selectors 进行。

- Zustand vs Redux
  - zustand 和 redux 是非常像的，都基于不可变状态模型，都基于单向数据流。
  - redux 需要应用被 Context Provider 包裹，zustand 则不需要。
  - 二者更新数据的方式不同，redux 基于 reducers，更新状态的 reducers 是严格的方法，这就使得状态更加可预测。zustand 不使用 reducers 而是通过更灵活的方法来更新状态。

- zustand 的特点：
  1. 轻量级；
  2. 中心化，单一 store；
  3. 不可变状态模型；
  4. 不固执。很少限制，非常开放。



#### Jotai（推荐使用/了解）
jotai 是一个小型全局状态管理库，它模仿了 useState、useReducer。jotai 有个叫做 atom 的概念，用于表示小的状态片段。和 zustand 不同的是，他是一个组件级别的状态管理库。和 zustand 相同的是同样都基于不可变状态模型。


jotai 是 Context 和订阅机制的结合，是面向 React 的一种全局状态管理库。如果你的需求是一个没有额外重复渲染的 Context，那 jotai 是个不错的选择。


- jotai 有两个特点：
  1. 语法简单
  2. jotai 的状态不是全局状态

atom 可以在 React 组件的生命周期里创建和销毁。这通过多个 Context 是无法实现的，因为使用 Context 增加一个新的 state 意味着增加一个新的 Provider 组件，如果新增一个组件，它所有的子组件都会被重新挂载，会失去所有状态。

- 衍生 atom
  1. atom 可以像积木一样被组合，生成新的 atom，从而实现复杂逻辑。
  2. jotai 通过 atom 之间的依赖来实现自动渲染优化。
  3. 推荐场景：组件为中心的应用。

- Recoil vs Jotai
jotai 深受 recoil 启发，设计理念基本相同。但有以下不同：
- 最大的不同是是否需要键字符串，开发 jotai 的一大动力就是要省略键字符串。因为键属性必须是唯一的，键命名是一项艰巨的任务；
- jotai 不需要使用 Provider 包裹组件，这对开发者来说可以大幅降低开发成本和心理负担。

- Zustand vs Jotai
  1. Zustand 是单一 store，Jotai 由原子 atom 组合而成；
  2. Zustand 的 store 存储在 React 外部，Jotai 的 store 存储在 React 内部。


### 纯函数/函数组件/高阶组件

#### 高阶组件
  > 高阶组件.md(Hoc)

#### 纯函数
  > 定义(Pure Function)：一个函数的返回结果只依赖于它的参数，并且在执行的过程中没有副作用，我们就把该函数称作纯函数。

- 特点
  1. 函数的返回结果只依赖于它的参数。
  2. 函数执行过程里面没有副作用。 
    - 什么是副作用
    - 除了修改外部的变量，一个函数在执行过程中还有很多方式产生外部可观察的变化，比如说调用 DOM API 修改页面，或者你发送了 Ajax 请求，还有调用 window.reload 刷新浏览器，甚至是 console.log 往控制台打印数据也是副作用。
  3. 没有额外的状态依赖
    - 指方法内的状态都只在方法的生命周期内存活，这意味着不能在方法内使用共享变量，因为会带来不可知因素。
  4. 为什么需要纯函数？
    - 因为纯函数非常“靠谱”，执行一个纯函数你不用担心它会干什么坏事，它不会产生不可预料的行为，也不会对外部产生影响。不管何时何地，你给它什么它就会乖乖地吐出什么。如果你的应用程序大多数函数都是由纯函数组成，那么你的程序测试、调试起来会非常方便。

- 函数组件
  - 函数组件只有当展示视图的时候才用。做复杂的数据处理、需要有自己的状态的时候，需要用类组件。
- 函数组件的缺点：
  - 无状态组件
  - 函数组件只能实现非常简单的渲染功能。只是进行页面的展示和数据的渲染。没有逻辑的处理。也就是组件的内部是没有自己的数据和状态的。它是无状态组件。
  - 无状态组件的使用时机是当且仅当数据展示、不需要逻辑处理的时候来使用。
  - 没有this
  - 没有生命周期
  - 函数组件内部也没有生命周期。


### 服务端渲染
  > [博客参考](https://blog.csdn.net/halations/article/details/108368240?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522172274106016800182720210%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=172274106016800182720210&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-5-108368240-null-null.nonecase&utm_term=%E6%9C%8D%E5%8A%A1&spm=1018.2226.3001.4450)


总结来说：
  - 采用React15的render在服务端渲染的时候如果服务器端与客户端节点不一致，服务器端的节点将完全被废弃掉重新渲染并采用客户端的节点。
  - 采用React16的render在服务端渲染的时候如果服务器端与客户端节点不一致，仅仅是尝试修改不匹配的HTML子树，而不是修改整个HTML树，同时官方给予警告：render() 对服务端渲染容器进行 hydrate 操作的方式已经被废弃，并且会在 React 17 被移除。作为替代，请使用 hydrate()。
  - 这种变化对用户不会有影响，调用render()/hydrate()时React 16不会修改SSR生成的不匹配HTML。这一项性能优化意味着你需要额外确保修复在开发模式下的所有警告。
  - 采用React16的hydrate时，hydrate的策略与render的策略不一样，其并不会对整个dom树做dom patch，其只会对text Content内容做patch

服务端和客户端之间的差异
  - 服务端和客户端的运行环境不一样，所支持的语法也不一样。
  - 服务端无法支持图片、css等资源文件。
  - 服务端缺乏BOM和DOM环境，服务端下无法访问window,navigator等对象。
  - 服务端中所有用户公用一个global环境，客户端每个用户都有自己的global环境。

为什么要服务器端渲染
  - 相比于浏览器端渲染，服务器端渲染的好处是：
    1. 可以缩短“第一有意义渲染时间”
       1. 如果完全依赖于浏览器端渲染，那么服务器端返回的 HTML 就是一个空荡荡的框架和对 JavaScript 的应用，然后浏览器下载 JavaScript，再根据 JavaScript 中的 AJAX 调用获取服务器端数据，再渲染出 DOM 来填充网页内容，总共需要三个 HTTP 或 HTTPS 请求。
       2. 如果使用服务器端渲染，第一个 HTTP/HTTPS 请求返回的 HTML 里就包含可以渲染的内容了，这样用户第一时间就会感觉到“有东西画出来了”，这样的感知性能更好。
    2. 更好的搜索引擎优化（seo优化）


### 进阶篇
  > 查看React进阶篇
