---
category: ["docker"]
keywords: ["docker", "dockerfile"]
---

记录一下常用的Dockerfile。

<!-- more -->

## Node

```bash
FROM node:8.6.0-alpine

# 修改时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# add npm package, package提前可加快大包时间
COPY package.json /usr/src/app/package.json

RUN npm i --registry=https://registry.npm.taobao.org

# copy code
COPY . /usr/src/app

EXPOSE 7001

CMD npm start

```


