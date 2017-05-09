---
category: ["前端", "翻译"]
keywords: ["css","animation"]
---

上周，我写了篇关于[如何用css制作bitsofcode的logo动画](https://bitsofco.de/how-i-animated-the-bitsofcode-logo/)的文章。有人建议说可以试着去比较一下css动画和web动画API，于是就有了今天这篇文章。

<!-- more -->

## web动画API简介
像上周一样，我先简单介绍一下web动画API。web动画API为开发者们提供了一个直接用JavaScript操作浏览器动画引擎的方法。

### 创建一个动画
我们可以用`Element.animate()`函数来创建一个动画，它接受两个入参`keyframes`和`options`。

```js
element.animate(keyframes, options);
```

#### keyframes关键帧
`keyframes`对象表示动画时间轴中的一些关键事件。
