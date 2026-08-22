/**
 * BI4BOB QSL 卡片状态查询
 * 数据格式：时间(UTC), 呼号, 频率, 模式, 信号, 位置, 寄出日期, 收到日期
 */

const qsoLogs = [
  // === 已寄出（10条） ===
  // BH4GDY - 从CSV中未找到对应记录，保留占位
  ["2026-08-22", "BH4GDY", "/", "/", "/", "上海", "2026-08-22", ""],
  
  // BH4GUW - 从CSV中未找到对应记录，保留占位
  ["2026-08-22", "BH4GUW", "/", "/", "/", "上海", "2026-08-22", ""],
  
  // BH4ECL - 来自CSV: 2026-08-16 12:00:31
  ["2026-08-16 12:00", "BH4ECL", "14.075", "FT8", "", "上海", "2026-08-22", ""],
  
  // BA7SAY - 来自CSV: 2026-08-16 12:48:45
  ["2026-08-16 12:48", "BA7SAY", "14.075", "FT8", "", "广西-梧州", "2026-08-22", ""],
  
  // BI4BGJ - 从CSV中未找到对应记录，保留占位
  ["2026-08-16 13:36", "BI4BGJ", "14.075", "FT8", "", "上海", "2026-08-22", ""],

  // BD8FOD - 来自CSV: 2026-08-16 14:29:15
  ["2026-08-16 14:29", "BD8FOD", "14.075", "FT8", "", "四川-成都", "2026-08-22", ""],
  
  // BG2MGR - 来自CSV: 2026-08-19 09:49:00
  ["2026-08-19 09:49", "BG2MGR", "14.075", "FT8", "", "吉林-长春市", "2026-08-22", ""],
  
  // BI4IXO - 来自CSV: 2026-08-17 00:40:00
  ["2026-08-17 00:40", "BI4IXO", "14.075", "FT8", "", "山东-威海", "2026-08-22", ""],
  
  // BH6AWZ - 来自CSV: 2026-08-17 00:52:45
  ["2026-08-17 00:52", "BH6AWZ", "14.075", "FT8", "", "安徽-六安市", "2026-08-22", ""],
  
  // BI4AEL - 来自CSV: 2026-08-17 16:40:00
  ["2026-08-17 16:40", "BI4AEL", "14.075", "FT8", "", "上海", "2026-08-22", ""],
  
  // === 已收到（1条） ===
  // BI4BOB - 你自己的呼号
  ["2026-08-22", "BI4BOB", "/", "/", "/", "中国", "", "2026-08-22"]
].map(([time, call, freq, mode, rst, qth, sent_date, received_date]) => ({
  time, call, freq, mode, rst, qth, sent_date, received_date
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

function formatDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return '/';
  return dateStr;
}

function renderLogs() {
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visibleLogs = filteredLogs.slice(start, start + pageSize);

  logBody.innerHTML = visibleLogs.map(log => {
    const sentDisplay = formatDate(log.sent_date);
    const receivedDisplay = formatDate(log.received_date);
    
    const sentHtml = sentDisplay !== '/' 
      ? `<span class="sent-date">${sentDisplay}</span>` 
      : `<span class="empty-date">/</span>`;
    
    const receivedHtml = receivedDisplay !== '/' 
      ? `<span class="received-date">${receivedDisplay}</span>` 
      : `<span class="empty-date">/</span>`;

    const freqDisplay = log.freq && log.freq.trim() !== '' ? log.freq : '/';
    const modeDisplay = log.mode && log.mode.trim() !== '' ? log.mode : '/';
    const rstDisplay = log.rst && log.rst.trim() !== '' ? log.rst : '/';

    return `
    <tr>
      <td class="time-cell">${escapeHTML(log.time)}</td>
      <td class="call-cell">${escapeHTML(log.call)}</td>
      <td class="freq-cell">${escapeHTML(freqDisplay)}</td>
      <td><span class="mode-pill">${escapeHTML(modeDisplay)}</span></td>
      <td class="rst">${escapeHTML(rstDisplay)}</td>
      <td title="${escapeHTML(log.qth)}">${escapeHTML(log.qth)}</td>
      <td>${sentHtml}</td>
      <td>${receivedHtml}</td>
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
        log.sent_date,
        log.received_date,
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