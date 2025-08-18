---
title: "Transmission-PT下载与配置指南"
date: "2025-05-25"
tags: 
- Transmission
- PT
categories:
---
## 1. 安装 transmission
### 1.1 transmission-daemon守护程序

```bash
 apt install -y transmission-daemon
```

### 1.2 设置开机自启动并立即启动服务

```bash
 systemctl enable --now transmission-daemon
```

### 1.3 查看 Transmission 服务状态

```bash
systemctl status transmission-daemon
```

---
## 2. 更改配置
### 2.1 编辑*settings.json*配置文件  

<details class="code-block">
<summary>查看settings.json</summary>

```json
{
    "alt-speed-down": 50,
    "alt-speed-enabled": false,
    "alt-speed-time-begin": 540,
    "alt-speed-time-day": 127,
    "alt-speed-time-enabled": false,
    "alt-speed-time-end": 1020,
    "alt-speed-up": 50,
    "anti-brute-force-enabled": true,
    "anti-brute-force-threshold": 3,
    "bind-address-ipv4": "0.0.0.0",
    "bind-address-ipv6": "::",
    "blocklist-enabled": false,
    "blocklist-url": "http://www.example.com/blocklist",
    "cache-size-mb": 32,
    "dht-enabled": false,
    "download-dir": "/tank/pt-movie/data",
    "download-limit": 100,
    "download-limit-enabled": 0,
    "download-queue-enabled": true,
    "download-queue-size": 5,
    "encryption": 1,
    "idle-seeding-limit": 30,
    "idle-seeding-limit-enabled": false,
    "incomplete-dir": "/var/lib/transmission-daemon/Downloads",
    "incomplete-dir-enabled": false,
    "lpd-enabled": false,
    "max-peers-global": 300,
    "message-level": 1,
    "peer-congestion-algorithm": "",
    "peer-id-ttl-hours": 6,
    "peer-limit-global": 200,
    "peer-limit-per-torrent": 50,
    "peer-port": 51413,
    "peer-port-random-high": 65535,
    "peer-port-random-low": 49152,
    "peer-port-random-on-start": false,
    "peer-socket-tos": "default",
    "pex-enabled": false,
    "port-forwarding-enabled": true,
    "preallocation": 1,
    "prefetch-enabled": true,
    "queue-stalled-enabled": true,
    "queue-stalled-minutes": 30,
    "ratio-limit": 2,
    "ratio-limit-enabled": false,
    "rename-partial-files": true,
    "rpc-authentication-required": true,
    "rpc-bind-address": "0.0.0.0",
    "rpc-enabled": true,
    "rpc-host-whitelist": "",
    "rpc-host-whitelist-enabled": true,
    "rpc-password": "{9438398efc9ded243de87ac688c5ff9b31f804fc10SuRj2T",
    "rpc-port": 9091,
    "rpc-url": "/transmission/",
    "rpc-username": "koicc",
    "rpc-whitelist": "127.0.0.1,::1",
    "rpc-whitelist-enabled": false,
    "scrape-paused-torrents-enabled": true,
    "script-torrent-done-enabled": false,
    "script-torrent-done-filename": "",
    "seed-queue-enabled": false,
    "seed-queue-size": 10,
    "speed-limit-down": 100,
    "speed-limit-down-enabled": false,
    "speed-limit-up": 100,
    "speed-limit-up-enabled": false,
    "start-added-torrents": true,
    "trash-original-torrent-files": false,
    "umask": 18,
    "upload-limit": 100,
    "upload-limit-enabled": 0,
    "upload-slots-per-torrent": 14,
    "utp-enabled": true,
    "watch-dir": "/tank/pt-movie/watch-transmission",
    "watch-dir-enabled": true
}

```

</details>

### 2.2 配置文件位置

**主要配置文件**  
`/etc/transmission-daemon/settings.json`

**用户配置链接文件**  
`/var/lib/transmission-daemon/.config/transmission-daemon/settings.json`

### 2.3 查看 Transmission 用户信息

```bash
id debian-transmission
```

### 2.4 更改配置文件权限

```bash
 chown -R debian-transmission:debian-transmission /var/lib/transmission-daemon/.config/transmission-daemon/
```

### 2.5 创建下载目录
  建议下载目录权限设置为最低，且不属于任何用户，以增强安全性。

```bash
 install -o nobody -g nogroup -d /path/to/your/download/folder
```


### 2.6 重启服务
```bash
 systemctl restart transmission-daemon
```

---

## 3. 美化 Transmission Web 界面  
### 3.1 下载脚本

```bash
wget https://github.com/ronggang/transmission-web-control/raw/master/release/install-tr-control.sh --no-check-certificate
```

### 3.2 运行脚本安装

```bash
bash install-tr-control.sh
```

安装完成后，刷新 Transmission Web 界面，即可体验更友好的界面和更多功能。

---

### 参考链接

* [Transmission 官网](https://transmissionbt.com)
* [Transmission 发行说明](https://github.com/transmission/transmission/releases/)
* [transmission-web-control 美化项目](https://github.com/ronggang/transmission-web-control)  

---
