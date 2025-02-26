---
title: Windows更改最大路径长度限制
category: Windows
tags: System
index_img: /img/windows.png
---
在 Windows 10 版本 1607 及更高版本中启用长路径
```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```
> [https://learn.microsoft.com/](https://learn.microsoft.com/zh-cn/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell)

Windows跳过联网账号登录

## 特殊账号，密码随意
- `1@1.com`
- `no@3Q.com`
- `no@thankyou.com`
## 在OOBE阶段使用命令跳过
按 Shift+F10 打开命令提示符 输入`oobe\bypassnro`按回车确认



- 禁用系统自动更新(注册表)
暂停更新

- 禁用驱动自动更新(组策略gpedit.msc)
Windows10`计算机配置`>`管理模板`>`Windows 组件`>`Windows更新`>`Windows 更新不包括驱动程序`，>选择`启用`
Windows11`计算机配置`>`管理模板`>`Windows 组件`>`Windows更新`>`管理从Windows更新提供的更新`>`Windows 更新不包括驱动程序`，>选择`启用`

- 禁用驱动自动更新（简易方法）

  搜索`更改设备安装设置`>选择`否`

[windows-update-blocker](https://www.sordum.org/9470/windows-update-blocker-v1-8/)