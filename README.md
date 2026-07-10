# BI4BOB 业余无线电台 QSO 通联日志

## 项目简介

基于纯前端技术构建的业余无线电台通联日志展示页面，用于记录和展示 BI4BOB 的 QSO 通联记录。页面采用暗色主题设计，包含极光、网格地平线等视觉元素，营造出电波通信的氛围感。

## 功能特性

- 📡 通联日志展示 - 以表格形式清晰展示通联记录（时间、呼号、频段、模式、信号报告、位置、备注）
- 🔍 多字段搜索 - 支持按呼号、频段、模式、位置、备注等任意关键字搜索
- 📄 分页浏览 - 每页显示 10 条记录，支持上一页/下一页导航
- 🕒 实时时钟 - 页面头部显示当前北京时间（自动更新）
- 📁 日志折叠 - 默认收起日志表格，点击"展开日志"或点击标题即可展开，保证背景清晰可见
- 🔗 APRS 追踪 - 底部版权区包含 APRS 超链接，方便追踪 BI4BOB-10 的实时位置

## 技术栈

- HTML5
- CSS3（暗色主题、毛玻璃效果、CSS 动画）
- JavaScript（原生，无第三方依赖）

## 文件结构

/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 交互逻辑
├── background.webp     # 背景图片
├── CRAC.png            # CRAC 徽标（透明背景）
├── favicon.svg         # 网站图标
└── README.md           # 项目说明

## 数据说明

当前日志数据为静态示例数据，共 45 条通联记录，涵盖 JA、HL、VK、BA、VR2、9V、DU、HS、BV、W6、RA、YB、4F、E2、BD、DS、BG、VK、K0、R0、YC、BH4、JA2、HL5、9M2、BX2、BD5、N7、JE1、XV9、HS5、VK4、JA6、HL1、VR2、DU3、JA3、VK5、BH3、9V1、JH1 等 40 余个国家和地区。

### 数据格式

{
  time: "2026-07-10 08:30",    // 通联日期时间
  call: "JA1ABC",              // 对方呼号
  band: "14MHz",               // 频段
  mode: "FT8",                 // 通信模式
  rst: "599",                  // 信号报告
  qth: "Tokyo, Japan",         // 对方位置
  remarks: "Strong signal"     // 备注
}

## 本地运行

直接在浏览器中打开 index.html 即可运行，无需任何构建工具或服务器。

## 自定义配置

### 更换背景图

直接替换 background.webp 文件即可，或在 style.css 中修改 background 属性。

### 添加通联记录

在 script.js 的 qsoLogs 数组中按格式追加新记录：

["2026-07-11 09:30", "W1AW", "14MHz", "SSB", "59", "Connecticut, USA", "Contest QSO"]

## 后续计划

- [ ] 接入后端 API，实现通联记录的云端存储
- [ ] 支持 CSV/ADI 格式日志导入导出
- [ ] 增加通联统计面板（按频段、模式、地区等）

## 关于呼号

BI4BOB 是中华人民共和国个人业余无线电台呼号，QTH 位于上海。

## License

MIT License