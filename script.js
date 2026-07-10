/**
 * BI4BOB QSO Log
 * 当前数据保存在前端。将来接入 API 时，只需用接口结果替换 qsoLogs 数组，
 * 搜索、分页和表格渲染逻辑无需改变。
 */

const qsoLogs = [
  ["2026-07-10 08:30", "JA1ABC", "14MHz", "FT8", "599", "Tokyo, Japan", "Strong signal"],
  ["2026-07-10 07:52", "HL2KCS", "7MHz", "CW", "579", "Seoul, Korea", "Clean keying"],
  ["2026-07-09 23:18", "VK3DX", "21MHz", "SSB", "57", "Melbourne, Australia", "Good propagation"],
  ["2026-07-09 21:46", "BA4TB", "14MHz", "FT8", "+08", "Shanghai, China", "Local QSO"],
  ["2026-07-09 20:11", "VR2XMT", "50MHz", "SSB", "59", "Hong Kong, China", "Clear audio"],
  ["2026-07-09 18:36", "9V1YC", "28MHz", "FT8", "-04", "Singapore", "Band opening"],
  ["2026-07-09 16:04", "DU1IST", "21MHz", "CW", "559", "Manila, Philippines", "Light QSB"],
  ["2026-07-09 14:25", "HS0ZIV", "14MHz", "SSB", "58", "Bangkok, Thailand", "Stable signal"],
  ["2026-07-09 12:47", "BV2A", "7MHz", "FT8", "+02", "Taipei, China", "Short path"],
  ["2026-07-09 10:19", "JH4UYB", "18MHz", "CW", "579", "Okayama, Japan", "Nice tone"],
  ["2026-07-08 23:52", "W6AFA", "14MHz", "FT8", "-11", "California, USA", "Long path"],
  ["2026-07-08 22:31", "RA0FF", "7MHz", "CW", "569", "Sakhalin, Russia", "Moderate QSB"],
  ["2026-07-08 20:44", "YB0AZ", "21MHz", "SSB", "56", "Jakarta, Indonesia", "Warm audio"],
  ["2026-07-08 19:08", "4F3BZ", "14MHz", "FT8", "-07", "Cebu, Philippines", "Worked first call"],
  ["2026-07-08 17:22", "E21EIC", "28MHz", "CW", "599", "Bangkok, Thailand", "Very strong"],
  ["2026-07-08 15:41", "BD4UJ", "50MHz", "SSB", "59", "Suzhou, China", "Ground wave"],
  ["2026-07-08 13:16", "DS5USH", "18MHz", "FT8", "-03", "Busan, Korea", "Good decode"],
  ["2026-07-08 11:38", "JA7QVI", "21MHz", "SSB", "57", "Sendai, Japan", "Friendly QSO"],
  ["2026-07-08 09:55", "BG5TOX", "7MHz", "CW", "589", "Hangzhou, China", "Excellent fist"],
  ["2026-07-08 08:12", "VK6LW", "14MHz", "FT8", "-15", "Perth, Australia", "Weak but readable"],
  ["2026-07-07 23:40", "K0MD", "14MHz", "FT8", "-12", "Minnesota, USA", "Low noise"],
  ["2026-07-07 22:06", "R0CB", "7MHz", "CW", "559", "Khabarovsk, Russia", "Fading"],
  ["2026-07-07 20:27", "YC1DPM", "21MHz", "SSB", "57", "Bandung, Indonesia", "Solid copy"],
  ["2026-07-07 18:48", "BH4BFS", "50MHz", "FM", "59", "Wuxi, China", "Repeater contact"],
  ["2026-07-07 17:05", "JA2FJP", "18MHz", "FT8", "+01", "Nagoya, Japan", "Quick contact"],
  ["2026-07-07 15:33", "HL5QY", "14MHz", "CW", "579", "Daegu, Korea", "Good conditions"],
  ["2026-07-07 13:50", "9M2GET", "28MHz", "SSB", "55", "Penang, Malaysia", "Some QRN"],
  ["2026-07-07 11:24", "BX2ABT", "7MHz", "FT8", "-06", "Taipei, China", "Steady decode"],
  ["2026-07-07 09:43", "VK2GR", "21MHz", "CW", "569", "Sydney, Australia", "Morning path"],
  ["2026-07-07 08:08", "BD5RV", "14MHz", "SSB", "58", "Ningbo, China", "Strong local"],
  ["2026-07-06 23:29", "N7ET", "14MHz", "FT8", "-17", "Oregon, USA", "Deep fade"],
  ["2026-07-06 21:57", "JE1CKA", "7MHz", "CW", "589", "Chiba, Japan", "Contest exchange"],
  ["2026-07-06 20:13", "XV9NPS", "21MHz", "SSB", "56", "Ho Chi Minh City, Vietnam", "Nice QSO"],
  ["2026-07-06 18:45", "BG4HYK", "50MHz", "FT8", "+10", "Nanjing, China", "Es opening"],
  ["2026-07-06 16:32", "HS5NMF", "18MHz", "CW", "559", "Chiang Mai, Thailand", "QRN present"],
  ["2026-07-06 14:09", "VK4MA", "14MHz", "FT8", "-09", "Brisbane, Australia", "Good copy"],
  ["2026-07-06 12:26", "JA6GCE", "28MHz", "SSB", "57", "Fukuoka, Japan", "Clear signal"],
  ["2026-07-06 10:51", "HL1VAU", "21MHz", "FT8", "-01", "Seoul, Korea", "Fast decode"],
  ["2026-07-06 09:15", "VR2XYL", "7MHz", "CW", "579", "Hong Kong, China", "Smooth keying"],
  ["2026-07-06 07:38", "DU3LA", "14MHz", "SSB", "55", "Luzon, Philippines", "Morning net"],
  ["2026-07-05 22:54", "JA3YBK", "14MHz", "CW", "599", "Osaka, Japan", "Contest station"],
  ["2026-07-05 20:37", "VK5PAS", "21MHz", "FT8", "-13", "Adelaide, Australia", "Long distance"],
  ["2026-07-05 18:21", "BH3DHE", "7MHz", "SSB", "57", "Tianjin, China", "Evening net"],
  ["2026-07-05 16:06", "9V1ZV", "28MHz", "CW", "569", "Singapore", "Short opening"],
  ["2026-07-05 13:49", "JH1GEX", "18MHz", "FT8", "+04", "Yokohama, Japan", "Excellent decode"]
].map(([time, call, band, mode, rst, qth, remarks]) => ({ time, call, band, mode, rst, qth, remarks }));

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

  logBody.innerHTML = visibleLogs.map(log => `
    <tr>
      <td class="time-cell">${escapeHTML(log.time)}</td>
      <td class="call-cell">${escapeHTML(log.call)}</td>
      <td><span class="band-pill">${escapeHTML(log.band)}</span></td>
      <td><span class="mode-pill">${escapeHTML(log.mode)}</span></td>
      <td class="rst">${escapeHTML(log.rst)}</td>
      <td title="${escapeHTML(log.qth)}">${escapeHTML(log.qth)}</td>
      <td title="${escapeHTML(log.remarks)}">${escapeHTML(log.remarks)}</td>
    </tr>`).join("");

  emptyState.hidden = filteredLogs.length !== 0;
  totalInfo.textContent = filteredLogs.length;
  rangeInfo.textContent = filteredLogs.length ? `${start + 1}–${start + visibleLogs.length}` : "0–0";
  pageInfo.textContent = `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || filteredLogs.length === 0;
}

// 切换日志展开/收起 + 回到首页
function toggleLog() {
  isLogExpanded = !isLogExpanded;
  logContainer.classList.toggle("collapsed", !isLogExpanded);
  logTitle.classList.toggle("expanded", isLogExpanded);
  
  // 只更新图标文字，不重建整个按钮
  const icon = logTitle.querySelector(".btn-icon");
  icon.textContent = isLogExpanded ? '▲' : '▼';

  // 回到首页：清空搜索，重置数据
  searchInput.value = "";
  filteredLogs = [...qsoLogs];
  currentPage = 1;
  renderLogs();
  searchInput.blur();

  // 首次展开时渲染数据
  if (isLogExpanded && logBody.children.length === 0) {
    renderLogs();
  }
}

// 点击标题切换
logTitle.addEventListener("click", toggleLog);

// 点击搜索框自动展开
searchInput.addEventListener("focus", () => {
  if (!isLogExpanded) {
    toggleLog();
  }
});

// 搜索逻辑
searchInput.addEventListener("input", event => {
  const keyword = event.target.value.trim().toUpperCase();
  if (!keyword) {
    filteredLogs = [...qsoLogs];
  } else {
    filteredLogs = qsoLogs.filter(log => {
      const searchable = [
        log.call,
        log.band,
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

// 初始状态：收起
logContainer.classList.add("collapsed");
renderLogs();