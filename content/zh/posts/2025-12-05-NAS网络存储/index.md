+++
date = '2025-12-05T17:33:29+08:00'
toc = "true"
title = "NAS网络存储"
+++

## 一、NAT（网络地址转换）
NAT（网络地址转换）定义了私有地址如何被转换到公网。NAT 类型决定你从其他对等端与服务的可达性，从而影响在线游戏、P2P 与语音通话。

### 常见的标准 NAT 类型
- 开放网络（无 NAT）
拥有公网 IP，连接性最佳，便于主机房间与直连。

- 全锥型（Full Cone）
稳定的一对一映射；任意外部主机可访问映射端口。

- IP 限制型（Restricted Cone）
仅允许先前由你发起连接的外部 IP 回连。

- 端口限制型（Port-Restricted Cone）
入站必须同时匹配外部 IP 与外部端口。

- 对称型（Symmetric）
针对不同目的地址生成不同映射；对 P2P 最不友好。 

### 如何改善你 NAT 类型
1. 路由器中启用 UPnP(自动)
2. 配置端口转发（手动）
3. DMZ；内网设备完全暴露给公网
4. 设备直连光猫拨号

### 在线NAT检测
- [17NAS](https://17nas.com/nat-test.php)
- [NAT Checker](https://natchecker.com/zh)

## 二、网络互联
- [EasyTier](https://easytier.cn/)  

## 三、DNS域名解析
[SmartDNS](https://github.com/pymumu/smartdns)