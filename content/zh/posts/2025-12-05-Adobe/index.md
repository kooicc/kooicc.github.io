+++
date = "2025-12-05 10:10:29"
lastmod = "2025-12-05 10:10:39"
draft = false
title = "屏蔽Adobe正版弹窗"
+++

1. 卸载（AGS）Adobe Genuine Service软件
2. clash代理软件屏蔽
编辑订阅文件，添加以下规则：  
```yml
- 'DOMAIN-SUFFIX,Adobe.io,REJECT'
- 'DOMAIN-SUFFIX,Adobestats.io,REJECT'
```  
3.火绒拦截
网络防护>自定义规则： 
![adobe](adobe.jpg)
```bash
*.Adobe.io
*.Adobestats.io,REJECT'
```