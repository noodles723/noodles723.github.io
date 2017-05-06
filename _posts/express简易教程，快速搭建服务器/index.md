---
title: "express简易教程，快速搭建服务器"
createtime: "2016-11-25"
description: "快速用express搭建一个node服务器来测试前端代码"
category: ["前端技术"]
keywords: ["express", "node"]
cover: ""
---

```bash
npm install express-generator -g // 全局安装express cli
express --view (ejs|hbs|hjs|jade|pug|twig|vash) --css (less|stylus|compass|sass) --git --force // 常用命令
express --css=stylus code // 新建code项目
cd code&npm install
DEBUG=myapp:* npm start // run the app

```
项目的目录结构为：
```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade
```

### 路由
基本用法：
```nodejs
app.get('/', function (req, res) { // 或app.post, app.put, app.delete, app.all
  res.send('Hello World!')
})

// 静态文件
app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
```

路由支持正则匹配
```node
app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})
```

获取url中的值
```node
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```

一个路由可被多个函数处理
```node
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

res的方法：
- res.download()
- res.end()
- res.json()
- res.jsonp()
- res.redirect()
- res.render()
- res.send()
- res.sendFile()
- res.sendStatus()
