<div align="center">

# 📡 BI4BOB 业余无线电台 · 通联日志站

**一个零依赖、零构建的个人业余无线电 QSO 日志与 QSL 卡片展示站**

[![在线预览](https://img.shields.io/badge/Live%20Demo-kooicc.github.io-1976D2?style=flat-square&logo=github&logoColor=white)](https://kooicc.github.io/)
[![零依赖](https://img.shields.io/badge/Dependencies-0-4CAF50?style=flat-square)](https://github.com/kooicc/kooicc.github.io)
[![无需构建](https://img.shields.io/badge/Build-Not%20Required-E34F26?style=flat-square&logo=html5&logoColor=white)](https://github.com/kooicc/kooicc.github.io)
[![最近更新](https://img.shields.io/badge/Updated-2026--10--22-55E9FF?style=flat-square)](https://github.com/kooicc/kooicc.github.io/commits)

</div>

---

## 目录

- [项目简介](#项目简介)
- [功能一览](#功能一览)
- [快速开始](#快速开始)
- [目录结构](#目录结构)
- [维护通联日志](#维护通联日志)
- [维护 QSL 卡片](#维护-qsl-卡片)
- [个性化改动](#个性化改动)
- [部署上线](#部署上线)
- [常见问题](#常见问题)
- [相关链接](#相关链接)

---

## 项目简介

把每次通联（QSO）的记录和收到的纸质 QSL 卡片搬到网页上，方便自己回看，也方便对方查证。

整个站由 **HTML + CSS + 原生 JavaScript** 三个文件组成，没有框架、没有 npm、没有打包步骤 —— 改完保存、推送到 GitHub 就自动上线。所有日志数据独立放在 `qso_data.json`，日常更新只改这个文件，不用碰代码。

> 💡 **适合谁**：想在 GitHub Pages 上搭一个属于自己的 QSL 查询页，又不想折腾构建工具的火腿（HAM）。

---

## 功能一览

| 功能 | 说明 |
| :--- | :--- |
| 📋 **通联日志表** | 8 列完整呈现：时间、呼号、频率、模式、信号、位置、QSL 收/寄时间。**按时间自动倒序**，无需手动排序 |
| 🔍 **全字段搜索** | 边输入边过滤，覆盖全部 8 个字段；自动忽略大小写（输入 `bi4ajf` 也能命中 `BI4AJF`） |
| 🖼️ **QSL 卡片墙** | 图床上的卡片以网格铺开，点击查看大图；鼠标点击、键盘 <kbd>Enter</kbd> / <kbd>Space</kbd> 都能触发，<kbd>Esc</kbd> 或点击空白处关闭 |
| 🔗 **一键查 QRZ** | 点击表格里的呼号，直接在新标签页打开对方在 QRZ.com 的主页 |
| 📑 **分页浏览** | 每页 10 条，底部显示「当前区间 / 总数 / 页码」，按钮到头自动置灰 |
| 🎴 **折叠式面板** | 「QSL」「QSO」两个标签默认收起，先看壁纸，点开再查数据；再点一次即收起 |
| ⌨️ **键盘友好** | 搜索框内按 <kbd>Esc</kbd> 清空并失焦，大图按 <kbd>Esc</kbd> 关闭 |
| 📱 **自适应布局** | 手机端表格横向滑动查看，导航与页脚自动换行重排 |

## 目录结构

```
kooicc.github.io/
├── index.html          # 页面骨架：标题、标签、表格模板、大图弹层
├── style.css           # 全部样式，配色集中在 :root 变量里
├── script.js           # 数据加载、搜索、分页、卡片墙、弹窗逻辑
├── qso_data.json       # 👈 通联日志数据，日常只改这个文件
├── CRAC.png            # 站徽（透明背景，已压缩至约 109 KB）
└── CRAC.webp           # 站徽的 WebP 版本（约 58 KB），可选替换以进一步减小体积
```

---

## 维护通联日志

编辑 **`qso_data.json`**，它是一个 JSON 数组，每一项是一条长度固定的一维数组：

```json
[
]
```

### 三条规则

1. **没发生的填空字符串 `""`** —— 表格会自动显示灰色的 `—`，不要写 `/`、`N/A` 或 `null`。
2. **追加到数组末尾即可，不用管顺序** —— 脚本加载时按第 1 个字段倒序重排，最新的永远在最顶上。
3. **时间格式必须统一**：`YYYY-MM-DD HH:MM` 或 `YYYY-MM-DD`。排序用字符串比较，`2026-10-9` 会排到 `2026-10-11` 前面，务必写成 `2026-10-09`。

改完建议先校验一遍再提交，避免 JSON 语法错导致整站白屏：

```bash
python -m json.tool qso_data.json > /dev/null && echo "JSON 合法"
```

---

## 维护 QSL 卡片

卡片图片走外部图床（仓库里不含图片文件）。打开 `script.js`，在最顶部找到：

```js
const qslImages = [
  "https://你的图床/NEWCALL.jpg"
];
```

**几点注意：**

- 链接必须是图片的**直链**（响应内容是图片而非 HTML 页面），否则会显示「图片暂时无法加载」。
- **推荐用对方呼号做文件名**（如 `BI4AJF.jpg`），日后排查是哪家电台的卡片一目了然。
- 图床若开了防盗链，浏览器直连会被拒，需要在图床侧放行本页面域名。
- 图片建议压到 300 KB 以内、长边 1000px 左右，卡片墙展示尺寸不大。

---

## 个性化改动

| 想改什么 | 去哪里改 |
| :--- | :--- |
| **主配色**（青色 / 藏青） | `style.css` → `:root` 里的 `--cyan`、`--ink`、`--panel-bg` 等变量，改一处全站生效 |
| **每页条数** | `script.js` → 顶部 `const PAGE_SIZE = 10` |
| **站徽** | 替换 `CRAC.png`；想省流量可把 `index.html` 里的 `<img src="CRAC.png">` 一并改成 `CRAC.webp` |
| **标题 / 页脚** | `index.html` → `.hero-title`（大标题）、`.site-footer`（QRZ / QTH / APRS 链接） |
| **背景壁纸** | `style.css` → `body::before` 里的 `url(...)`，换成任意图片直链即可；取不到图时会回落到深色渐变，不会开天窗 |

---

## 部署上线

本项目托管在 **GitHub Pages**，无需任何付费服务。

1. 把代码推送到 GitHub 仓库（个人主页仓库名固定为 `<用户名>.github.io`）。
2. 进入仓库 **Settings → Pages → Build and deployment**。
3. **Source** 选 `Deploy from a branch`，**Branch** 选 `main`、目录选 `/ (root)`，保存。
4. 等 1–2 分钟，访问 `https://<用户名>.github.io/` 即可。

> 🔔 更新后页面没变化通常是 CDN 缓存，按 <kbd>Ctrl</kbd> + <kbd>F5</kbd> 硬刷新，或等几分钟再试。

---

## 常见问题

| 现象 | 原因与解决办法 |
| :--- | :--- |
| 表格一直显示「正在加载日志数据...」 | 多数是直接双击用 `file://` 打开了。改用 `python -m http.server` 起本地服务器访问 |
| 页面直接显示「数据加载失败」 | JSON 语法出错（常见于漏逗号、用了中文引号）。用 `python -m json.tool qso_data.json` 校验 |
| 新加的记录没排在最上面 | 时间没有补零或格式不统一。写成 `2026-10-09` 而不是 `2026-10-9` |
| 提交后线上还是旧数据 | CDN 缓存未过期，硬刷新或等待几分钟 |
| QSL 卡片显示「图片暂时无法加载」 | 图床直链失效或被防盗链拦截，换链接或在图床侧放行 |
| 手机上表格要左右滑才看得全 | 刻意设计：8 列信息在窄屏放不下，横向滚动比挤成一团更好读 |

---

## 相关链接

| | |
| :--- | :--- |
| 🏠 本站 | <https://kooicc.github.io/> |
| 📇 QRZ 主页 | <https://www.qrz.com/db/BI4BOB> |
| 📍 QTH | <https://www.shanghai.gov.cn/nw2318/index.html> |
| 🛰️ APRS 轨迹 | <https://aprs.fi/#!call=BI4BOB-10> |

---

<div align="center">

操作业余无线电台需取得相应操作证书（A / B / C 类）、电台执照与呼号，请合法合规通联。

**73!** 📻

</div>
