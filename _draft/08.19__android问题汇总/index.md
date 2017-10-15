---
category: ["android", "客户端"]
keywords: ["kotlin", "android"]
---

记录下开发中遇到的问题

<!-- more -->

# UI
## 在color.xml中带上透明度信息
android用的是argb的写法，例如50%的白色表示为#80FFFFFF，浏览器console中可以用`(+parseInt(0.87*256)).toString(16)`将十进制的透明度转为16禁止的hex。常用的hex值如下：
```
100% — FF   95% — F2    90% — E6    85% — D9    80% — CC    75% — BF
70% — B3    65% — A6    60% — 99    55% — 8C    50% — 80    45% — 73
40% — 66    35% — 59    30% — 4D    25% — 40    20% — 33    15% — 26
10% — 1A    5% — 0D     0% — 00
```
material design的字体颜色如下：
```xml
<color name="primaryText">#de000000</color>
<color name="secondaryText">#8a000000</color>
<color name="hintText">#61000000</color>
<color name="disabledText">#61000000</color>
<color name="dividers">#1e000000</color>

<color name="primaryLightText">#ffffff</color>
<color name="secondaryLightText">#b3ffffff</color>
<color name="hintLightText">#80ffffff</color>
<color name="disabledLightText">#80ffffff</color>
<color name="dividersLight">#1effffff</color>
```

## 给view添加ripple effect
属性里加上`android:foreground="?attr/selectableItemBackground"`即可