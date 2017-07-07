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

