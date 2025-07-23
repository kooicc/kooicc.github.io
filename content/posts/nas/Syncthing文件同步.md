---
title: "Syncthing文件同步器"
date: "2025-04-18"
tags: ["Syncthing"]
---

![Syncthing](/images/syncthing.svg)

## Debian/Ubuntu Packages

```bash
mkdir -p /etc/apt/keyrings
curl -L -o /etc/apt/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg
echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | tee /etc/apt/sources.list.d/syncthing.list
apt update && apt upgrade -y
```
-----------------------------------------------------------------------

*引用参考* 
  > https://syncthing.net  
  > https://apt.syncthing.net    
  > https://github.com/syncthing/syncthing