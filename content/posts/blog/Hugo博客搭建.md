---
title: "Hugo博客搭建"
date: 2022-05-05T00:18:23+08:00
lastmod: 2022-05-05T00:18:23+08:00
author: ["koicc"]
keywords: 
- 
categories: 
- linux 
tags: 
- blog
description: ""
weight:
slug: ""
draft: false # 是否为草稿
comments: false
reward: false # 打赏
mermaid: true #是否开启mermaid
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true #顶部显示路径
cover:
    image: "/img/docker.png" #图片路径例如：posts/tech/123/123.png
    caption: "docker" #图片底部描述
    alt: ""
    relative: false
---

- [官方安装脚本](https://docs.docker.com/engine/install/)

  `curl -fsSL https://get.docker.com -o get-docker.sh`

  `sh install-docker.sh --mirror Aliyun`

- 将普通用户xxx添加到 Docker 组中

  `usermod -aG docker xxx`

- Docker面板管理[Portainer-CE中文版](https://hub.docker.com/r/6053537/portainer-ce)

```zsh
docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock 6053537/portainer-ce
```

-----------------------------------------------------------------------

> Docker发行版说明:<https://docs.docker.com/engine/release-notes>
