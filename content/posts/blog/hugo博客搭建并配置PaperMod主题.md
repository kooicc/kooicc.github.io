---
title: "Hugo博客搭建并配置PaperMod主题"
date: 2024-05-10T19:20:46+08:00
lastmod: 2024-05-10T19:20:46+08:00
author: ["Startstorm"]
keywords: 
- 
categories: # 没有分类界面可以不填写
- 
tags: # 标签
- blog
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
# 博客搭建

本博客直接使用sulvblog的github仓库源码修改而来。

&ensp;&ensp;尝试直接拉取ParperMod主题的仓库，在Windows上执行hugo server总是报错，无法运行。
于是直接sulvblog的修改好的PaperMod主题源码，不在报错。

参考链接如下：
https://www.sulvblog.cn/posts/blog/build_hugo/

执行`hugo server -p 80`，打开浏览器访问http://localhost就可以访问到

# 写文章

新建一篇文章可以使用`hugo new`命令
``` shell
hugo new hello-world.md
```
就可以在content文件夹下新建一个hello-world的markdown文件。
如果我们content文件夹下有其他文件夹，比如路径为`content/post/blog`，想把文章新建到该文件夹下，使用
``` shell
hugo new posts/blog/hello-world.md
```

# hugo端口号修改

hugo默认端口号是1313，在hugo server后加上-p 80参数，`hugo server -p 80` ，就可以将默认端口号改为80

# hugo生成静态资源，并修改静态资源内的端口号

&ensp;&ensp;如果在hugo的配置文件config.yaml的url不写明端口，那么直接·hugo·命令生成的静态资源就是默认的1313端口，如果直接放到云服务上通过nginx进行部署，那么nginx开放80端口就无法直接访问到。<br />
&ensp;&ensp;但是，经过测试发现，如果先执行`hugo server -p 80`，再执行`hugo`命令，那么生成的静态资源的端口号为80。<br />
&ensp;&ensp;如果执行`hugo server -p 443`，再执行`hugo`命令，生成的静态资源端口号为443。






