---
title: "Ctf学习笔记"
date: 2024-07-27T11:41:04+08:00
lastmod: 2024-07-27T11:41:04+08:00
author: ["Startstorm"]
keywords: 
- 
categories: # 没有分类界面可以不填写
- 
tags: # 标签
- tech
description: ""
weight:
slug: ""
draft: false # 是否为草稿
comments: true # 本页面是否显示评论
reward: true # 打赏
mermaid: true #是否开启mermaid
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true #顶部显示路径
cover:
    image: "" #图片路径例如：posts/tech/123/123.png
    zoom: # 图片大小，例如填写 50% 表示原图像的一半大小
    caption: "" #图片底部描述
    alt: ""
    relative: false
---


# 杂项题目（Misc）
## 1、查看文件类型（kali自带）
file 命令<br/>
用法：<br/>
file filename

使用16进制查看文件，根据文件特征码判断文件类型

## 2、分离文件，分析文件

### binwalk 命令（kali自带）
作用：分离文件，分析文件  
用法：  
分析文件：binwalk filename   
分离文件：binwalk -e filename

### foremost 命令（kali自带）
作用：分离文件  
用法：   
foremost 文件名 -o 输出目录名


### dd 命令 （kali自带）
作用：当文件自动分离出错或者因为其他原因无法自动分离时，可以使用dd实现文件手动分离。  
格式：dd if=源文件 of=目标文件名 bs=1 skip=开始分离的字节数  
参数说明：  
if=file   #输入文件名，缺省为标准输入  
of=file   #输入文件名，缺省为标准输出  
bs=bytes  #同时设置读写块的大小为bytes，可替代ibs和obs  
skip=blocks  #从输入文件开头跳过blocks个块后再开始复制  

案例：
```shell
1.txt
1234567890abcdefg

dd if=1.txt of=2.txt bs=5 count=1
=> 2.txt
12345

dd if=1.txt of=3.txt bs=5 count=2
=> 3.txt
1234567890

dd if=1.txt of=4.txt bs=5 count=3 skip=1
=> 4.txt
67890abcdefg
```

### Winhex 或者0101Editor


## 文件合并操作：
1、Linux下的文件合并
cat  合并的文件 > 输出的文件

完整性检测：Linux下计算文件md5
md5sum 文件名

2、Windows下的文件合并
copy /B 合并的文件  输出的文件命令

完整性检测：windows下计算文件md5
certutil -hashfile  文件名  md5

  

条形码识别网站：
https://online-barcode-reader.inliteresearch.com/





