---
title: "Tailscale远程隧道"
date: "2025-04-18"
tags: ["Tailscale"]
---

![Syncthing](/images/syncthing.svg)

1. Linux官方安装脚本
`curl -fsSL https://tailscale.com/install.sh | sh`

2. 自动更新
`tailscale set --auto-update`

3. 禁止使用Tailscale DNS
`tailscale set --accept-dns=false`

-----------------------------------------------------------------------

*引用参考* 
- 控制台：<https://login.tailscale.com/admin/machines>
- 离线安装包：<https://pkgs.tailscale.com/stable>
- 更新日志：<https://tailscale.com/changelog>
- GitHub：<https://github.com/tailscale/tailscale>