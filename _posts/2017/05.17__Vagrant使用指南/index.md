---
category: ["后台", "工具"]
keywords: ["vagrant"]
---

这是一个简单的vagrant使用指南。

<!-- more -->

## Why Vagrant

vagrant的主要功能之一是统一开发环境。

用过windows做开发的人应该会懂我在说什么。。。。。

## Setup

### 准备工作

先把工具下好：
- [Vagrant](https://releases.hashicorp.com/vagrant/1.9.5/vagrant_1.9.5.msi?_ga=2.50692458.238819100.1495002938-1952566367.1494922004)
- [VirtualBox]()
- 还有所用的系统，可以从[这里](https://atlas.hashicorp.com/boxes/search)找你想用的系统，以默认的64位ubuntu为例，下载地址为：[https://atlas.hashicorp.com/hashicorp/boxes/precise64/versions/1.1.0/providers/virtualbox.box](https://atlas.hashicorp.com/hashicorp/boxes/precise64/versions/1.1.0/providers/virtualbox.box)

虽然`vagrant init hashicorp/precise64`可以直接下载box，但是感觉很慢，可以用百度盘或迅雷先下下来，再手动挂上去。

### 创建项目

首先将下好的`.box`文件添加到vagrant中：

```bash
vagrant box add my-box file:///d:/path/to/file.box
```

然后在项目文件夹下：
```bash
vagrant init my-box
```

vagrant本质上是用一种便捷方式连接了虚拟机，所以开发时要先开起虚拟机：
```bash
vagrant up
```

然后就可以连接虚拟机了：
```bash
vagrant ssh
```