/**
 * BI4BOB QSO Log
 * 数据格式：时间, 呼号, 频率, 模式, 信号, 位置, 备注
 */

const qsoLogs = [
  ["2026-07-10 08:30", "JA1ABC", "14.270", "FT8", "599", "Tokyo, Japan", "Strong signal"],
  ["2026-07-10 07:52", "HL2KCS", "7.050", "CW", "579", "Seoul, Korea", "Clean keying"],
  ["2026-07-09 23:18", "VK3DX", "21.200", "SSB", "57", "Melbourne, Australia", "Good propagation"],
  ["2026-07-09 21:46", "BA4TB", "14.180", "FT8", "+08", "Shanghai, China", "Local QSO"],
  ["2026-07-09 20:11", "VR2XMT", "50.150", "SSB", "59", "Hong Kong, China", "Clear audio"],
  ["2026-07-09 18:36", "9V1YC", "28.750", "FT8", "-04", "Singapore", "Band opening"],
  ["2026-07-09 16:04", "DU1IST", "21.350", "CW", "559", "Manila, Philippines", "Light QSB"],
  ["2026-07-09 14:25", "HS0ZIV", "14.220", "SSB", "58", "Bangkok, Thailand", "Stable signal"],
  ["2026-07-09 12:47", "BV2A", "7.100", "FT8", "+02", "Taipei, China", "Short path"],
  ["2026-07-09 10:19", "JH4UYB", "18.100", "CW", "579", "Okayama, Japan", "Nice tone"],
  ["2026-07-08 23:52", "W6AFA", "14.250", "FT8", "-11", "California, USA", "Long path"],
  ["2026-07-08 22:31", "RA0FF", "7.080", "CW", "569", "Sakhalin, Russia", "Moderate QSB"],
  ["2026-07-08 20:44", "YB0AZ", "21.280", "SSB", "56", "Jakarta, Indonesia", "Warm audio"],
  ["2026-07-08 19:08", "4F3BZ", "14.330", "FT8", "-07", "Cebu, Philippines", "Worked first call"],
  ["2026-07-08 17:22", "E21EIC", "28.500", "CW", "599", "Bangkok, Thailand", "Very strong"],
  ["2026-07-08 15:41", "BD4UJ", "50.250", "SSB", "59", "Suzhou, China", "Ground wave"],
  ["2026-07-08 13:16", "DS5USH", "18.150", "FT8", "-03", "Busan, Korea", "Good decode"],
  ["2026-07-08 11:38", "JA7QVI", "21.400", "SSB", "57", "Sendai, Japan", "Friendly QSO"],
  ["2026-07-08 09:55", "BG5TOX", "7.150", "CW", "589", "Hangzhou, China", "Excellent fist"],
  ["2026-07-08 08:12", "VK6LW", "14.080", "FT8", "-15", "Perth, Australia", "Weak but readable"],
  ["2026-07-07 23:40", "K0MD", "14.310", "FT8", "-12", "Minnesota, USA", "Low noise"],
  ["2026-07-07 22:06", "R0CB", "7.060", "CW", "559", "Khabarovsk, Russia", "Fading"],
  ["2026-07-07 20:27", "YC1DPM", "21.120", "SSB", "57", "Bandung, Indonesia", "Solid copy"],
  ["2026-07-07 18:48", "BH4BFS", "50.300", "FM", "59", "Wuxi, China", "Repeater contact"],
  ["2026-07-07 17:05", "JA2FJP", "18.120", "FT8", "+01", "Nagoya, Japan", "Quick contact"],
  ["2026-07-07 15:33", "HL5QY", "14.160", "CW", "579", "Daegu, Korea", "Good conditions"],
  ["2026-07-07 13:50", "9M2GET", "28.400", "SSB", "55", "Penang, Malaysia", "Some QRN"],
  ["2026-07-07 11:24", "BX2ABT", "7.130", "FT8", "-06", "Taipei, China", "Steady decode"],
  ["2026-07-07 09:43", "VK2GR", "21.220", "CW", "569", "Sydney, Australia", "Morning path"],
  ["2026-07-07 08:08", "BD5RV", "14.350", "SSB", "58", "Ningbo, China", "Strong local"],
  ["2026-07-06 23:29", "N7ET", "14.270", "FT8", "-17", "Oregon, USA", "Deep fade"],
  ["2026-07-06 21:57", "JE1CKA", "7.025", "CW", "589", "Chiba, Japan", "Contest exchange"],
  ["2026-07-06 20:13", "XV9NPS", "21.450", "SSB", "56", "Ho Chi Minh City, Vietnam", "Nice QSO"],
  ["2026-07-06 18:45", "BG4HYK", "50.400", "FT8", "+10", "Nanjing, China", "Es opening"],
  ["2026-07-06 16:32", "HS5NMF", "18.130", "CW", "559", "Chiang Mai, Thailand", "QRN present"],
  ["2026-07-06 14:09", "VK4MA", "14.330", "FT8", "-09", "Brisbane, Australia", "Good copy"],
  ["2026-07-06 12:26", "JA6GCE", "28.680", "SSB", "57", "Fukuoka, Japan", "Clear signal"],
  ["2026-07-06 10:51", "HL1VAU", "21.300", "FT8", "-01", "Seoul, Korea", "Fast decode"],
  ["2026-07-06 09:15", "VR2XYL", "7.090", "CW", "579", "Hong Kong, China", "Smooth keying"],
  ["2026-07-06 07:38", "DU3LA", "14.320", "SSB", "55", "Luzon, Philippines", "Morning net"],
  ["2026-07-05 22:54", "JA3YBK", "14.010", "CW", "599", "Osaka, Japan", "Contest station"],
  ["2026-07-05 20:37", "VK5PAS", "21.080", "FT8", "-13", "Adelaide, Australia", "Long distance"],
  ["2026-07-05 18:21", "BH3DHE", "7.160", "SSB", "57", "Tianjin, China", "Evening net"],
  ["2026-07-05 16:06", "9V1ZV", "28.020", "CW", "569", "Singapore", "Short opening"],
  ["2026-07-05 13:49", "JH1GEX", "18.140", "FT8", "+04", "Yokohama, Japan", "Excellent decode"]
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

  logBody.innerHTML = visibleLogs.map(log => `
    <tr>
      <td class="time-cell">${escapeHTML(log.time)}</td>
      <td class="call-cell">${escapeHTML(log.call)}</td>
      <td class="freq-cell">${escapeHTML(log.freq)}</td>
      <td><span class="mode-pill">${escapeHTML(log.mode)}</span></td>
      <td class="rst">${escapeHTML(log.rst)}</td>
      <td title="${escapeHTML(log.qth)}">${escapeHTML(log.qth)}</td>
      <td title="${escapeHTML(log.remarks)}">${escapeHTML(log.remarks)}</td>
    </tr>`
  ).join("");

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