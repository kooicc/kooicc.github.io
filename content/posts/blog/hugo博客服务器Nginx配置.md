---
title: "Hugo博客服务器Nginx配置"
date: 2024-05-29T18:19:37+08:00
lastmod: 2024-05-29T18:19:37+08:00
author: ["Startstorm"]
keywords: 
- 
categories: # 没有分类界面可以不填写
- 
tags: # 标签
- blog
description: ""
weight:
slug: ""
draft: false # 是否为草稿
comments: true # 本页面是否显示评论
reward: true # 打赏
mermaid: true #是否开启mermaid
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true #顶部显示路径
cover:
    image: "" #图片路径例如：posts/tech/123/123.png
    zoom: # 图片大小，例如填写 50% 表示原图像的一半大小
    caption: "" #图片底部描述
    alt: ""
    relative: false
---

# Nginx配置
通过hugo命令，可以把hugo博客生成public静态资源文件，该静态资源文件可以部署在服务器上的Nginx，其他人就可以通过浏览器访问我们的博客网站。

下面的配置文件带SSL证书，可以使用https来访问我们的网站。SSL证书文件放在nginx.conf相同的文件夹下。
Nginx的server配置如下：

```Ningx
server {
    listen 80;
    server_name startstorm.online;
    rewrite ^(.*)$ https://startstorm.online;
}


server {
        listen 443 ; # listen ssl port
        server_name localhost startstorm.online;
        
        # 开启SSL证书
        ssl   on;
        # 配置SSL证书  
        ssl_certificate    startstorm.online_bundle.crt;
        # 配置证书秘钥
        ssl_certificate_key    startstorm.online.key;
        # SSl 会话缓存
        ssl_session_cache        shared:SSL:1m; 
        # SSL 会话超时时间
        ssl_session_timeout   5m;
        # 配置加密套件,写法遵循openssl标准
        ssl_protocols        TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers        ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers        on;
        
        # 下面时存放静态文件的目录，我的静态文件存放在服务器linux的/www/wwwroot/startstorm.github.io目录下
        root /www/wwwroot/startstorm.github.io;
        
        location / {
            index index.html index.htm;
        }
        
        access_log  /www/wwwlogs/access.log;
}
```

# Nginx配置生效
执行下面的命令
```shell
# 重新加载nginx配置文件
nginx -s reload
# 如果不生效就重启nginx
systemctl restart nginx
```

