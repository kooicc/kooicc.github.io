/**
 * BI4BOB QSL 卡片状态查询
 * 数据格式：时间(UTC), 呼号, 频率, 模式, 信号, 位置(国家/地区), QSL状态
 * 状态可选：""（未处理）、"寄出"、 "完成"
 */

const qsoLogs = [
  // === 2026-08-19 ===
  ["2026-08-19 14:41", "YC7PBL", "14.077", "FT8", "-12", "印尼", ""],
  ["2026-08-19 14:08", "JA8JNU", "14.076", "FT8", "-9", "日本", ""],
  ["2026-08-19 14:04", "HL5BMX", "14.076", "FT8", "1", "韩国", ""],
  ["2026-08-19 10:38", "JR5MJS", "14.076", "FT8", "-14", "日本", ""],
  ["2026-08-19 10:32", "YC1IFR", "14.076", "FT8", "-9", "印尼", ""],
  ["2026-08-19 10:25", "JR4EFA", "14.075", "FT8", "12", "日本", ""],
  ["2026-08-19 10:11", "W1AW/KH6", "14.076", "FT8", "-1", "美国夏威夷", ""],
  ["2026-08-19 10:08", "8C81ST", "14.076", "FT8", "-8", "印尼", ""],
  ["2026-08-19 10:07", "JG2CHE", "14.076", "FT8", "-7", "日本", ""],
  ["2026-08-19 09:58", "JH2BUF", "14.075", "FT8", "-2", "日本", ""],
  ["2026-08-19 09:49", "BG2MGR", "14.076", "FT8", "-7", "中国", ""],
  ["2026-08-19 09:15", "VK6BAD", "14.075", "FT8", "-16", "澳大利亚", ""],
  ["2026-08-19 08:45", "KG6JDX", "14.075", "FT8", "-7", "美国", ""],
  ["2026-08-19 08:43", "NL8F", "14.075", "FT8", "-14", "美国阿拉斯加", ""],
  ["2026-08-19 08:39", "BV7RR", "14.075", "FT8", "-1", "中国台湾", ""],
  ["2026-08-19 08:37", "JA2INL", "14.075", "FT8", "-1", "日本", ""],
  ["2026-08-19 08:35", "CX6TU", "14.075", "FT8", "-15", "乌拉圭", ""],
  // === 2026-08-18 ===
  ["2026-08-18 11:52", "JA8IUB", "14.075", "FT8", "", "日本", ""],
  ["2026-08-18 11:35", "BG5FCH", "14.075", "FT8", "", "浙江省·台州市", ""],
  // === 2026-08-17 ===
  ["2026-08-17 17:33", "BG7ZHS", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 16:40", "BI4AEL", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 12:43", "JH1IFS", "14.075", "FT8", "", "日本", ""],
  ["2026-08-17 12:27", "JH7RTQ", "14.075", "FT8", "", "日本", ""],
  ["2026-08-17 11:52", "JM1SZY", "14.075", "FT8", "", "日本", ""],
  ["2026-08-17 11:35", "BG5IOG", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 04:42", "JA3SIA", "14.075", "FT8", "", "日本", ""],
  ["2026-08-17 04:40", "HL4GAV", "14.075", "FT8", "", "韩国", ""],
  ["2026-08-17 03:17", "BA6KC", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 02:56", "BA4QVC", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 02:34", "JA6VQA", "14.075", "FT8", "", "日本", ""],
  ["2026-08-17 01:59", "BG4UCZ", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 01:43", "JA9DGI", "14.075", "FT8", "", "日本", ""],
  ["2026-08-17 01:19", "BG5BNW", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 00:52", "BH6AWZ", "14.075", "FT8", "", "中国", ""],
  ["2026-08-17 00:50", "JA6JNF", "14.075", "FT8", "", "日本", ""],
  ["2026-08-17 00:40", "BI4IXO", "14.075", "FT8", "", "中国", ""],
  // === 2026-08-16 ===
  ["2026-08-16 15:59", "JA8BSK", "14.075", "FT8", "", "日本", ""],
  ["2026-08-16 15:50", "HS9XKG", "14.075", "FT8", "", "泰国", ""],
  ["2026-08-16 15:11", "BI4MRE", "14.075", "FT8", "", "中国", ""],
  ["2026-08-16 14:53", "BH7LGV", "14.075", "FT8", "", "中国", ""],
  ["2026-08-16 14:29", "BD8FOD", "14.075", "FT8", "", "中国", ""],
  ["2026-08-16 14:25", "DV6YDG", "14.075", "FT8", "", "菲律宾", ""],
  ["2026-08-16 13:06", "YB7WW", "14.075", "FT8", "", "印尼", ""],
  ["2026-08-16 12:48", "BA7SAY", "14.075", "FT8", "", "中国", ""],
  ["2026-08-16 12:43", "VR2VAZ", "14.075", "FT8", "", "中国香港", ""],
  ["2026-08-16 12:41", "BG7BMG", "14.075", "FT8", "", "中国", ""],
  ["2026-08-16 12:38", "JI1MAC", "14.075", "FT8", "", "日本", ""],
  ["2026-08-16 12:00", "BH4ECL", "14.075", "FT8", "", "中国", "寄出"],
  ["2026-08-16 10:34", "JG5VFK", "14.075", "FT8", "", "日本", ""]
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
    } else if (log.remarks === '完成') {
      statusHtml = `<span class="status-done">完成 <small>(Done)</small></span>`;
    } else {
      statusHtml = `<span class="status-empty">/</span>`;
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