---
category: ["前端", "客户端"]
keywords: ["react native"]
---

这只是个简易教程，用于快速架起一个react native项目。

<!-- more -->

## 准备工作

Windows上，官方简易先安个[chocolatey](https://chocolatey.org/install)，然后：

```bash
choco install nodejs.install
choco install python2
choco install jdk8
```

但是此玩意墙内下载极慢。。
所以建议直接自行安装[nodejs](https://nodejs.org/dist/v6.10.3/node-v6.10.3-x64.msi), [python](https://www.python.org/ftp/python/2.7.13/python-2.7.13.msi), [jdk8](http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-windows-x64.exe)。

mac上直接[homebrew](https://brew.sh/)

```bash
brew install node
brew install watchman
```

安好后：
```bash
npm install -g react-native-cli
```

对于android和ios需要分别配置以下东西：

先说安卓：
1. 下载安装[Android Studio](https://developer.android.com/studio/index.html#win-bundle)。
2. 
