# 个人业余无线电台 

**纯静态网页，用来查询展示收到的 QSL 卡片及其通联记录。**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-1976D2?style=flat-square&logo=github&logoColor=white)]()
[![Stars](https://img.shields.io/github/stars/kooicc/kooicc.github.io?style=flat-square&logo=github&logoColor=white)]()
[![Forks](https://img.shields.io/github/forks/kooicc/kooicc.github.io?style=flat-square&logo=github&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-3DA639?style=flat-square)](LICENSE)

[功能一览](#功能一览) · [部署上线](#部署上线) · [维护通联记录](#维护通联记录) · [维护 QSL 卡片](#维护-qsl-卡片) · [常见定制项](#常见定制项)

![站点预览](https://s3.bmp.ovh/2026/10/26/RKrkEp1e.webp)

## 功能一览

- QSO 日志表：通联时间、呼号、频率、模式、信号、位置、QSL 收/寄时间，按时间自动倒序
- 全字段搜索，边输入边过滤，忽略大小写
- QSL 卡片墙，点击看大图，Esc 或点空白处关闭
- 点击呼号跳转 QRZ 查询
- 背景为每日必应，每天自动更新

## 文件结构

```
index.html      页面结构
style.css       全部样式（配色在文件顶部 :root 里）
script.js       数据加载、搜索、分页、卡片墙、弹窗
qso_data.json   通联数据，日常只改这个
CRAC.webp       站徽，同时用作浏览器标签图标
```

## 部署上线

1. 文件推送到 GitHub 仓库
2. Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`、目录 `/ (root)`，保存
3. 等 1–2 分钟，访问 `https://<用户名>.github.io/`

## 通联记录

编辑 `qso_data.json`，每行 8 个字段，顺序固定：

```json
["通联时间", "XX0ABC", "14.074", "FT8", "-05", "某省-某市", "QSL 收到时间", "QSL 寄出时间"]
```

改完先校验一次 JSON，语法错会让整页显示「数据加载失败」。

## QSL 卡片

图片放外部图床，仓库里不存图。页面会自动找出所有填了 QSL 日期的呼号，拼成地址：

```
<图床地址><呼号>.jpg
```

所以只要两步：扫描件按 `呼号.jpg` 命名上传图床，再在数据里给这条记录填上 QSL 日期。换图床改 `script.js` 顶部：

```js
const QSL_IMAGE_BASE_URL = "https://<图床直链>/";
```

取不到的图会自动隐藏。建议压到长边 1000px、300 KB 以内。

## 注意事项

**必须取得业余无线电证书，代码可自由参考， QSL 图片通联记录请勿转载！**
