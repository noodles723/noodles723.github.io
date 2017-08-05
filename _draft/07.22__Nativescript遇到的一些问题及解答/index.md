---
category: ["Nativescript"]
keywords: ["nativescript"]
---

记录一些在写ns的过程中遇到过的坑及填埋方案
[toc]

<!-- more -->

# 禁用安卓Tabview默认滑动切换tab

需要改源码，不知道以后会不会把`viewPager`暴露出来，这是个临时解决方案。

在`node_modules/tns-core-modules/ui/tab-view/tab-view.android.js`里头上加个自定义方法：

```js
var customViewPager = android.support.v4.view.ViewPager.extend({
    set swipeEnabled(value) { },
    //constructor
    init: function() {
        this.swipeEnabled = true;
    },
    onTouchEvent : function(event) {
        if (this.swipeEnabled) {
            return this.super.onTouchEvent(event);
        }
        return false;
    },
    onInterceptTouchEvent : function(event) {
        if (this.swipeEnabled) {
            return this.super.onInterceptTouchEvent(event);
        }
        return false;
    },
    setPagingEnabled : function(enabled) {
        this.swipeEnabled = enabled;
    }
});
```

然后在实例化的时候：`TabView.prototype.createNativeView` 方法里（283行）把 
```js
var viewPager = new android.support.v4.view.ViewPager(context);
```
改成:
```js
var viewPager = new customViewPager(context);
viewPager.setPagingEnabled(false);
```

删掉`platform/android`文件夹，重新编译。

