---
title: "Hugo博客"
date: 2025-02-10
searchHidden: true
categories:
  - Blog
tags:
  - Hugo
---

![hugo](/images/hugo.svg)

## 快速部署Hugo播客

### GitHub仓库：<https://github.com/kooicc/kooicc.github.io>

### Blog播客：<https://kooicc.github.io>

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

3. 替换[hugo.yaml](https://github.com/kooicc/kooicc.github.io/blob/main/hugo.yaml)文件

> 官网：<https://gohugo.io>
>
> GitHub：<https://github.com/gohugoio/hugo>
>
> PaperMod主题：<https://github.com/adityatelange/hugo-PaperMod>
>
> Stack主题：<https://github.com/CaiJimmy/hugo-theme-stack>
