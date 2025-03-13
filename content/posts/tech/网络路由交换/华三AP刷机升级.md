---
title: "华三AP刷机升级"
date: "2025-03-07"
weight: 2
categories: ["网络路由交换"]
tags: ["h3c", "wlan"]
---

# 以WA5320-SI刷云版本为例

## 1. 进入 Bootroom 菜单
设备上电后，按 `Ctrl+B` 进入 Bootroom 菜单。  
系统会显示以下提示：
```plaintext
BootWare Validating...
Press Ctrl+B to enter extended boot menu...
```

---

## 2. 格式化系统
进入 Bootroom 菜单后，按 `Ctrl+F` 格式化系统。  
系统会显示以下提示：
```plaintext
Ctrl+F: Format File System
```

---

## 3. 更新 BootWare 版本

### 3.1 进入 BootWare 操作子菜单
在 Bootroom 菜单中选择 `7` 进入 BootWare 操作子菜单：
```plaintext
<7> BootWare Operation Menu 
Enter your choice(0-9): 7
```

### 3.2 设置通过网线更新 BootWare
在子菜单中选择 `2`，通过以太网更新 BootWare：
```plaintext
<2> Update BootWare By Ethernet
Enter your choice(0-2): 2
```

### 3.3 进入 TFTP 服务器设置
在子菜单中选择 `4`，修改以太网参数：
```plaintext
<4> Modify Ethernet Parameter  
Enter your choice(0-4): 4
```

### 3.4 设置 TFTP 上传参数
根据提示输入以下参数：
```plaintext
Protocol (FTP or TFTP) : tftp                 // 使用 TFTP 协议上传
Load File Name      : apwa5300_v7.32.btw      // BootWare 版本加载文件名
Target File Name    : apwa5300_v7.32.btw      // BootWare 版本目标文件名
Server IP Address   : 192.168.1.2             // TFTP 服务器地址
Local IP Address    : 192.168.1.3             // AP 的 IP 地址
Subnet Mask         : 255.255.255.0           // 子网掩码
Gateway IP Address  : 0.0.0.0                 // 网关地址
```

### 3.5 更新 BootWare 版本
在子菜单中选择 `1`，更新完整 BootWare：
```plaintext
<1> Update Full BootWare
Enter your choice(0-4): 1
Updating Basic BootWare? [Y/N] Y     // 手动输入 "Y"
Updating Extend BootWare? [Y/N] Y    // 手动输入 "Y"
```

### 3.6 重启 AP 并检查新版本
更新完成后，重启 AP 并检查 BootWare 版本是否更新成功。

---

## 4. 更新 BIN 版本

### 4.1 进入以太网子菜单
在 Bootroom 菜单中选择 `3`，进入以太网子菜单：
```plaintext
<3> Enter Ethernet SubMenu 
Enter your choice(0-9): 3
```

### 4.2 修改以太网参数
根据提示输入以下参数：
```plaintext
Protocol (FTP or TFTP) : tftp                               // 使用 TFTP 协议上传
Load File Name      : WA5300-CMW710-R2449P15-OASIS.ipe      // BIN 版本加载文件名
Target File Name    : WA5300-CMW710-R2449P15-OASIS.ipe      // BIN 版本目标文件名
Server IP Address   : 192.168.1.2                           // TFTP 服务器地址
Local IP Address    : 192.168.1.3                           // AP 的 IP 地址
Subnet Mask         : 255.255.255.0                         // 子网掩码
Gateway IP Address  : 0.0.0.0                               // 网关地址
```

### 4.3 更新 BIN 版本文件
在子菜单中选择 `2`，更新主镜像文件：
```plaintext
<2> Update Main Image File
Enter your choice(0-5): 2
```

### 4.4 更改 AP 模式
在 Bootroom 菜单中按 `Ctrl+Y`，更改 AP 模式：
```plaintext
Ctrl+Y: Change AP Mode
```

---

- 查看 AP 工作模式
`display wlan device role`

- 更改 AP 工作模式
`ap-mode fat`

- 默认 AP 登录密码
`h3capadmin`