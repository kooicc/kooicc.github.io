---
title: "syncthing文件同步器"
date: "2025-03-24"
tags: ["syncthing"]
---

![syncthing](/images/syncthing.svg)

Debian/Ubuntu Packages

```
# Add the release PGP keys:
mkdir -p /etc/apt/keyrings
curl -L -o /etc/apt/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg

# Add the "stable" channel to your APT sources:
echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list

# Update and install syncthing:
apt update && apt upgrade -y
```
-----------------------------------------------------------------------

> 引用参考
> <https://apt.syncthing.net/>
> https://syncthing.net/
> https://github.com/syncthing/syncthing
