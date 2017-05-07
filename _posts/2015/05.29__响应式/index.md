---
title: "响应式"
createtime: "2015-05-29"
description: "响应式的基本实现"
category: ["前端"]
keywords: ["响应式"]
cover: ""
---

> 响应式是针对任意设备对**网页内容**进行完美布局的一种显示机制，手机版网站是根据**不同设备**提供特定的内容和功能，两者要加以区分。

我理解如果时间和经费允许，最好还是根据设备定制，响应式只是一个在固定宽度和完全定制之间的折中方案，提供一种无歧视的用户体验。

### 媒体查询：支持不同的视口
#### 媒体查询语法
可以写在.css文件里

    @media screen and (max-width: 960px) {
        body {
            background-color: red;
        }
    }


也可以使用链接

    <link rel="stylesheet" media="screen and (orientation: portrait) and (min-width:800px), projection" href="xxx.css" />

或者在.css里用链接

    @import url("xxx.css") screen and (min-width: 200px);
    
常用的属性有：
- width：视口宽度
- height：视口高度
- device-width：设备屏幕宽度
- device-height：设备屏幕高度
- orientation: 方向
- aspect-ratio/device-aspect-ratio: 宽高比
- resolution：分辨率300dpi之类的

#### 阻止浏览器自动调整页面大小
主要方法是在`<head>`里添加一个`<meta>`标签来控制缩放范围，是否可以缩放等

    <meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=3, minimum-scale=0.5, user-scalable=no"/>

之后应该可以直接在css里用`@viewport`来声明，详见[这里](http://dev.w3.org/csswg/css-device-adapt/)

### 流式布局
响应式设计的核心：
- 使用百分比布局创建流动的弹性界面
- 使用媒体查询来限制元素的变动范围

> 百分比宽度 ＝ 目标元素宽度 / 上下文元素宽度

用`em`替换`px`，现代浏览器默认文字大小都是**16px**，所以给`body`添加：
 
    font-size: 100%
    font-size: 16px
    font-size: 1em

效果一样。

对于图片等多媒体标签，可以使用

    img, object, video, embed {
        max-width: 100%;
    }

来使其自动缩放到与容器100%匹配。

还可以考虑用**网格系统**来实现快速响应式建站。

### 响应式设计中的html5
#### polyfill
> 腻子脚本(polyfill)是指一段能给老版本浏览器带来新特性的js代码，以此填补其缺陷。

使用[Modernizr](http://www.modernizr.com)可以基本解决所有polyfill的问题，让IE也可以用html5。

一些html5常用的标签: `<section>, <nav>, <article>, <aside>, <hgroup>, <header>, <footer>, <address>`

#### 离线应用
为每个需要离线使用的网页制定一个`.manifest`文件罗列所需所有资源

    <html lang="zh" manifest="/offline.manifest">

文件内容如下：

    CACHE MANIFEST
    #v1

    CACHE:       //所有离线使用所需文件
    index.html
    css/main.css
    img/xxx.png
    
    NETWORK:     //所有不需要被缓存的文件
    *            //在线白名单通配，及时更新

    FALLBACK:    //每次询问缓存是否有，没有则显示offline.html
    //offline.html

修改版本号可出发浏览器更新缓存

完整规范见[这里](http://www.w3.org/html/wg/drafts/html/master/browsers.html#offline)

#### @font-face
Embedded OpenType(EOT)只有IE支持，其他浏览器一般常用TrueType(TTF), Scalable Vector Graphics(SVG)以及Web Open Font Format(WOFF)

免费的西文字体可以去[Font Squirrel](http://www.fontsquirrel.com)找。

使用@font-face，css语法如下

    @font-face {
        font-family: 'BebasNeueRegular';
        src: url('BebasNeue-webfont.eot');
        src: url('BebasNeue-webfont.eot?#iefix') format('embedded-opentype'),
             url('BebasNeue-webfont.woff') format('woff'),
             url('BebasNeue-webfont.ttf') format('truetype'),
             url('BebasNeue-webfont.svg#BebasNeueRegular') format('svg'),
        font-weight: normal; //默认是700
        font-style: normal;
    }

然后就可以在其他css里使用`font-family: BebasNeueRegular`了。

@font-face还可以用作图标，而且因为是字体，图标都可以完美缩放，

### 跨浏览器
瑞士军刀还是 [Modernizr](http://www.modernizr.com/)

还有[Respond.js](https://github.com/scottjehl/Respond)，可以让IE支持`min/max-width`从而实现响应式。

    <!--[if lte IE 8]>
        <script src="js/respond.js" />
    <![endif]>

### 其他资源
- [响应式设计创意收集：mediaqueri.es](http://mediaqueri.es)
- [检测浏览器对css3和html5的支持性: caniuse.com](http://www.caniuse.com)
- [css3渐变生成器](http://www.colorzilla.com/gradient-editor/)
- [css3背景渐变图案](http://lea.verou.me/css3patterns/)
