---
category: ["nativescript", "客户端", "前端"]
keywords: ["nativescript"]
---

Nativescript的简易学习路径，这东西是真的牛逼~~

<!-- more -->

# why
Nativescript可以用一套angular2的代码编译生成ios、安卓、web三端代码，且都是原生代码，指数级的减少开发时间，可用于在一特定方向快速测试可行性。

# Installation，cmd
需要Android studio和xcode
```js
npm install -g nativescript

tns doctor // 检查环境是否可用
tns device // 检查可用的虚拟或实体设备
tns run [android/ios] // 运行android或ios代码
tns create // 创建新项目
```

# 架构
nativescript和ng2项目代码上来看唯一的不同应该就是模板里，ng2是html，ns用的是一系列[自定义的xml标签](https://docs.nativescript.org/angular/ui/components)，其他东西基本一样，所以前端人看来上手很容易。

# 路由
ns默认使用[angular component router](https://angular.io/guide/router)做路由:

```js
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes = [
    { path: "login", component: LoginComponent },
    { path: "groceries", component: GroceryListComponent },
    { path: "grocery/:id", component: GroceryComponent }
];

@NgModule({
    bootstrap: [GroceriesApp],
    imports: [
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ]
})
export class GroceriesAppModule { }
```

将module传入bootstrapModule启动应用：

```js
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
platformNativeScriptDynamic().bootstrapModule(GroceriesAppModule);
```

# bootstrap
用ng驱动原生app的流程其实很复杂，但ns做了一个黑盒封装：
```js
platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
```
所有ng会用到的modules都被做了一个二次封装，在`nativescript-angular`文件夹下，但调用方法几乎一模一样：
```js
import {NS_ROUTER_PROVIDERS} from "nativescript-angular/router";

nativeScriptBootstrap(AppMainComponent, [NS_ROUTER_PROVIDERS]);

import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core"; 
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { routes } from "./app.routes";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
    ],
})
class AppModule {}

platformNativeScriptDynamic().bootstrapModule(AppModule);
```

每个`component`有两个自动注入的模块`page`和`platform`

# Lifecycle
component的lifecycle就是ng的那一套，常用的有`ngOnInit, ngOnChanges, ngDoCheck, ngOnDestroy`等。

应用本身的lifecycle事件有`launch, suspend, resume, exit, lowMemory, uncaughtError`，安卓和ios还有一些自己的自定义事件，具体可看[这里](https://docs.nativescript.org/angular/core-concepts/application-lifecycle)

ns的所有可用模块及说明可看[这里](https://docs.nativescript.org/angular/core-concepts/modules)

# end
反正基本框架和ng2一模一样，完全可以直接动手写一个了，一些code sample可以参考[这里](https://docs.nativescript.org/angular/code-samples/overview)