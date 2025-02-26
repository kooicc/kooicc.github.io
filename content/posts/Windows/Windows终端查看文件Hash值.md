---
title: Windows终端查看文件Hash值.md
category: Windows
tags: Hash 哈希校验
index_img: /img/windows.png
---
在文件夹内打开Powershell窗口*Shift+右击*

```powershell
Get-FileHash test.txt -Algorithm MD5
Get-FileHash test.txt -Algorithm SHA1
Get-FileHash test.txt -Algorithm SHA256
```
