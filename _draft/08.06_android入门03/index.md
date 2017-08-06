---
category: ["android", "客户端"]
keywords: ["kotlin", "android"]
---

有关activity

<!-- more -->
# activities
可以简单理解为controllers，activities是由一个栈控制的，后进先出，每次只有一个activity处于激活状态，其他栈里的都是停止状态。

activity是由intent激活的，intent是一些异步消息，可以理解为events，可以激活并在activity中间传递信息。

新建一个activity，在app文件夹下单击右键，选`new>Activity>Empty Activity`，勾上`Generate Layout File`点确定。

打开`AndroidManifest.xml`给第二个activity加几个属性：
```xml
<activity android:name=".Main2Activity"
    android:label="@string/activity2_name"
    android:parentActivityName=".MainActivity"> //api > 16时才有这个属性
    <meta-data // 作用等同于android:parentActivityName，兼容低版本
        android:name="android.support.PARENT_ACTIVITY"
        android:value="com.example.admin.myapplication.MainActivity" />
</activity>
```

# 一个简单的两个页面通信
两个页面的layout如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    tools:context="com.example.admin.myapplication.MainActivity">


    <Button
        android:id="@+id/button_main"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/button_main"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:onClick="launchSecondActivity"
        />

    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/editText_main"
        android:layout_toLeftOf="@+id/button_main"
        android:layout_toStartOf="@+id/button_main"
        android:layout_alignParentBottom="true"
        android:hint="@string/editText_main"
        />    
</RelativeLayout>
```
第二个页面：
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context="com.example.admin.myapplication.Main2Activity">

    <TextView
        android:id="@+id/text_header"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/text_header"
        android:textAppearance="?android:attr/textAppearanceMedium"
        android:textStyle="bold"
        />
    <TextView
        android:id="@+id/text_message"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/text_header"
        android:layout_marginLeft="@dimen/activity_horizontal_margin"
        android:layout_marginStart="@dimen/activity_horizontal_margin"
        android:textAppearance="?android:attr/textAppearanceMedium" />

</RelativeLayout>
```

在第一个activity里添加intent去调第二个activity：
```kotlin
package com.example.admin.myapplication

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.util.Log
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    val LOG_TAG = MainActivity::class.java.simpleName

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun launchSecondActivity(view: View) {
        val message = editText_main.text.toString()
        Log.d(LOG_TAG, message)
        val intent: Intent = Intent(this, Main2Activity::class.java)
        intent.putExtra(EXTRA_MESSAGE, message)
        startActivityForResult(intent, 1) // 监听返回值
    }
}
```
在第二个activity里由intent的extra message去获取值来显示
```xml
class Main2Activity : AppCompatActivity() {
    val EXTRA_REPLY = "com.example.android.twoactivities.extra.REPLY";

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main2)

        val intent: Intent = getIntent()
        val message = intent.getStringExtra(MainActivity().EXTRA_MESSAGE)
        text_message.text = message
    }

    fun returnReply(view: View) {
       val reply = "reply string";

       val replyIntent = new Intent();
       replyIntent.putExtra(EXTRA_REPLY, reply);
       setResult(RESULT_OK, replyIntent);
       finish(); // 返回上一层
   }
}
```

# activity的生命周期

![](https://google-developer-training.gitbooks.io/android-developer-fundamentals-course-practicals/content/images/2_2_P_images/basic_lifecycle.png)

生命周期中会触发的回调函数：
- onPause()
- onRestart()
- onResume()
- onStop()
- onDestroy()
- onSaveInstanceState()

# implicit intents









