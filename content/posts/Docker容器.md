---
title: "Docker容器"
date: 2025-02-20
disableHLJS: false
categories:
  - linux
tags:
  - Docker
---

## Docker Engine安装教程

### [官方脚本一键安装](https://docs.docker.com/engine/install/)

Debian、Ubuntu、CentOS、RHEL、Fedora、Oracle Linux

```shell
curl -fsSL https://get.docker.com -o get-docker.sh`
sh install-docker.sh --mirror Aliyun
```

## Docker管理

[portainer-ce中文版](https://hub.docker.com/r/6053537/portainer-ce)

```bash
docker run -d --restart=always --name="portainer" -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock 6053537/portainer-ce
```
