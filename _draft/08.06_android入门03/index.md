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
没有特定指向的intents，以打开网页，地理位置和分享为例，简单写一个输入框，一个按钮加一个文本框的页面：
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context="com.example.catteria.study.MainActivity"
    android:orientation="vertical">  // 指定为竖直方向

    <EditText
        android:id="@+id/website_edittext"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/edittext_uri" />

    <Button
        android:id="@+id/open_website_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="24dp"
        android:onClick="openWebsite"
        android:text="@string/button_uri" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/intent_view_text"
        android:text="haha"/>    
</LinearLayout>
```

让editText输入的url发送一个implicit intent，然后自己接受到这个intent显示在textView里。
MainActivity如下：

```kotlin
package com.example.catteria.study

import android.content.Intent
import android.net.Uri
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.app.ShareCompat
import android.util.Log
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 接受intent
        val intent = getIntent()
        val uri = intent.getData()
        if (uri != null) {
            val uri_string = "URI: " + uri.toString()
            intent_view_text.text = uri_string
        }
    }

    fun openWebsite(view: View) {
        val url = website_edittext.text.toString()
        val webpage = Uri.parse(url)
        val intent = Intent(Intent.ACTION_VIEW, webpage)    
        // ACTION_VIEW, ACTION_EDIT, ACTION_DIAL
        if(intent.resolveActivity(getPackageManager()) != null) {
            // 发送intent
            startActivity(intent)
        } else {
            Log.d("ImplicitIntents", "Cant't handle this!")
        }
    }

    fun shareText(view: View) {
        // ShareCompat可以发起分享
        val txt = share_edittext.text.toString()
        val mimeType = "text/plain"
        ShareCompat.IntentBuilder
                .from(this)
                .setType(mimeType)
                .setChooserTitle("Share this text with: ")
                .setText(txt)
                .startChooser()
    }
}

```
manifest里需要加上这个intent的filter：
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.catteria.study">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="http"     // 只接受http协议
                    android:host="developer.android.com" /> //只接受domain是developer.android.com的intent
            </intent-filter>
        </activity>
    </application>

</manifest>
```









