---
title: "Hugo博客仓库CI CD流水线搭建"
date: 2024-05-29T17:41:05+08:00
lastmod: 2024-05-29T17:41:05+08:00
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

# 需求
想更新完hugo博客后，push到Github仓库 （ https://github.com/startstorm/my-hugo-papermod ） 后，Github仓库自动执行hugo命令生成public文件，并把public文件夹内的内容推送到github个人主页的仓库（ https://github.com/startstorm/startstorm.github.io ）

# Github Action
Github提供了一个功能，Github Action可以帮助我们实现需求
- 1、在仓库的根目录下创建.github文件夹（注意有个点）
- 2、在.github文件夹下创建workflows文件夹
- 3、在workflows文件夹下，创建hugo.yml文件，文件内容如下
```shell
# Sample workflow for building and deploying a Hugo site to GitHub Pages
# 这是我们Actions的名字
name: Deploy Hugo site to Pages

# Allows you to run this workflow manually from the Actions tab
# 表示手动触发Github Action
on: workflow_dispatch


# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  buildAndDeploy:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.125.3
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      # 这里使用其他人写的Github Action方法，执行hugo命令
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify
      
      # 这里使用其他人写的传文件Github Action方法，把我们生成的public文件夹的内容推送到startstorm/startstorm.github.io仓库master分支
      # 这里是需要配置密钥（PERSONAL_TOKEN），配置步骤见第4步
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          deploy_key: ${{ secrets.PERSONAL_TOKEN }}
          external_repository: startstorm/startstorm.github.io
          publish_branch: master  # default: gh-pages
          publish_dir: ./public
```
- 4、配置Github的密钥

通过ssh-keygen生成私钥和公钥，因为我们希望my-hugo-papermod仓库生成的内容推送到startstorm.github.io仓库，所以my-hugo-papermod仓库放私钥，startstorm.github.io仓库放公钥。

在my-hugo-papermod仓库Settings页面，找到Secrets and variables栏目下的Actions，里面有Repository secrets，点击New repository secret按钮创建私钥文件，并把私钥命名为PERSONAL_TOKEN（这个名字是其他人写的Github Action的要求）。

在startstorm.github.io仓库Settings页面，找到Deploy keys栏目，点击Add deploy key按钮新建公钥文件，把公钥内容粘贴进来。

- 5、手动触发Github Action

当更新了文章或者内容push到my-hugo-papermod仓库后，点击进入仓库的Actions页面，左侧会有名为Deploy Hugo site to Pages的Actions，点击Run workflow，就会执行该Action
