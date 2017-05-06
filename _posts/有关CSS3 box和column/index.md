---
title: "有关CSS3 box和column"
createtime: "2015-05-21"
description: "弹性盒模型box相关"
category: ["前端技术"]
keywords: ["css"]
cover: ""
---

### 弹性盒模型box相关

CSS的标准盒模型如下，CSS3中新增了一些弹性盒模型机制用于处理元素在盒子中的分布方式。

![](./boxModel.png)

要使用弹性盒模型相关属性需将最外层`div`的`display`设为`box`，并添加相应的浏览器支持。

    .wrapper {
        display: box;
        display: -moz-box;
        display: -web-kit-box;
        /*其他box属性*/
    }

#### box-orient 子元素布局方向 .wrapper
- horizontal: 从左到右水平显示
- vertical: 从上至下垂直显示
- inline-axis: 沿着内联轴显示
- block-axis: 沿着块轴显示

> <div style="display:box;display:-moz-box;display:-webkit-box;orient: horizontal;-mozbox-box-orient: horizontal;-webkit-box-orient:horizontal;width:45%;">
    <div style="background:#FF7878;width:50px;height:50px;"></div>
    <div style="background:#C7FF8E;width:50px;height:50px;"></div>
    <div style="background:#6FA2FF;width:50px;height:50px;"></div>
</div>
</br>
<div style="display:box;display:-moz-box;display:-webkit-box;orient: horizontal;-moz-box-orient: horizontal;-webkit-box-orient:vertical;width:45%">
    <div style="background:#FF7878;width:50px;height:50px;"></div>
    <div style="background:#C7FF8E;width:50px;height:50px;"></div>
    <div style="background:#6FA2FF;width:50px;height:50px;"></div>
</div>

#### box-direction 子元素整体显示顺序 .wrapper
- normal: 正常顺序
- reverse: 反向显示
- inherit: 继承上级

#### box-ordinal-group 子元素单个具体显示顺序 .box
- &lt;integer>: 从1开始的位置序号

><div style="display:box;display:-moz-box;display:-webkit-box;">
    <div style="background:#FF7878;width:70px;-moz-box-ordinal-group:2;-webkit-box-ordinal-group:2;box-ordinal-group:2;">first</div>
    <div style="background:#C7FF8E;width:70px;-moz-box-ordinal-group:3;-webkit-box-ordinal-group:3;box-ordinal-group:3;">second</div>
    <div style="background:#6FA2FF;width:70px;-moz-box-ordinal-group:1;-webkit-box-ordinal-group:1;box-ordinal-group:1;">third</div>
</div>

#### box-flex 按比例占满弹性空间 .box
- &lt;number>: 整数或小数，分母是所有有box-flex的属性值相加，box-flex只有当子元素有确定width和height时才可被正确解析

><div style="display:box;display:-moz-box;display:-webkit-box;">
    <div style="background:#FF7878;-moz-box-flex:1;-webkit-box-flex:1;box-flex:1;">first</div>
    <div style="background:#C7FF8E;-moz-box-flex:2;-webkit-box-flex:2;box-flex:2;">second</div>
    <div style="background:#6FA2FF;-moz-box-flex:3;-webkit-box-flex:3;box-flex:3;">third</div>
</div>

#### box-pack 在水平方向上对盒子的富余空间进行管理 .wrapper
- start: 子元素在左，富余空间在右
- end: 子元素在右，富余空间在左
- justify: 富余空间在子元素中间平均分配
- center: 富余空间在子元素两侧平均分配

><div style="display:box;display:-moz-box;display:-webkit-box;-moz-box-pack: start;-webkit-box-pack:start;box-pack:start;">
    <div style="background:#FF7878;width: 20%">start</div>
    <div style="background:#C7FF8E;width:20%">start</div>
    <div style="background:#6FA2FF;width:20%">start</div>
