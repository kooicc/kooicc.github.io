---
title: "Samba文件共享"
date: "2025-02-12"
tags: ["Samba"]
categories: ["Linux"]
---

![samba](/images/samba.png)

1. Debian12安装[Samba](https://www.samba.org/samba/)服务器

   ```bash
   apt update
   apt install samba
   ```

2. 创建Linux用户(可选)

   ```bash
   #创建一个xxx用户
   useradd -m -s /sbin/nologin xxx
   #创建一个smb用户组
   groupadd smb
   #将xxx用户加入smb组
   usermod -aG smb xxx
   #更改目录所属组为smb
   chgrp smb /mnt/path
   ```

3. 将该用户添加到 Samba 用户数据库

   ```bash
   smbpasswd -a koicc
   ```

4. 查看 Samba 用户列表

   ```bash
   pdbedit -L
   ```

5. 备份编辑`smb.conf`文件

   - cp /etc/samba/smb.conf{,-backup}

   - nano /etc/samba/smb.conf

   ```bash
   [share] #共享名称
     path = /mnt/ #路径
     comment = raid #描述
     browseable = yes #允许在网络浏览中显示
     writable = yes #允许写入
     read only = no #禁止只读
     guest ok = no #禁用匿名访问
     create mask = 0700 #创建文件权限掩码
     directory mask = 0700 #创建目录权限掩码
     valid users = koicc #指定允许访问的用户，多个用户使用空格分隔
   ```

6. 重启Samba服务

   ```bash
   systemctl daemon-reload && systemctl restart smbd
   ```

--------------------------------------------------------------------------------------

> 部分引用：<https://littlenewton.uk/2024/12/tutorial-samba-server-configuration/>
