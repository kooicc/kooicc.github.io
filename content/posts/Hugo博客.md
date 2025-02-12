---
title: "Hugo博客"
date: "2025-02-01"
weight: 1
categories: ["Blog"]
tags: ["Hugo"]
---

![hugo](/images/hugo.png)

### 快速部署Hugo播客

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
title: "秋雨夜眠的Blog"
copyright: "©1996 - 2025"
pagination:
  pagerSize: 10
theme: [PaperMod]

enableInlineShortcodes: true
enableRobotsTXT: true
buildDrafts: false
buildFuture: false
buildExpired: false
enableEmoji: true
pygmentsUseClasses: true
mainsections: ["posts", "papermod"]

minify:
  disableXML: true

languages:
  zh:
    languageName: "博客"
    weight: 1
    taxonomies:
      category: categories
      tag: tags
      series: series
    menu:
      main:
        - name: 搜索
          url: search/
          weight: 5
        - name: 分类
          url: categories/
          weight: 10
        - name: 标签
          url: tags/
          weight: 10
  fr:
    languageName: "主页"
    weight: 2
    title:
#    menu:
#      main:
#        - name: DXP4800
#          url: https://koicc.cn16.ug.link/desktop/#/login/account
#          target: "_blank"  
#          weight: 5

    params:
      languageAltTitle: 博客
      profileMode:
        enabled: true
        title: Gentoo
        imageUrl: "https://s3.bmp.ovh/imgs/2023/11/17/d155cee23d2cfc0a.jpg"
        imageTitle: 夜
        subtitle:
        buttons:
          - name: Hi
            url: /

outputs:
  home:
    - HTML
    - RSS
    - JSON

params:
  env: production
  description: "hugo-Blog"
  author: "☁️ "
  defaultTheme: auto
  ShowShareButtons: false
  ShowReadingTime: false
  displayFullLangName: true
  ShowPostNavLinks: true
  ShowBreadCrumbs: true
  searchHidden: true
  ShowCodeCopyButtons: true
  ShowRssButtonInSectionTermList: false
  ShowAllPagesInArchive: true
  ShowPageNums: true
  ShowToc: true
  images: ["images/papermod-cover.png"]

  profileMode:
    enabled: false
    imageUrl: "#"
    imageTitle: 我的图片
    buttons:
      - name: 归档
        url: archives
      - name: 标签
        url: tags

  homeInfoParams:
    Content: >
      ![](https://ziyuan.guwendao.net/siteimg/24jie/%E9%9B%A8%E6%B0%B4.jpg)

  assets:
    disableHLJS: false
  fuseOpts:
    isCaseSensitive: false
    shouldSort: true
    location: 0
    distance: 1000
    threshold: 0.4
    minMatchCharLength: 0
    keys: ["title", "permalink", "summary", "content"]

defaultContentLanguage: "zh" # 默认内容语言设置为中文
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