</div></br>
<div style="display:box;display:-moz-box;display:-webkit-box;-moz-box-pack: end;-webkit-box-pack:end;box-pack:end;">
    <div style="background:#FF7878;width:20%">end</div>
    <div style="background:#C7FF8E;width:20%">end</div>
    <div style="background:#6FA2FF;width:20%">end</div>
</div></br>
<div style="display:box;display:-moz-box;display:-webkit-box;-moz-box-pack: justify;-webkit-box-pack:justify;box-pack:justify;">
    <div style="background:#FF7878;width:20%">justify</div>
    <div style="background:#C7FF8E;width:20%">justify</div>
    <div style="background:#6FA2FF;width:20%">justify</div>
</div></br>
<div style="display:box;display:-moz-box;display:-webkit-box;-moz-box-pack: center;-webkit-box-pack:center;box-pack:center;">
    <div style="background:#FF7878;width:20%">center</div>
    <div style="background:#C7FF8E;width:20%">center</div>
    <div style="background:#6FA2FF;width:20%">center</div>
</div>

#### box-align 在垂直方向上对盒子的富余空间进行管理 .wrapper
- start: 子元素在上，富余空间在下
- end: 子元素在下，富余空间在上
- center: 富余空间在子元素上下平均分配
- baseline: 子元素沿着基线，富余空间可前可后
- stretch: .box高度被拉到与.wrapper相等

**注：box-pack与box-align是相对于box-orient而言的**

><div style="display:box;display:-moz-box;display:-webkit-box;height:5em;">
    <div style="display:inherit;-moz-box-flex:1;-webkit-box-flex:1;box-flex:1;height:100%;-moz-box-align:start;-webkit-box-align:start;box-align:start;">
        <div style="background:#FF7878;">start</div>
    </div>
    <div style="display:inherit;-moz-box-flex:1;-webkit-box-flex:1;box-flex:1;height:100%;-moz-box-align:end;-webkit-box-align:end;box-align:end;">
        <div style="background:#C7FF8E;">end</div>
    </div>
    <div style="display:inherit;-moz-box-flex:1;-webkit-box-flex:1;box-flex:1;height:100%;-moz-box-align:center;-webkit-box-align:center;box-align:center;">
        <div style="background:#6FA2FF;">center</div>
    </div>
    <div style="display:inherit;-moz-box-flex:1;-webkit-box-flex:1;box-flex:1;height:100%;-moz-box-align:baseline;-webkit-box-align:baseline;box-align:baseline;">
        <div style="background:#FF7878;">baseline</div>
    </div>
    <div style="display:inherit;-moz-box-flex:1;-webkit-box-flex:1;box-flex:1;height:100%;-moz-box-align:stretch;-webkit-box-align:stretch;box-align:stretch;">
        <div style="background:#C7FF8E;">stretch</div>
    </div>
</div>

#### box-lines 溢出空间管理 .wrapper
- single: 所有子元素都单行或单列
- multiple: 所有子元素都多行或多列

**还没有被任何浏览器实现**

#### box-sizing 定义盒模型解析模式
- content-box: width = border + padding + content
- border-box: width = content
- inherit: 同上级

### 多列布局columns相关 .wrapper

#### columns  (webkit)
- column-width column-count: 每列宽度 列数

#### column-count (moz webkit)
- &ltinteger>: 列数
- auto: 自动设置

#### column-width (moz webkit)
- &lt;length>: 宽度
- auto: 自动设置

#### column-gap 列间距 (moz webkit)
- normal: 浏览器默认设置,1em
- &lt;length>: 自定义值，不可为负

#### column-rule 边框样式 (moz webkit)
- length style color transparent: 间距 样式 颜色 是否透明
    - style: none hidden dotted dashed solid double groove ridge inset outset
    - transparent: true false

#### column-span 定义跨列显示 (webkit)
- 1: 只在本列显示
- all: 横跨所有列

#### column-fill 定义栏目高度 (webkit)
- auto: 各列高度随内容变化
- balance: 各列高度同内容最多的那一列
