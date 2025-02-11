---
title: "Samba文件共享"
date: 2025-02-10
categories:
  - Linux
tags:
  - Samba
---

![1](/images/samba.png)

1. Debian12安装`samba`服务器

   ```bash
   apt update
   apt install samba
   ```

2. 创建Linux普通用户

   ```bash
   useradd -m -s /sbin/nologin xxx
   ```

3. 将该用户添加到 Samba 用户数据库

   ```bash
   smbpasswd -a xxx
   ```

4. 查看 Samba 用户列表

   ```bash
   pdbedit -L
   ```
