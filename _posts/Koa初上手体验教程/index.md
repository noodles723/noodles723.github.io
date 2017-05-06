---
title: "Koa初上手体验教程"
createtime: "2017-04-06"
description: "Koa初上手体验教程"
category: ["前端"]
keywords: ["Koa", "nodejs"]
cover: ""
---

##Hello World
koa是一个像express一样的基于node的web框架，原生异步及中间件的理念。
一个简单的hello world程序如下：
```js
const Koa = require('koa');
const app = new Koa();

app.use(async function (ctx, next) {
   const start = new Date();
   await next();
   const ms = new Date() - start;
   ctx.set('X-Response-Time', `${ms}ms`);
 });

app.listen(process.argv[2])
```

##router
koa中的router可以用ctx.path == '/'这种方式来判断，也可以引入[koa-router](https://github.com/alexmingoia/koa-router)用express的方法来写路由
```js
var router = require('koa-router')();

router.get('/', async function (ctx, next) { ctx.body = "hello koa"});
app.use(router.routes())

```
对于post请求，request中的body直接取不到，需引入第三方库[koa-body](https://github.com/dlau/koa-body)
```js
const koaBody = require('koa-body')();

router.post('/', koaBody, async function (ctx, next) {
    ctx.body = ctx.request.body.name.toUpperCase()
});
```
关于返回值，如果直接写`ctx.body = { foo: 'bar' };`返回的是json

##middleware
一个简单的middleware实现如下：
```js
function upperCase() {
  return async function (ctx, next) {
    await next();
    ctx.body = ctx.body.toUpperCase();
  };
}
app.use(upperCase());
```

##cookie
```js
app.keys = ['secret', 'keys'];
app.use(function *(){
  var n = ~~this.cookies.get('view', { signed: true }) + 1;
  this.cookies.set('view', n, { signed: true });
  this.body = n + ' views';
});
```
顺便记一下两个操作符
 - !!(value) === Boolean(value)
 - ~~ 将一个参数转化为 32 位有符号整数

##一些常用的middleware
1. [koa-static](https://github.com/koajs/static) :静态文件访问
2. [koa-router](https://github.com/alexmingoia/koa-router)：路由控制
3. [koa-views](https://github.com/queckezz/koa-views)：模板渲染
4. [koa-bodyparser](https://github.com/koajs/bodyparser)：解析request参数
5. [koa-context-validator](https://github.com/chentsulin/koa-context-validator)：验证request入参
6. [koa-police](https://github.com/tuvistavie/koa-police)：自定义路径可访问性验证
7. [i18n](https://github.com/koa-modules/i18n)：语言国际化
8. [koa-logger](https://github.com/koajs/logger): Development style logger
9. [koa-onerror](https://github.com/koajs/onerror)：错误处理，集中式的
10. [koa-generic-session](https://github.com/koajs/generic-session)：session处理
11. [koa-redis](https://github.com/koajs/koa-redis)：和koa-generic-session配套使用
12. [koa-locale](https://github.com/koa-modules/locale)：detect the locale
13. [koa-i18n](https://github.com/koa-modules/i18n)：多语言支持



