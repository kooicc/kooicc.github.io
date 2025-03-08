---
title: "华三AP刷机升级"
date: "2025-03-08"
weight: 2
categories: ["网络路由交换"]
tags: ["h3c", "wlan"]
---

### 以WA5320-SI刷云版本为例 

1. 进入bootroom菜单
```
BootWare Validating...
Press Ctrl+B to enter extended boot menu...         //设备上电按Ctrl+B进入设备的bootroom菜单
```

2. 格式化系统
```
Ctrl+F: Format File System   //进入bootroom菜单后按Ctrl+F格式化系统。
```

3. 更新bootware版本
  3.1 进入bootware子菜单
```
<7> BootWare Operation Menu 
Enter your choice(0-9): 7
```
  3.2 设置通过网线更新bootware
```
<2> Update BootWare By Ethernet
Enter your choice(0-2): 2
```
  3.3 进入TFTP服务器设置
```
<4> Modify Ethernet Parameter  
Enter your choice(0-4): 4
```
  3.4 设置TFTP上传参数
```
Protocol (FTP or TFTP) :tftp                 //使用TFTP协议上传
Load File Name      :apwa5300_v7.32.btw      //bootware版本加载文件名名称
Target File Name    :apwa5300_v7.32.btw      //bootware版本目标文件名名称
Server IP Address   :192.168.1.2             //TFTP服务器地址
Local IP Address    :192.168.1.3             //AP的IP地址
Subnet Mask         :255.255.255.0           //掩码地址
Gateway IP Address  :0.0.0.0                 //网关地址
```
  3.5 更新bootware版本
```
<1> Update Full BootWare
Enter your choice(0-4): 1
Updating Basic BootWare? [Y/N]Y     //手工输入“Y”
Updating Extend BootWare? [Y/N]Y    //手工输入“Y”
```
  3.6 重启AP查看btw新版本

4. 更新bin版本
  4.1 进入以太口子菜单
```
<3> Enter Ethernet SubMenu 
Enter your choice(0-9): 3
```
  4.2 修改以太口参数
```
Protocol (FTP or TFTP) :tftp                               //使用TFTP协议上传
Load File Name      :WA5300-CMW710-R2449P15-OASIS.ipe      //bin版本加载文件名名称
Target File Name    :WA5300-CMW710-R2449P15-OASIS.ipe      //bin版本目标文件名名称
Server IP Address   :192.168.1.2                           //TFTP服务器地址
Local IP Address    :192.168.1.3                           //AP的IP地址
Subnet Mask         :255.255.255.0                         //掩码地址
Gateway IP Address  :0.0.0.0                               //网关地址
```
  4.3更新bin版本文件
  ```
  <2> Update Main Image File
  Enter your choice(0-5): 2
  ```
  4.4 更改AP模式
  ```
  Ctrl+Y: Change AP Mode //在bootroom按Ctrl+Y更改AP模式
  ```

- 查看ap工作模式
`display wlan device role`

- 更改AP工作模式
`ap-mode fat`

- 默认AP登陆密码
`h3capadmin`