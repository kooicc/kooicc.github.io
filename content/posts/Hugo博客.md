---
title: "Hugo博客"
date: 2025-02-10
searchHidden: true
categories:
  - Blog
tags:
  - Hugo
---

## 快速部署Hugo播客

![1](https://gohugo.com.cn/images/hugo-logo-wide.svg)

仓库地址：<https://github.com/kooicc/kooicc.github.io>

网站地址：<https://kooicc.github.io>

1. 克隆GitHub仓库到本地
  `git clone  https://github.com/kooicc/kooicc.github.io.git`
2. 进入文档文件夹编辑文章
  `cd /root/kooicc.github.io/content/posts`
3. git启用凭证存储
  `git config --global credential.helper store`
4. 提交更改到Github
  `git add . && git commit -m "new" && git push -u origin main`

## Hugo主题配置

- [Hugo PaperMod](https://github.com/adityatelange/hugo-PaperMod)

1. 创建新的 Hugo 站点
  `hugo new site MyFreshWebsite --format yaml`
2. 安装PaperMod主题
  `git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod`
3. 替换[hugo.yaml](https://github.com/kooicc/kooicc.github.io/blob/main/hugo.yaml)文件

- [Hugo Stack](https://github.com/CaiJimmy/hugo-theme-stack)

> 官网：<https://gohugo.io>
> GitHub：<https://github.com/gohugoio/hugo>
