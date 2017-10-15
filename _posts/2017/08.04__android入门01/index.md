---
category: ["android", "客户端"]
keywords: ["kotlin", "android"]
---

记录一下自己的安卓学习过程
学习的教程：[google官方的developer training book](https://google-developer-training.gitbooks.io/android-developer-fundamentals-course-practicals/content/en/Unit%201/11_p_hello_world.html)

<!-- more -->
# 项目结构
```bash
-manifests
    |- AndroidManifest.xml // 描述app用到的所有components
-java
    |- com.example.admin.myapplication
        |- MainActivity  // 所有项目的主代码都在这个文件夹下
    |- com.example.admin.myapplication(androidTest)
        |- ExampleInstrumentedTest //测试文件
    |- com.example.admin.myapplication(test)
        |- ExampleUnitTest // 单元测试
-res
    |- drawable //储存所有图片
    |- layout   // 可以理解为html
    |- mipmap   // 启动图标
    |- values
        |- colors.xml   // 颜色
        |- dimens.xml   // 视图尺寸
        |- strings.xml  // 用于多语言
        |- styles.xml   // 有点像css

```

# 调试
`Logcat`里打印了log信息，在代码中用
```kotlin
import android.util.Log

Log.d("tag info", "log string") 
// d - debug
// e - error
// w - warning
// i - info
```

# AndroidManifest.xml
``` xml
<?xml version="1.0" encoding="utf-8"?>
//安卓的namespace
<manifest xmlns:android="http://schemas.android.com/apk/res/android"    
    // 发布时的包名称
    package="com.example.catteria.myapplication" >   

    <application
        android:allowBackup="true"  // 允许备份
        android:icon="@mipmap/ic_launcher"  //启动的icon
        android:label="@string/app_name"    // app名称
        android:roundIcon="@mipmap/ic_launcher_round"   // 圆形的icon
        android:supportsRtl="true"  // 允许从右到左的排列
        android:theme="@style/AppTheme" >   // 样式

        // 定义activity，每个app至少有一个activity
        <activity android:name=".MainActivity" >
            <intent-filter>
                // action和category一起定义了activity启动时该干嘛
                // Start activity as the main entry point.
                <action android:name="android.intent.action.MAIN" />
                // 启动时最顶级的activity
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

# build.gradle
gradle是一个打包系统，详情可去看[官网](https://gradle.org/).
`Gradle Scripts`文件夹下有几个build.gradle文件，_build.gradle(Project: xxx)_是项目层面的，_build.gradle(Module: app)_是模块层面的，它对应app文件夹下的内容：
```js
apply plugin: 'com.android.application'

apply plugin: 'kotlin-android'

apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 26
    buildToolsVersion "26.0.0"
    // 核心的设置，会覆盖manifest
    defaultConfig {
        applicationId "com.example.catteria.study"
        minSdkVersion 19
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    // 定义app如何被打包
    buildTypes {
        // 也可定义debug时的设置，默认没有
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

// 用其他库时需要修改这里的配置
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:26.0.0-beta1'
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:0.5'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:2.2.2'
}
```

# TODO 实体机测试
