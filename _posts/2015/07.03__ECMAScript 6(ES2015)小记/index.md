---
title: "ECMAScript 6(ES2015)小记"
createtime: "2015-07-03"
description: "ES6的学习笔记"
category: ["前端技术"]
keywords: ["js"]
cover: ""
---

这是下一代的js，语法更类似于python，还没有得到浏览器的广泛支持，想先用的话可以使用[bable](https://babeljs.io/)编译，本文部分翻译自[https://babeljs.io/docs/learn-es2015/](https://babeljs.io/docs/learn-es2015/)，原文章在[这里](https://github.com/lukehoban/es6features#readme)，觉得有用的话可以去给他加个星。

## Arrows 箭头
function的缩写，左边是入参，右边是函数体，与function不同的是`this`指的是包围它的代码域。
``` javascript
    // Expression bodies
    var odds = evens.map(v => v + 1);
    var nums = evens.map((v, i) => v + i);

    // Statement bodies
    nums.forEach(v => {
        if (v % 5 === 0)
        fives.push(v);
    });

    // Lexical this
    var bob = {
        _name: "Bob",
        _friends: [],
        printFriends() {
            this._friends.forEach(f =>
            console.log(this._name + " knows " + f));
        }
    }
```

## Classes 类
简化了原型继承，支持prototype-based inheritance, super calls, instance, static methods和constructors.
``` javascript
    class SkinnedMesh extends THREE.Mesh {
      constructor(geometry, materials) {
        super(geometry, materials);
    
        this.idMatrix = SkinnedMesh.defaultMatrix();
        this.bones = [];
        this.boneMatrices = [];
        //...
      }
      update(camera) {
        //...
        super.update();
      }
      static defaultMatrix() {
        return new THREE.Matrix4();
      }
    }
```
## Object语法增强
对object的语法做了一些修改，简化了属性和方法的写法，可以使用super来表示本身，支持动态获取属性值。
``` javascript
    var obj = {
        // __proto__
        __proto__: theProtoObj,
        // Shorthand for ‘handler: handler’
        handler,
        // Methods
        toString() {
         // Super calls
         return "d " + super.toString();
        },
        // Computed (dynamic) property names
        [ "prop_" + (() => 42)() ]: 42
    };
```
## Template String 模版字符串
支持多行编写及变量动态引入。
``` javascript
    // Basic literal string creation
    `In ES5 "\n" is a line-feed.`
    
    // Multiline strings
    `In ES5 this is
     not legal.`
    
    // Interpolate variable bindings
    var name = "Bob", time = "today";
    `Hello ${name}, how are you ${time}?`
    
    // Construct an HTTP request prefix is used to interpret the replacements and construction
    GET`http://foo.org/bar?a=${a}&b=${b}
        Content-Type: application/json
        X-Credentials: ${credentials}
        { "foo": ${foo},
          "bar": ${bar}}`(myOnReadyStateChangeHandler);
```
## Destructuring 解构
新增了一些数组，对象的模版映射
``` javascript
    // list matching
    var [a, , b] = [1,2,3];
    
    // object matching
    var { op: a, lhs: { op: b }, rhs: c }
           = getASTNode()
    
    // object matching shorthand
    // binds `op`, `lhs` and `rhs` in scope
    var {op, lhs, rhs} = getASTNode()
    
    // Can be used in parameter position
    function g({name: x}) {
      console.log(x);
    }
    g({name: 5})
    
    // Fail-soft destructuring
    var [a] = [];
    a === undefined;
    
    // Fail-soft destructuring with defaults
    var [a = 1] = [];
    a === 1;
```
### Default + Rest + Spread
入餐支持默认值及剩余值，`...`后面的是一个数组
``` javascript
    function f(x, y=12) {
      // y is 12 if not passed (or passed as undefined)
      return x + y;
    }
    f(3) == 15
    
    function f(x, ...y) {
      // y is an Array
      return x * y.length;
    }
    f(3, "hello", true) == 6
    
    function f(x, y, z) {
      return x + y + z;
    }
    // Pass each elem of array as argument
    f(...[1,2,3]) == 6
```
## Let + Const
``` javascript
    function f() {
      {
        let x;
        {
          // okay, block scoped name
          const x = "sneaky";
          // error, const
          x = "foo";
        }
        // error, already declared in block
        let x = "inner";
      }
    }
```
## 迭代器
感觉用了比不用还麻烦的一个东西，需要`Symbol.iterator`.
``` javascript
    let fibonacci = {
      [Symbol.iterator]() {
        let pre = 0, cur = 1;
        return {
          next() {
            [pre, cur] = [cur, pre + cur];
            return { done: false, value: cur }
          }
        }
      }
    }
    
    for (var n of fibonacci) {
      // truncate the sequence at 1000
      if (n > 1000)
        break;
      console.log(n);
    }
```
## 生成器
用`function*`定义的函数返回一个生成器实例，用`yield`返回一个值
``` javascript
    var fibonacci = {
      [Symbol.iterator]: function*() {
        var pre = 0, cur = 1;
        for (;;) {
          var temp = pre;
          pre = cur;
          cur += temp;
          yield cur;
        }
      }
    }
```
## 对unicode有更多支持
``` javascript
    // same as ES5.1
    "𠮷".length == 2
    
    // new RegExp behaviour, opt-in ‘u’
    "𠮷".match(/./u)[0].length == 2
    
    // new form
    "\u{20BB7}" == "𠮷" == "\uD842\uDFB7"
    
    // new String ops
    "𠮷".codePointAt(0) == 0x20BB7
    
    // for-of iterates code points
    for(var c of "𠮷") {
      console.log(c);
    }
```
## Modules
让js支持模块引用`export default`和`export *`
``` javascript
    // lib/math.js
    export function sum(x, y) {
        return x + y;
    }
    export var pi = 3.141593;

    import * as math from "lib/math";
    import {sum, pi} from "lib/math";
```

