/**
 * BI4BOB QSL 卡片状态查询
 * 数据格式：时间(UTC), 呼号, 频率, 模式, 信号, 位置(中文), QSL状态
 */

const qsoLogs = [
  ["2026-07-10 00:30", "JA1ABC", "14.270", "FT8", "599", "日本 东京", "寄出"],
  ["2026-07-09 23:52", "HL2KCS", "7.050", "CW", "579", "韩国 首尔", "已收已寄"],
  ["2026-07-09 15:18", "VK3DX", "21.200", "SSB", "57", "澳大利亚 墨尔本", ""],
  ["2026-07-09 13:46", "BA4TB", "14.180", "FT8", "+08", "中国 上海", "已收已寄"],
  ["2026-07-09 12:11", "VR2XMT", "50.150", "SSB", "59", "中国 香港", "寄出"],
  ["2026-07-09 10:36", "9V1YC", "28.750", "FT8", "-04", "新加坡", ""],
  ["2026-07-09 08:04", "DU1IST", "21.350", "CW", "559", "菲律宾 马尼拉", "寄出"],
  ["2026-07-09 06:25", "HS0ZIV", "14.220", "SSB", "58", "泰国 曼谷", "已收已寄"],
  ["2026-07-09 04:47", "BV2A", "7.100", "FT8", "+02", "中国 台北", ""],
  ["2026-07-09 02:19", "JH4UYB", "18.100", "CW", "579", "日本 冈山", "寄出"],
  ["2026-07-08 15:52", "W6AFA", "14.250", "FT8", "-11", "美国 加州", "已收已寄"],
  ["2026-07-08 14:31", "RA0FF", "7.080", "CW", "569", "俄罗斯 萨哈林", ""],
  ["2026-07-08 12:44", "YB0AZ", "21.280", "SSB", "56", "印度尼西亚 雅加达", "寄出"],
  ["2026-07-08 11:08", "4F3BZ", "14.330", "FT8", "-07", "菲律宾 宿务", "已收已寄"],
  ["2026-07-08 09:22", "E21EIC", "28.500", "CW", "599", "泰国 曼谷", ""],
  ["2026-07-08 07:41", "BD4UJ", "50.250", "SSB", "59", "中国 苏州", "寄出"],
  ["2026-07-08 05:16", "DS5USH", "18.150", "FT8", "-03", "韩国 釜山", "已收已寄"],
  ["2026-07-08 03:38", "JA7QVI", "21.400", "SSB", "57", "日本 仙台", ""],
  ["2026-07-08 01:55", "BG5TOX", "7.150", "CW", "589", "中国 杭州", "寄出"],
  ["2026-07-08 00:12", "VK6LW", "14.080", "FT8", "-15", "澳大利亚 珀斯", "已收已寄"]
].map(([time, call, freq, mode, rst, qth, remarks]) => ({
  time, call, freq, mode, rst, qth, remarks
}));

const pageSize = 10;
let currentPage = 1;
let filteredLogs = [...qsoLogs];

const logBody = document.getElementById("logBody");
const searchInput = document.getElementById("callsignSearch");
const logTitle = document.getElementById("logTitle");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const rangeInfo = document.getElementById("rangeInfo");
const totalInfo = document.getElementById("totalInfo");
const emptyState = document.getElementById("emptyState");
const logContainer = document.getElementById("logContainer");
let isLogExpanded = false;

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function renderLogs() {
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visibleLogs = filteredLogs.slice(start, start + pageSize);

  logBody.innerHTML = visibleLogs.map(log => {
    let statusHtml = '';
    if (log.remarks === '寄出') {
      statusHtml = `<span class="status-sent"><span class="dot blue"></span>寄出 <small>(Sent)</small></span>`;
    } else if (log.remarks === '已收已寄') {
      statusHtml = `<span class="status-both">已收已寄 <small>(Received & Sent)</small></span>`;
    } else {
      statusHtml = '';
    }

    return `
    <tr>
      <td class="time-cell">${escapeHTML(log.time)}</td>
      <td class="call-cell">${escapeHTML(log.call)}</td>
      <td class="freq-cell">${escapeHTML(log.freq)}</td>
      <td><span class="mode-pill">${escapeHTML(log.mode)}</span></td>
      <td class="rst">${escapeHTML(log.rst)}</td>
      <td title="${escapeHTML(log.qth)}">${escapeHTML(log.qth)}</td>
      <td>${statusHtml}</td>
    </tr>`;
  }).join("");

  emptyState.hidden = filteredLogs.length !== 0;
  totalInfo.textContent = filteredLogs.length;
  rangeInfo.textContent = filteredLogs.length ? `${start + 1}–${start + visibleLogs.length}` : "0–0";
  pageInfo.textContent = `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || filteredLogs.length === 0;
}

function toggleLog() {
  isLogExpanded = !isLogExpanded;
  logContainer.classList.toggle("collapsed", !isLogExpanded);
  logTitle.classList.toggle("expanded", isLogExpanded);

  const icon = logTitle.querySelector(".btn-icon");
  icon.textContent = isLogExpanded ? '▲' : '▼';

  searchInput.value = "";
  filteredLogs = [...qsoLogs];
  currentPage = 1;
  renderLogs();
  searchInput.blur();

  if (isLogExpanded && logBody.children.length === 0) {
    renderLogs();
  }
}

logTitle.addEventListener("click", toggleLog);

searchInput.addEventListener("focus", () => {
  if (!isLogExpanded) {
    toggleLog();
  }
});

searchInput.addEventListener("input", event => {
  const keyword = event.target.value.trim().toUpperCase();
  if (!keyword) {
    filteredLogs = [...qsoLogs];
  } else {
    filteredLogs = qsoLogs.filter(log => {
      const searchable = [
        log.call,
        log.freq,
        log.mode,
        log.qth,
        log.remarks,
        log.rst,
        log.time
      ].join(" ").toUpperCase();
      return searchable.includes(keyword);
    });
  }
  currentPage = 1;
  renderLogs();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) { currentPage -= 1; renderLogs(); }
});

nextBtn.addEventListener("click", () => {
  if (currentPage * pageSize < filteredLogs.length) { currentPage += 1; renderLogs(); }
});

logContainer.classList.add("collapsed");
renderLogs();

// 生成星星背景
const stars = document.createElement("div");
stars.className = "stars";
for (let i = 0; i < 120; i++) {
  let star = document.createElement("span");
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 70 + "%";
  star.style.animationDelay = Math.random() * 5 + "s";
  stars.appendChild(star);
}
document.body.appendChild(stars);