---
category: ["黑科技"]
keywords: ["淘宝", "nodejs", "superagent"]
---

记录一下程序模拟淘宝登录的基本流程，例子用的是nodejs的superagent，python可以用request原理都是一样的。

<!-- more -->

## 1. 验证登录

新建一个agent用于保存cookie:

```js
const superagent = require('superagent');
let agent = superagent.agent();
```

访问`https://pub.alimama.com/common/getUnionPubContextInfo.json`验证是否有登录

```js
let res = await this.agent
            .set({
                'method': 'GET',
                'authority': 'pub.alimama.com',
                'scheme': 'https',
                'path': '/common/getUnionPubContextInfo.json',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                'Referer': 'http://pub.alimama.com/',
                'Accept-Encoding': 'gzip, deflate, sdch',
                'Accept-Language': 'zh,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4,zh-TW;q=0.2'
            })
            .get('https://pub.alimama.com/common/getUnionPubContextInfo.json')
            .catch(err => {throw err});
```

可以通过`res.data.noLogin`判断是否已登录：

```js
// 未登录
res = { 
    data: { 
        loginUrlPrefix: 'http://www.alimama.com/member/login.htm?forward=',
        env: 'product',
        noLogin: true,
        ip: 'xxx.xxx.xxx.xxx' 
    },
    info: { 
        message: null, 
        ok: true 
    },
    ok: true,
    invalidKey: null 
}

// 已登录


```

