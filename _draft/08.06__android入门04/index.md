---
category: ["android", "客户端"]
keywords: ["kotlin", "android"]
---

后端通信。

<!-- more -->

# AsyncTask
为了不影响用户体验，一些需要拉取数据的功能一般与主进线程分开，主线程主要处理UI交互，其他的都可以用`AsyncTask`去分一个线程完成。

一个`AsyncTask`会调用如下方法去执行一个后端线程：
- onPreExecute(): 由主线程在调用AsyncTask之前调用，可以执行些预设置，像显示个进度条之类的。
- doInBackground(): 主后台逻辑
- onProgressUpdate(): 通知给主线程的进度信息
- onPostExecute(): 完成后通知主线程

![](https://google-developer-training.gitbooks.io/android-developer-fundamentals-course-practicals/content/images/7_1_P_images/dg_asynctask.png)

一个AsyncTask有三个入参：
- params: 传递给`doInBackground`的参数
- progress: 进度信息的类型
- result: `onPostExecute`的返回类型

```kotlin
class MyAsyncTask : AsyncTask<String, Int, Bitmap>() {}
```

写一个小例子，一个页面有个文本框和一个按钮，点击之后系统随机sleep一段时间，然后在文本框上显示一行字。

先写layout：
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    tools:context="com.example.admin.myapplication.MainActivity">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="I am ready to start work!"
        android:id="@+id/textView1"
        />

    <Button
        android:id="@+id/button_main"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Start Task"
        android:onClick="startTask"
        />

</LinearLayout>
```

写一个`AsyncTask`类：
```kotlin
package com.example.admin.myapplication

import android.os.AsyncTask
import android.widget.TextView
import java.util.*

class SimpleAsyncTask(val tv: TextView) : AsyncTask<Void, Void, String>() {

    override fun doInBackground(vararg params: Void?): String {
        val r = Random()
        val n = r.nextInt(11)
        val s = n*200
        try {
            Thread.sleep(s.toLong())
        } catch(e: InterruptedException) {
            e.printStackTrace()
        }

        return "Awake at last after sleeping for " + s + " milliseconds!"
    }

    override fun onPostExecute(result: String) {
        tv.text = result
    }

}
```

然后在MainActivity里加上`startTask`来启动`AsyncTask`：

```kotlin
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        if(savedInstanceState!=null){
            textView1.text = savedInstanceState.getString("currentText")
        }
    }

    fun startTask(view: View) {
        textView1.text = "Napping... "
        SimpleAsyncTask(textView1).execute()
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putString("currentText", textView1.text.toString())
    }
}
```

注意当AsyncTask在跑的时候，旋转设备会发现`onPostExecute`并没有改变textView的值，那是因为旋转设备时，系统会调用`onDestroy()`和`onCreate()`重启一遍activity，重置所有的UI元素，这 时AsyncTask和主Activity就失联了，所以用`onSaveInstanceState`来保存textView。

# AsyncTaskLoader








