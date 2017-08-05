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
