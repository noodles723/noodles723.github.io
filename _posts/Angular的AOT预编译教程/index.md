---
title: "Angular的AOT预编译教程"
createtime: "2017-04-20"
description: "Angular的AOT预编译教程"
category: ["前端"]
keywords: ["angular"]
cover: ""
---

## 简介
> 有点觉得快乐写小js的时代已经一去不复返了。。。

AOT预编译(ahead of time)和JIT及时编译(just in time)是angular团队2016年 Angular Connect 大会上提出的概念，可参考[这里](https://www.youtube.com/watch?v=kW9cJsvcsGo)。

预编译指的是angular的Component有关的模板文件的预处理，是基于ng自己框架层面的预编译并不是指语言上的。

## 准备
首先得安装一些依赖：
```bash
npm install @angular/compiler-cli @angular/platform-server --save
```

**ngc**某种程度上可以看成是 **tsc**的ng定制版，同样需要`tsconfig.json`配置文件，官方给出的配置文件内容如下：

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",// 这里改成es2015是为了之后的tree shaking压缩
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015", "dom"],
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  "files": [
    "src/app/app.module.ts",
    "src/main.ts"
  ],

  "angularCompilerOptions": {
   "genDir": "aot", // 生成文件目录
   "skipMetadataEmit" : true  // 是否跳过生成metadata
 }
}
```

ngc要求html模板文件和css文件都要使用相对路径，即@Component里的templateUrl和styleUrl必须写成相对于component.ts文件的地址。

## 编译
编译命令很简单：
```bash
node_modules/.bin/ngc -p tsconfig-aot.json     // mac, linux
"node_modules/.bin/ngc" -p tsconfig-aot.json   // windows
```

`-p`参数是选择tsconfig.json文件的地址，或包含tsconfig.json的文件夹的地址。

ngc会把文件编译到genDir的aot文件夹下，类似`aot/app.component.ngfactory.ts`.

## 构建
编译之后，构建方式也得稍作修改，因为我们不再直接用component.ts了，改为ngfactory.ts了，所以在main.ts里需要将`platformBrowserDynamic.bootstrap`换成`platformBrowser().bootstrapModuleFactory`，入参是生成的ngfactory文件。

然后再用ngc编译一次。

## Tree shaking 压缩
官方文档是使用Rollup来做tree shaking，rollup只识别`import`和`export`而非`require`，所以在之前的tsconfig里才写的es2015。

用如下命令安装rollup及其插件:
```bash
npm install rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-uglify --save-dev
```

然后新建一个配置文件`rollup-config.js`:
```js
import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: 'src/main.js', // 入口文件
  dest: 'src/build.js', // 输出文件
  sourceMap: false,
  format: 'iife',
  onwarn: function(warning) {
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    console.warn( warning.message );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({ // 将commonjs形式的require改成es2015形式的import
        include: 'node_modules/rxjs/**',
      }),
      uglify()
  ]
}
```

运行rollup:
```bash
node_modules/.bin/rollup -c rollup-config.js // mac, linux
"node_modules/.bin/rollup"  -c rollup-config.js // windows
```

最后就可以在html里一次性引入了：
```html
<script src="build.js"></script>
```

## npm script
可以将命令集合一下写成npm的脚本：
```json
{
  "scripts": {
    "build:aot": "ngc -p tsconfig-aot.json && rollup -c rollup-config.js"
  }
}
```
然后直接运行：
```bash
npm run build:aot
```
就可以执行AOT及压缩打包了

## 可能会遇到的错误
1. systemjs和ngc的相对定位的路径不同，systemjs是相对于当前url的定位，ngc是相对于当前文件，所以在system-config里一定要把所有ts文件都用systemjs-angular-loader处理一下，它会去修改这些相对路径。
```json
meta: {
      './*.ts': {
        loader: 'systemjs-angular-loader.js'
      }
    },
```

2. ngc要求所有模块不带`.ts`后缀，所以system-config里要给文件加上后缀：
```json
packages: {
      'app': {
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
```

3. ngc编译时出现错误：
```bash
Member 'xxx' implicitly has an 'any' type
```
这是因为`tsconfig-aot.json`里 *compilerOptions.noImplicitAny*设为了 *true*,它会强制要求所有变量必须设置非 *any*的类型。
解决方法是，可以将其改成 *false*，也可以去把报错的变量都设个类型。

4. 用window变量引用第三方库时会报错：
```bash
Property 'xxx' does not exist on type 'Window'.
```
解决方法：强制声明一下window变量：
```ts
(<any>window).xxx
```