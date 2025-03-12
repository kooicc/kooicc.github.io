---
title: "Nginx正向tcp代理"
date: 2024-06-03T22:20:48+08:00
lastmod: 2024-06-03T22:20:48+08:00
author: ["Startstorm"]
keywords: 
- 
categories: # 没有分类界面可以不填写
- 
tags: # 标签
- tech
- nginx
- tcp正向代理
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

# Nginx模块
nginx正向tcp代理需要stream模块，检查模块的方法如下
```shell
nginx -V | grep -i stream
```

# Nginx配置
配置如下
```shell
stream {  
    upstream backend_servers {  
        # ... 上游服务器池配置 ...  
        server 10.190.17.155:80;
    }  
  
    server {  
        listen 127.0.0.1:12345; # 监听端口，客户端将连接到这个端口  
        proxy_pass backend_servers; # 代理到上游服务器池  
  
        # 可选配置：  
        # proxy_connect_timeout 10s; # 连接超时时间  
        # proxy_timeout 30s; # 数据传输超时时间  
    }  
}
```


