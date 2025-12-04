---
title: "Docker容器"
date: "2025-02-02"
categories: ["linux"]
tags: ["Docker"]
---

![docker](/images/docker.png)

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
