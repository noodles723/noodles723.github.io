---
title: "记一些typescript相关"
createtime: "2017-03-24"
description: "记一点typescript还不太熟的东西"
category: ["前端语言"]
keywords: ["typescript"]
cover: ""
---
## 基本类型
1. boolean, 例：`let isDone: boolean = false`
2. number
3. string, eg: ```let st: string = `my name is ${ fullName }` ```
4. array, eg: `let list: number[] = [1, 2, 3]`
5. tuple, eg: `let x: [string, number]`
6. enum, eg: `enum Color {Red, Green, Blue}`, 使用时`let c: Color = Color.Gree`
7. any
8. Object
9. void, used in function
10. never, 类似断言

强制类型转换：`(<string>someValue).length`或`(someValue as string).length`

## 定义变量及函数
*let*的一些使用
```typescript
let [first, ...rest] = [1, 2, 3, 4]; // first = 1, rest = [2,3,4]
let { a, ...passthrough } = o; //将o的属性赋给a, passthrough

let { a: newName1, b: newName2 } = o; // 等同于
let newName1 = o.a;
let newName2 = o.b;
```
函数默认值
```typescript
function f({ a, b = 0 } = { a: "" }): void {}
```
*array*和 *object*的属性拓展
```typescript
let bothPlus = [0, ...first, ...second, 5];
let search = { ...defaults, food: "rich" };
```
定义函数接口
```typescript
interface LabelledValue {
    label: string;
    color?: string;     // ?表示optional
    readonly y: number; // 只读 不可在函数内做修改
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}
```
一般变量用*const*, 属性用*readonly*

## 类class
基本定义
```typescript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```
继承时直接用*super*引用
```typescript
class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}
let sam = new Snake("Sammy the Python");
```
类里定义为*readonly*的属性必须有初始值或在constructor里赋值
用*static*声明的属性可直接被类取到
```typescript
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}
```
可用*abstract*去定义一个基类，函数可只做个定义，但必须在子类里实现
```typescript
abstract class Animal {
    abstract makeSound(): void; // 只定义
    move(): void {
        console.log("roaming the earth...");
    }
}
```

## 函数
类型定义`let myAdd: (x: number, y: number)=>number`
括号函数：
```typescript
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    createCardPicker: function(this: Deck) {// 这里不能省
        return () => {
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit: this.suits[pickedSuit]};      // 这样的this可直接指向Deck
        }
    }
}
```

## 生成器generics
T可保证类型的准确性
```typescript
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

## 枚举
```typescript
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
```

## Iterators and Generators
```
let list = [4, 5, 6];
for (let i in list) {
   console.log(i); // "0", "1", "2",
}
for (let i of list) {
   console.log(i); // "4", "5", "6"
}
```

## Modules
如果只export一个单独的类或函数, 用export default
```
export default function getThing() { return "thing"; }
export default class SomeType {
  constructor() { ... }
}

import t from "./MyClass";
import f from "./MyFunc";
let x = new t();
console.log(f());
```

如果export多个对象
```
export class SomeType { /* ... */ }
export function someFunc() { /* ... */ }

import { SomeType, someFunc } from "./MyThings";
let x = new SomeType();
let y = someFunc();
```

如果需要import大量的类，用namespace的形式
```
export class Dog { ... }
export class Cat { ... }
export class Tree { ... }
export class Flower { ... }

import * as myLargeModule from "./MyLargeModule.ts";
let x = new myLargeModule.Dog();
```

## 其他
关于装饰器的东西打算单独再开一篇了。。。