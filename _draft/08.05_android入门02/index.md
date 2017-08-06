---
category: ["android", "客户端"]
keywords: ["kotlin", "android"]
---

写第一个交互式UI

<!-- more -->
# layout
打开`res/layout/activity_main.xml`，切换下方的`Design`到`Text`打开xml文件。
它默认是一个`ConstraintLayout`我们可以先把它改成一个`LinearLayout`，这是最简单，运行速度最快的layout，其实写这个xml和写html很像，做过前端的看看就懂了。

一个`LinearLayout`里有两个按钮，一行文本的xml长这样：
``` xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    // width, height的可选值有：
    // match_parent - 同父节点
    // wrap_content - 刚好包住子结点
    // 24dp - 绝对像素值
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"  // or horizontal
    tools:context="com.example.catteria.study.MainActivity">

    <Button
        android:id="@+id/button_toast"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Toast" />

    <TextView
        android:id="@+id/show_count"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="0" />

    <Button
        android:id="@+id/button_count"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Count" />
</LinearLayout>
```

# string resource
安卓里的静态string推荐写在`strings.xml`里，方便统一管理和多语言拓展。
打开`activity_main.xml`，在`android:text="Count"`的text部分按`alt+enter`选`extracting string resource`，然后自己编辑一个id点ok， 就自动在`strings.xml`里生成了相对应的string。

现在`res/values/strings.xml`应该长这样：
```xml
<resources>
    <string name="app_name">study</string>
    <string name="button_label_toast">Toast</string>
    <string name="count_initial_value">0</string>
    <string name="button_label_count">Count</string>
</resources>
```

其实dimen和color根string类似也可以统一管理，这里略过了。

# gravity
`android:layout_gravity`定义如何与父节点对齐。
`android:layout_weight`类似于`flex`，用于定义布局权重。
`android:gravity`定义元素内部的view相对于自身的对其。

# 点击事件
在button上加上`android:onClick="showToast"`来绑定点击事件。
在`MainActivity.kt`里来定义事件控制函数：
```kotlin
package com.example.catteria.study

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    var mCount: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun countUp(view: View) {
        mCount++
        show_count.text = mCount.toString()     // 直接用id来调用

    }

    fun showToast(view: View) {
        val toast: Toast = Toast.makeText(this, getString(R.string.toast_message), Toast.LENGTH_LONG)   // 显示一个toast
        toast.show()
    }
}
```

















