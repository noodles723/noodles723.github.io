---
title: "一些js面向对象相关"
createtime: "2015-05-22"
description: "关于js的一些类，模块和闭包的用法"
category: ["前端技术"]
keywords: ["js"]
cover: ""
---

<span class="dropcap">关</span>于js的一些类，模块和闭包的用法，觉得比较有用，纪录一下
### 闭包和模块
#### 匿名闭包 anonymous closures

创建一个匿名函数然后立即执行，即生成了一个闭包，函数里所有代码的作用域不会超出这个闭包。

``` javascript
(function (){
	// 私有域
}());
```
#### 全局引入 global import

当碰到一个变量名时，解释器会顺着作用域链去找它的`var`定义，如果没有找到，则默认是`global`的。

可将全局变量以入参的形式引入到匿名函数中。

```javascript
(function($, YAHOO){
	// now have access to globals jQuery as $ and YAHOO in this code
}(jQuery, YAHOO));
```

#### 模块导出 module export
用匿名函数的返回值来定义模块

``` javascript
var MODULE = (function(){
	var my = {},
	       privateVariable = 1;

	function privateMethod() {
	    // ...
	}

	my.moduleProperty = 1;
	my.moduleMethod = function () {
	    // ...
	};

	return my;
}());
```
#### Augmentation
用先导入，然后增加属性，再导出的方法来拓展模块(`augment modules`)

``` javascript
var MODULE = (function (my){
	my.anotherMethod = function(){
	    // add method ...
	};

	return my;
}(MODULE));
```
#### Loose Augmentation
上述方法得保证MODULE有一个初始值，可用以下方法改进：

``` javascript
var MODULE = (function(my){
	// add capabilities ...

	    return my;
}(MODULE || {}));
```
### 面向对象
#### 关于new和Object.create
一般用`new`使构造函数实例化，例如：
```javascript
var Vehicle = function Vehicle(){
    // ...
}
var vehicle = new Vehicle();
```
当`new Vehicle()`被执行时发生了以下四件事：
1. `var vehicle = function(){}`新建一个对象
2. `vehicle.constructor = Vehicle`设置构造函数
3. `vehicle.__proto__ = Vehicle.prototype`设置原型对象
4. `Vehicle.call(vehicle)`在vehicle的作用域内运行Vehicle()

**__proto__**是一个仅存在于实例与原型间的指针

`Object.create`主要是想借助已有的对象创建新对象，同时不必因此创建自定义类型
```javascript
Object.create = function(o) {
    function F(){}
    F.prototype = o;
    return new F();
};
```
#### 有关继承
组合继承，也叫经典继承
```javascript
function Super(name) {
    this.name = name;
    this.color = 'red';
}
Super.prototype.say = function(){
    alert(this.name);
};
function Sub(name, age) {
    Super.call(this, name); //继承属性
    this.age = age;
}
Sub.prototype = new Super(); //继承方法
var instance = new Sub('wang', 23); //实例化
```
则`instance`里有`name,age,color`私有变量，也可以调用公共函数`say`
但是`Sub.prototype`里也会继承到变量`name`和`color`且没什么用，在instance实例化的时候被覆盖了，不过可以用寄生组合式继承来解决这个冗余。
想法是原型继承原型，变量继承变量。
```javascript
function inheritPrototype(Sub, Super) {
    var proto = Object.create(Super.prototype); //继承原型
    proto.constructor = Sub;
    Sub.prototype = proto;
}
function Super(name) {
    this.name = name;
    this.color = 'red';
}
Super.prototype.say = function(){
    alert(this.name);
};
function Sub(name, age) {
    Super.call(this, name); //继承属性
    this.age = age;
}
inheritPrototype(Sub, Super);
var instance = new Sub('wang', 23); //实例化
```

### 函数表达式
#### 递归
一个阶乘函数一般写法为
```javascript
function factorial(num) {
    if (num <= 1)
        return 1;
    else
        return num * factorial(num - 1);
}
```
当factorial被无意中改动时很容易出错，可将最后的`factorial(num-1)`改为`arguments.callee(num-1)`确保正确调用，但在严格模式下`arguments.callee`不能被访问，所以最优写法应该是：
```javascript
var factorial = (function f(num) {
    if (num <= 1)
        return 1;
    else
        return num * f(num - 1);
});
```
#### 闭包的一些注意点
*闭包*是指有权访问另一个函数作用域中的变量的函数
由于闭包所保存的是整个变量对象，所以只能取得变量的最后一个值，当变量为循环对象时需注意

闭包有可能造成内存泄漏
```javascript
function assignHandler(){
    var element = document.getElementById(someid);
    element.onclick = function(){
        alert(element.id);
    };
}
```
则`element`一直在被onclick引用，内存不会被回收，应改为：
```javascript
function assignHandler(){
    var element = document.getElementById(someid);
    var id = element.id;
    element.onclick = function() {
        alert(id);
    };
    element = null;
}
```
