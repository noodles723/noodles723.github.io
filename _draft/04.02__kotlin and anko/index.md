---
category: ["安卓"]
keywords: ["kotlin", "anko"]
---

基于anko，vasSonic和X5内核的hybrid应用。

<!-- more -->

## gradle配置
project build.gradle:
```gradle
buildscript {
    ext.kotlin_version = '1.2.31'
    ext.anko_version = '0.10.4'

    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

allprojects {
    repositories {
        google()
        jcenter()
        maven { url "http://dl.bintray.com/kotlin/kotlin-dev" }
    }
}
```

app build.gradle:
```gradle
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 26
    defaultConfig {
        applicationId "xxx"
        minSdkVersion 14
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"

        // 这个是为了X5兼容64位手机
        ndk {
            abiFilters "armeabi", "armeabi-v7a", "x86", "mips"
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

    // 这个是为了X5兼容64位手机
    sourceSets {
        main{
            jniLibs.srcDirs = ['libs']
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation"org.jetbrains.kotlin:kotlin-stdlib-jre7:$kotlin_version"
    implementation 'com.android.support:appcompat-v7:26.1.0'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.1'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.1'

    // Anko Commons
    compile "org.jetbrains.anko:anko-commons:$anko_version"

    // Anko Layouts
    compile "org.jetbrains.anko:anko-sdk25:$anko_version"
    compile "org.jetbrains.anko:anko-appcompat-v7:$anko_version"

    // Coroutine listeners for Anko Layouts
    compile "org.jetbrains.anko:anko-sdk25-coroutines:$anko_version"
    compile "org.jetbrains.anko:anko-appcompat-v7-coroutines:$anko_version"

    // Anko SQLite
    compile "org.jetbrains.anko:anko-sqlite:$anko_version"

    // 如果要引入全部,commons, layouts, coroutine, sqlite, 可以只写下面这一行
    compile "org.jetbrains.anko:anko:$anko_version"

    // vas sonic
    implementation 'com.tencent.sonic:sdk:3.0.0-beta'
}

kotlin {
    experimental {
        coroutines "enable"
    }
}

```

从官网下载x5的jar包，放在app下的libs文件夹里，同时在libs文件夹下新建一个armeabi文件夹，把x5事例项目里的`liblbs.so`文件考进来，这个是为了兼容64位手机。

## app 启动配置
