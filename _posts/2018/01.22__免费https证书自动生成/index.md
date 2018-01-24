---
category: ["运维"]
keywords: ["https", "certbot"]
---

用certbot在ubuntu服务器上自动生成免费的https证书。 

<!-- more -->

大家都知道有一个免费获取https证书的良心网站叫[letsencrypt](https://letsencrypt.org/).

certbot是letsencrypt官方推荐的一个符合ACME协议的shell客户端，[这里](https://letsencrypt.org/docs/client-options/)可以看到其他的客户端。

为了方便，先新建一个文件夹用来放配置文件及命令，再用通用方法装一下certbot：
```bash
mkdir -p /opt/letsencript
cd /opt/letsencript
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
```

每一个证书对应新建一个配置文件：
```conf
# 要加密的域名，可以逗号分隔添加多个
domains=xxx.com

# 密钥大小，可以用默认的
rsa-key-size=4096    

# letsencript的验证服务器地址
server=https://acme-v01.api.letsencrypt.org/directory 

# 你的email
email=xxx@xxx.com
text = True
authenticator=webroot

# 验证地址，可自定义不过要和后续的所有配置对应上
webroot-path=/var/www/html/letsencrypt

```

修改nginx里的配置，以下是简单版本：
```conf
server {
    listen 80;
    server_name xxx.com;

    location / {
        proxy_pass http://localhost:443;
    }

    # 把.well-known指到刚刚配的webroot-path下
    location ~ /\.well-known {
        # 对应certbot config里的webroot-path
        root /var/www/html/letsencrypt;
    }
}
server {
    listen 443 ssl;
    server_name xxx.com;
    
    # 生成的证书默认地址是在/etc/letsencrypt/live对应的域名下
    ssl_certificate /etc/letsencrypt/live/xxx.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/xxx.com/privkey.pem;

    location / {
        proxy_pass http://localhost:7001;
    }
}
```

以上配置好后运行`./certbot-auto --renew-by-default --config xxx.conf certonly`就可以看到成功信息了。

由于证书是90天过期，可以写个crontab让上面那个命令自动运行。
先简单写个脚本文件`renewssl.sh`，自动把所有的conf都生成一遍：
```bash
#!/bin/sh
cd /opt/letsencrypt

for conf in $(ls /opt/letsencrypt/*.conf); do
  ./certbot-auto --renew-by-default --config "$conf" certonly
done

service nginx reload
```


输入命令`crontab -e`编辑crontab文件：
```conf
# 每两个月重新生成一遍ssl证书
0 0 1 */2 * /bin/sh /opt/letsencrypt/renewssl.sh
```

最后用`service cron start`启动crontab服务，done.

更详细的信息可以去看certbot的官网：(https://certbot.eff.org/)[https://certbot.eff.org/]
