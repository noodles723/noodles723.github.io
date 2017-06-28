---
category: ["android", "客户端"]
keywords: ["kotlin"]
---

入门上手教程，记录下我的kotlin学习过程

<!-- more -->

## 写在前面
所以又一个新语言。。。。

2017年google io上介绍的新语言，类似安卓界的swift。从[官网](https://kotlinlang.org/docs/reference/)的介绍上看它可以用于写后台，也可以用于写安卓的客户端，还可以直接编译成JavaScript，功能挺全的。

目前要想使用它需要先安装[Android Studio 3.0 Preview](https://developer.android.com/studio/preview/index.html)，觉得麻烦只是想先试一试的话，也可以直接使用[在线IDE](https://try.kotlinlang.org/#/Examples/Hello,%20world!/Simplest%20version/Simplest%20version.kt)。

我主要是想用它写安卓客户端，所以以下的所有也都是focus在这个点上。

## 基本语法
学所有新语言都绕不开这步~~

### 定义包
```java
package my.demo             // 不用强制对应文件夹名
import java.util.*
```

### 函数定义
```java
fun sum(a: Int, b: Int): Int {      // 基本型，和golang很类似
    return a+b
}

fun sum(a: Int, b: Int) = a + b         // 类似于js的箭头函数，a+b是返回值

fun printSum(a: Int, b: Int): Unit {            // Unit相当于c中的void，即返回值为空，可以省略
    println("sum of $a and $b is $(a +b )")     // 类似es6可以用字符串内匹配
}

```

### 局部变量
`var`定义变量，`val`定义只读变量，类似`const`。
```java
fun main(args: Array<String>) {
    val a: Int = 1
    val b = 2
    val c: Int
}
```

### 条件语句
`kotlin`里的`if`, `else`可以简写

```java
fun maxOf(a: Int, b: Int) = if (a>b) a else b
```

`if`里可以进行类型检查
```java
fun getStringLength(obj: Any): Int? {
    if (obj !is String) return null
    return obj.length
}
```

### 循环语句
```java
val items = listOf("apple", "banana", "kiwi")
for (item in items) {
    println(item)
}

for (index in items.indices) {
    prinln("item at $index is ${items[index]}")
}

val index = 0
while (index < items.size) {                            
    println("item at $index is ${items[index]}")
    index++
}

fun describe(obj: Any): String =            // 没见过，感觉有点像switch case
when (obj) {
    1           -> "One"
    "Hello"     -> "Greeting"
    is Long     -> "Long"
    !is Long    -> "Not a string"
    else        -> "Unknown"
}

when {
    "origin" in items -> println("juicy")
    "apple" in items  -> println("apple is fine too")  
}

val x = 10
val y = 9
if (x in 1..y+1) {
    println("fits in range")
}
if(x !in 0..items.lastIndex) {
    println("x is out of range")
}

// 设置step，一次加2
for (x in 9 downTo 0 step 3) {
    print(x)        // print 9630
}

// list有一些好用的lambda函数
items
    .filter { it.startsWith("a") }
    .sortedBy { it }
    .map { it.toUpperCase() }
    .forEach { println(it) }
```

### 类
`kotlin`里有各种类。。。类的初始化直接括号即可，不需要`new`
```java
// 一般类
class Customer(name: String) {
    val custoerKey = name.toUpperCase()
    init {
        logger.info("customer initialized with value ${name}")
    }

    private fun foo() = object {
        val x: String = "x"
    }

    fun publicFoo() = object {
        val x: String = "x"
    }

    fun bar() {
        val x1 = foo().x        // Works
        val x2 = publicFoo().x  // ERROR: Unresolved reference 'x'
    }
}

// 数据类，专用来存放数据，有点像结构体
data class User(val name: String = "", val age: Int = 0)

// 枚举类
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF)
}

// 直接定义对象
val adHoc = object {
    var x: Int = 0
    var y: Int = 0
}
```
