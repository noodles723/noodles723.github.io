---
category: ["frontend"]
keywords: ["mocha", "chai", "sinon", "karma"]
---

记一下node基于koa框架的可行的偏集成测试的方案。

<!-- more -->

## 搭环境

先提一下用到的一些库：

[mocha](https://mochajs.org/)是一个前端单元测试框架，跟`jasmine`相比更轻量级，功能也更单一，需要配合很多其他模块一起使用。

[chai](http://www.chaijs.com/)是一个断言库，提供多种断言方式，像assert, expect或should。

[sinon](http://sinonjs.org/)是一个用来提供mock的库。

[char-http](http://www.chaijs.com/plugins/chai-http/)是chai的一个插件，用来模拟http请求。

安装命令：
```bash
npm i mocha chai chai-http sinon --save-dev
```

## 文件结构
mocha会自动去跑test文件夹下的所有测试文件，默认不会跑子目录，要跑的话需要加上`--recursive`.

没有全局安装mocha的话可以把mocha命令写进package.json里方便调用：
```json
{
    "scripts": {
        "test": "mocha --check-leaks --trace-deprecation",
        "test-all": "mocha --check-leaks --trace-deprecation --recursive"     
    }
}
```

为了便于写测试，本身的代码结构可能稍微需要做点调整，将原来index.js里生成koa app的部分提出来成app.js:
```js
const Koa = require('koa');
const middleware = require('./middleware');
const router = require('./routers');

let app = new Koa();
middleware(app);    // 加载中间件
app.use(router.routes());   // 加载路由

exports.app = app;
```

原来的index.js现在缩减为：
```js
const app = require("./app").app;

const server = app.listen(port, () => {
    logger.D(`app[${app.env}] listen ${port} ...`);
});

exports.server = server;
```

还有点很麻烦的是sinon的stub方法不能mock类似`module.exports = function(){...}`的这种写法，所以如果模块要引入测试的话最好用`exports.xxx = function(){...}`这种写法.

最近看到有个叫[proxyrequire](https://github.com/thlorenz/proxyquire)的库好像可以对此做一些suger fix，还没仔细看。

## 一个简单的实现
koa的app对象好像在require时那些中间件就全部挂好了，比较难去stub，这个我还要再研究一下，给出一个可行方案是直接把app.middleware[n]给mock掉，n是需要mock的中间件的index，试代码而定。

给出一个简单的场景：用户如果有登录返回主页，如果没有登录，跳去登录页。
这里是偏集成测试，从request开始模拟，用拿到的response判断正不正确，不同去mock对应的controller。

```js
process.env.NODE_ENV = "test";      // 也可以是development，反正记得把环境加上

const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const sinon = require('sinon');

let logger = require('node-logger');        
const app = require('../app').app;      // 之前提出来的app.js

// 这里我准备把koa-session这个中间件mock掉，伪装登录态
const session = app.middleware[1];

describe('simple test', () => {
    before(() => {
        sinon.stub(logger, 'D');    // 把日志函数给mock掉
    });

    after(() => {
        logger.D.restore();         // 恢复logger
    });

    describe('异常情况', () => {
        it('没有session，跳去登录页', ( done ) => {
            chai.request(app.listen()).get('/index')
                .end((err, res) => {
                    expect(err).to.be.null;
                    // 这里如果用https有些其他认证配置要加，有待研究
                    expect(res).to.redirectTo('http://xxx.com/login'); 
                    done();
                });
        })
    });

    describe('正常情况', () => {
        beforeEach(() => {  // 把session给填上，伪装登录
            app.middleware[1] = async function(ctx, next) {
                ctx.session = {token: "xxx"};       // session的值视代码而定
                await next();
            };
        });

        afterEach(() => {
            app.middleware[1] = session;            // 恢复session
        });

        it('有session，渲染主页', ( done ) => {
            chai.request(app.listen()).get('/index')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res.status).to.equal(200);
                    expect(res.body.res).to.match(/主页的标题/);
                    done();
                });
        });
    });
});
```

其中sinon的stub和mock都有很多很好用的方法，视具体情况自行添加。

测试驱动开发其实是个很好的习惯，但百行代码千行测试，毕竟还是个繁重的体力活。很多代码的生命周期可能并不会持续到需要测试发挥效果的时候，但如果真想写出一个有长久生命力的项目，测试是必不可少的。




