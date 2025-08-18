---
title: "Hugo博客搭建"
date: 2025-03-12T00:18:23+08:00
lastmod: 2025-03-13T00:18:23+08:00
author: ["koicc"]
keywords: 
- 
categories: 
- linux 
tags: 
- blog
description: ""
weight:
slug: ""
draft: false # 是否为草稿
comments: false
reward: false # 打赏
mermaid: true #是否开启mermaid
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true #顶部显示路径
cover:
    image: "/images/hugo.png" #图片路径例如：posts/tech/123/123.png
    caption: "" #图片底部描述
    alt: ""
    relative: false
---

## 快速部署Hugo播客

1. 克隆GitHub仓库到本地

   `git clone  https://github.com/kooicc/kooicc.github.io.git`

2. 进入文件夹编辑文章

   `cd /root/kooicc.github.io/content/posts`

3. 启用Git凭证存储

   `git config --global credential.helper store`

4. 提交更改到Github仓库

   `git add . && git commit -m "new" && git push -u origin main`

----------------------------------------------------------------------------------------------------

### Hugo PaperMod主题配置

1. 创建新的 Hugo 站点

   `hugo new site MyFreshWebsite --format yaml`

2. 安装PaperMod主题

   `git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod`

3. 编辑[hugo.yaml](https://github.com/kooicc/kooicc.github.io/blob/main/hugo.yaml)文件

{{< collapse summary="`nano /home/koicc/kooicc.github.io/hugo.yaml`" >}}

```yml
baseURL: "https://kooicc.github.io/"
```

{{</ collapse >}}

----------------------------------------------------------------------------------------

> 官网：<https://gohugo.io>
>
> GitHub：<https://github.com/gohugoio/hugo>
>
> PaperMod主题：<https://github.com/adityatelange/hugo-PaperMod>
>
> Stack主题：<https://github.com/CaiJimmy/hugo-theme-stack>

- [向着悠远的苍穹](https://kdjlyy.github.io/)
- [田少晗的个人博客](https://www.shaohanyun.top/)
- [3rd's Blog](https://www.333rd.net/zh/)
 
> https://github.com/xyming108/sulv-hugo-papermod
> https://github.com/startstorm/startstorm.github.io