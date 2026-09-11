const qsoLogs = [
  ["2026-08-27 14:13", "BD8ENX", "14.074", "FT8", "-5", "四川-成都", "2026-09-03", "2026-09-02"],
  ["/", "BH4GDY", "14.074", "FT8", "/", "中国-上海", "2026-08-22", ""],
  ["/", "BH4GUW", "14.074", "FT8", "/", "中国-上海", "2026-08-22", ""],
  ["/", "BI4AVZ", "14.074", "FT8", "/", "中国-上海", "2026-09-03", "2026-09-04"],
  ["2026-08-19 09:49", "BG2MGR", "14.074", "FT8", "", "吉林-长春", "2026-08-22", ""],
  ["2026-08-17 16:40", "BI4AEL", "14.074", "FT8", "-05", "中国-上海", "2026-08-22", ""],
  ["2026-08-17 00:52", "BH6AWZ", "14.074", "FT8", "-03", "安徽-六安", "2026-08-22", "2026-09-11"],
  ["2026-08-17 00:40", "BI4IXO", "14.074", "FT8", "-15", "山东-威海", "2026-08-22", "2026-09-02"],
  ["2026-08-16 14:29", "BD8FOD", "14.074", "FT8", "-19", "四川-成都", "2026-08-22", "2026-09-08"],
  ["2026-08-16 13:36", "BI4BGJ", "14.074", "FT8", "-18", "中国-上海", "2026-08-22", ""],
  ["2026-08-16 12:48", "BA7SAY", "14.074", "FT8", "-08", "广西-梧州", "2026-08-22", ""],
  ["2026-08-16 12:00", "BH4ECL", "14.074", "FT8", "-04", "中国-上海", "2026-08-22", ""],
  ["2026-08-22 10:28", "BG8AOI", "14.074", "FT8", "-10", "四川-成都", "2026-09-10", ""],
  ["2026-08-22 10:54", "BI6PWL", "14.074", "FT8", "-05", "河南-郑州", "2026-09-10", ""],
  ["2026-08-22 13:26", "BH4GWF", "14.074", "FT8", "+01", "中国-上海", "2026-09-10", ""],
  ["2026-08-22 10:32", "BH8GTW", "14.074", "FT8", "+04", "中国-重庆", "2026-09-10", ""],
  ["2026-08-22 10:33", "BD6JJP", "14.074", "FT8", "-12", "河南-开封", "2026-09-10", ""],
  ["2026-08-22 16:08", "BH4GCQ", "14.074", "FT8", "-13", "中国-上海", "2026-09-10", ""],
  ["2026-08-22 13:58", "BD8DRU", "14.074", "FT8", "-13", "四川-凉山", "2026-09-10", ""],
  ["2026-08-23 10:49", "BG5JGG", "14.074", "FT8", "+16", "江西-九江", "2026-09-10", ""],
  ["2026-08-23 10:30", "BI4AUW", "14.074", "FT8", "-04", "中国-上海", "2026-09-12", ""],
  ["2026-08-23 11:49", "BA4IAW", "14.074", "FT8", "-11", "山东-滨州", "2026-09-12", ""],
  ["2026-08-27 01:56", "BA7LUI", "14.074", "FT8", "-03", "广东-广州", "2026-09-12", ""],
  ["2026-08-27 02:07", "BG7LMW", "14.074", "FT8", "+00", "广东-茂名", "2026-09-12", ""],
  ["2026-08-27 09:46", "BI1AFK", "14.074", "FT8", "-07", "中国-北京", "2026-09-12", ""],
  ["2026-08-27 10:20", "BG7SSA", "14.074", "FT8", "-13", "广西-南宁", "2026-09-12", ""],
  ["2026-08-27 10:58", "BG7BVP", "14.074", "FT8", "+05", "湖南-长沙", "2026-09-12", ""],
  ["2026-08-27 11:01", "BD8FBI", "14.074", "FT8", "-08", "陕西-西安", "2026-09-12", ""],
  ["2026-08-27 11:32", "BG7HFE", "14.074", "FT8", "-02", "湖南-长沙", "2026-09-12", ""],
  ["2026-08-27 11:41", "BI4BKX", "14.074", "FT8", "-10", "中国-上海", "2026-09-12", ""]
]
.sort((a, b) => {
  if (a[0] > b[0]) return -1;
  if (a[0] < b[0]) return 1;
  return 0;
})
.map(([time, call, freq, mode, rst, qth, sent_date, received_date]) => ({
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