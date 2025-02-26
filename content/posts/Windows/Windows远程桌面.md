---
title: Windows远程桌面
category: Windows
tags: 远程访问
index_img: /img/windows.png
---
## Windows远程桌面默认端口3389

### 更改远程桌面(RDP)端口为3399

1. 注册表`regedit`
`计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp`
在右侧找到`PortNamber`，修改十进制为`3399`
2. 本地服务`services.msc`
重启远程桌面连接服务`Remote Desktop Services`
