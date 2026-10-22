const qsoLogs = [
  ["2026-08-27 14:13", "BD8ENX", "14.074", "FT8", "-05", "四川-成都", "2026-09-03", "2026-09-02"],
  ["", "BH4GDY", "14.074", "FT8", "", "上海-浦东", "2026-08-22", ""],
  ["", "BH4GUW", "14.074", "FT8", "", "上海", "2026-08-22", ""],
  ["2026-09-03 12:00", "BI4AVZ", "", "", "", "上海-徐汇", "2026-09-03", "2026-10-03"],
  ["2026-08-19 09:49", "BG2MGR", "14.074", "FT8", "", "吉林-长春", "2026-08-22", ""],
  ["2026-08-17 16:40", "BI4AEL", "14.074", "FT8", "-05", "上海", "2026-08-22", ""],
  ["2026-08-17 00:52", "BH6AWZ", "14.074", "FT8", "-03", "安徽-六安", "2026-08-22", "2026-09-11"],
  ["2026-08-17 00:40", "BI4IXO", "14.074", "FT8", "-15", "山东-威海", "2026-08-22", "2026-09-02"],
  ["2026-08-17 17:55", "BG7JPT", "14.074", "FT8", "+01", "广东-广州", "2026-09-22", ""],
  ["2026-08-16 14:29", "BD8FOD", "14.074", "FT8", "-19", "四川-成都", "2026-08-22", "2026-09-08"],
  ["2026-08-16 13:36", "BI4BGJ", "14.074", "FT8", "-18", "上海", "2026-08-22", ""],
  ["2026-08-16 12:48", "BA7SAY", "14.074", "FT8", "-08", "广西-梧州", "2026-08-22", ""],
  ["2026-08-16 12:00", "BH4ECL", "14.074", "FT8", "-04", "上海-虹口", "2026-08-22", ""],
  ["2026-08-22 10:28", "BG8AOI", "14.074", "FT8", "-10", "四川-成都", "2026-09-10", ""],
  ["2026-08-22 10:54", "BI6PWL", "14.074", "FT8", "-05", "河南-郑州", "2026-09-10", "2026-09-17"],
  ["2026-08-22 13:26", "BH4GWF", "14.074", "FT8", "+01", "上海", "2026-09-10", "2026-09-30"],
  ["2026-08-22 10:32", "BH8GTW", "14.074", "FT8", "+04", "重庆-涪陵", "2026-09-10", "2026-10-03"],
  ["2026-08-22 10:33", "BD6JJP", "14.074", "FT8", "-12", "河南-开封", "2026-09-10", "2026-09-17"],
  ["2026-08-22 16:08", "BH4GCQ", "14.074", "FT8", "-13", "上海-宝山", "2026-09-10", ""],
  ["2026-08-22 13:58", "BD8DRU", "14.074", "FT8", "-13", "四川-凉山", "2026-09-10", ""],
  ["2026-08-23 10:49", "BG5JGG", "14.074", "FT8", "+16", "江西-九江", "2026-09-10", "2026-09-24"],
  ["2026-08-23 10:30", "BI4AUW", "14.074", "FT8", "-04", "上海", "2026-09-12", ""],
  ["2026-08-23 11:49", "BA4IAW", "14.074", "FT8", "-11", "山东-滨州", "2026-09-12", "2026-09-17"],
  ["2026-08-27 01:56", "BA7LUI", "14.074", "FT8", "-03", "广东-广州", "2026-09-12", ""],
  ["2026-08-27 02:07", "BG7LMW", "14.074", "FT8", "+00", "广东-茂名", "2026-09-12", "2026-09-19"],
  ["2026-08-27 09:46", "BI1AFK", "14.074", "FT8", "-07", "北京-朝阳", "2026-09-12", ""],
  ["2026-08-27 10:20", "BG7SSA", "14.074", "FT8", "-13", "广西-南宁", "2026-09-12", ""],
  ["2026-08-27 10:58", "BG7BVP", "14.074", "FT8", "+05", "湖南-长沙", "2026-09-12", ""],
  ["2026-08-27 11:01", "BD8FBI", "14.074", "FT8", "-08", "陕西-西安", "2026-09-12", ""],
  ["2026-08-27 11:32", "BG7HFE", "14.074", "FT8", "-02", "湖南-长沙", "2026-09-12", ""],
  ["2026-08-27 11:41", "BI4BKX", "14.074", "FT8", "-10", "上海", "2026-09-12", "2026-10-18"],
  ["2026-08-27 13:49", "BH8WWP", "14.074", "FT8", "-03", "云南-楚雄", "2026-09-21", "2026-10-14"],
  ["2026-08-28 12:27", "BA7LNJ", "14.074", "FT8", "-11", "广东-河源", "2026-09-14", "2026-10-02"],
  ["2026-08-28 08:36", "BG5JKZ", "14.074", "FT8", "+11", "江西-宜春", "2026-09-21", "2026-10-17"],
  ["2026-08-29 07:05", "BD1ANO", "14.074", "FT8", "+07", "北京-通州", "2026-09-21", ""],
  ["2026-08-29 07:12", "BA7LUO", "14.074", "FT8", "+01", "广东-佛山", "2026-09-21", "2026-10-09"],
  ["2026-08-29 07:37", "BG3NQT", "14.074", "FT8", "+09", "河北-唐山", "2026-09-21", "2026-10-03"],
  ["2026-09-16 10:22", "BY1QH", "14.074", "FT8", "-06", "北京-海淀", "2026-09-18", ""],
  ["2026-09-16 10:22", "BD8ENU", "14.074", "FT8", "-12", "四川-绵阳", "2026-09-18", ""],
  ["2026-09-16 01:36", "BI3BIE", "14.074", "FT8", "+01", "天津-津南", "2026-09-18", "2026-10-04"],
  ["2026-09-15 01:49", "BG9EQM", "14.074", "FT8", "-06", "陕西-西安", "2026-09-18", ""],
  ["2026-09-15 01:18", "VR2VGM", "14.074", "FT8", "-04", "香港-香港岛", "2026-09-18", ""],
  ["2026-09-15 01:16", "BI1GHZ", "14.074", "FT8", "-11", "北京-海淀", "2026-09-18", ""],
  ["2026-09-15 01:09", "BA3NU", "14.074", "FT8", "+06", "河北-秦皇岛", "2026-09-18", ""],
  ["2026-09-15 00:51", "BH3NZN", "14.074", "FT8", "-06", "河北-唐山", "2026-09-18", "2026-10-03"],
  ["2026-09-14 14:01", "E20SJC", "14.074", "FT8", "-09", "泰国-北标", "2026-09-18", ""],
  ["2026-09-06 06:12", "JO1SIM", "14.074", "FT8", "-05", "日本-东京", "2026-09-18", ""],
  ["2026-09-06 03:27", "BI1RKA", "14.074", "FT8", "-04", "北京-门头沟", "2026-09-21", "2026-10-04"],
  ["2026-09-05 09:31", "VR2VHI", "14.074", "FT8", "+00", "香港-香港岛", "2026-09-18", ""],
  ["2026-09-20 01:31", "BI4BDC", "14.074", "FT8", "-01", "上海-虹口", "2026-09-20", ""],
  ["2026-10-10 14:09", "BI4BJI", "145.725", "FM", "59", "上海-普陀", "2026-10-15", "2026-10-13"],
  ["2026-10-11 23:26", "BI4BNW", "145.100", "FM", "59", "上海-普陀", "2026-10-17", "2026-10-15"],
  ["2026-10-11 17:51", "BI4BRD", "145.775", "FM", "59", "上海-松江", "2026-10-22", "2026-10-18"],
  ["2026-10-11 16:43", "BI4AJF", "145.775", "FM", "58", "上海-宝山", "2026-10-22", "2026-10-19"]
]

/*
 * BI4BOB QSO / QSL page
 * Original QSO records are retained. Array fields:
 * [time, callsign, frequency, mode, RST, QTH, QSL received date, QSL sent date]
 */
.sort((a, b) => (b[0] || "").localeCompare(a[0] || ""))
.map(([time, call, freq, mode, rst, qth, qslReceivedDate, qslSentDate]) => ({
  time, call, freq, mode, rst, qth, qslReceivedDate, qslSentDate
}));

const PAGE_SIZE = 10;
const qsoElements = {
  tabQso: document.getElementById("tabQso"),
  tabQsl: document.getElementById("tabQsl"),
  qsoContent: document.getElementById("qsoContent"),
  qslContent: document.getElementById("qslContent"),
  logContainer: document.getElementById("logContainer"),
  searchContainer: document.getElementById("searchContainer"),
  wallGrid: document.getElementById("wallGrid"),
  searchInput: document.getElementById("callsignSearch"),
  clearSearch: document.getElementById("clearSearch"),
  logBody: document.getElementById("logBody"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  pageInfo: document.getElementById("pageInfo"),
  rangeInfo: document.getElementById("rangeInfo"),
  totalInfo: document.getElementById("totalInfo"),
  emptyState: document.getElementById("emptyState")
};

let currentTab = "";
let isExpanded = false;
let currentPage = 1;
let filteredLogs = [...qsoLogs];
let wallRendered = false;

const qslImages = [
  "https://img.244056614.xyz/BH3NZN.jpg",
  "https://img.244056614.xyz/BI4AJF.jpg",
  "https://img.244056614.xyz/BG3NQT.jpg",
  "https://img.244056614.xyz/BH8GTW.jpg",
  "https://img.244056614.xyz/BH4GWF.jpg",
  "https://img.244056614.xyz/BI4BRD.jpg"
];

function setTab(tab) {
  currentTab = tab;
  isExpanded = currentTab !== "" && isExpanded;
  updateUI();
}

function updateUI() {
  const { tabQso, tabQsl, qsoContent, qslContent, logContainer, searchContainer } = qsoElements;
  logContainer.classList.toggle("hidden", !isExpanded);
  qsoContent.classList.toggle("hidden", !(isExpanded && currentTab === "qso"));
  qslContent.classList.toggle("hidden", !(isExpanded && currentTab === "qsl"));
  searchContainer.classList.toggle("hidden", !(isExpanded && currentTab === "qso"));

  tabQso.classList.toggle("active", currentTab === "qso");
  tabQsl.classList.toggle("active", currentTab === "qsl");
  tabQso.setAttribute("aria-expanded", String(isExpanded && currentTab === "qso"));
  tabQsl.setAttribute("aria-expanded", String(isExpanded && currentTab === "qsl"));

  tabQso.querySelector(".btn-icon").textContent = currentTab === "qso" && isExpanded ? "▲" : "▼";
  tabQsl.querySelector(".btn-icon").textContent = currentTab === "qsl" && isExpanded ? "▲" : "▼";

  if (isExpanded && currentTab === "qsl") renderWall();
}

function toggleTab(tab) {
  if (currentTab === tab) {
    isExpanded = !isExpanded;
  } else {
    currentTab = tab;
    isExpanded = true;
  }
  updateUI();
}

function renderWall() {
  if (wallRendered) return;
  const fragment = document.createDocumentFragment();

  qslImages.forEach((url, index) => {
    const item = document.createElement("figure");
    item.className = "wall-item";

    const image = document.createElement("img");
    image.src = url;
    image.alt = `QSL 卡片 ${index + 1}`;
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", () => {
      image.hidden = true;
      const fallback = document.createElement("div");
      fallback.className = "image-fallback";
      fallback.textContent = "图片暂时无法加载";
      item.appendChild(fallback);
    }, { once: true });

    item.appendChild(image);
    fragment.appendChild(item);
  });

  qsoElements.wallGrid.replaceChildren(fragment);
  wallRendered = true;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function renderLogs() {
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
  currentPage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleLogs = filteredLogs.slice(start, start + PAGE_SIZE);
  const fragment = document.createDocumentFragment();

  visibleLogs.forEach(log => {
    const tr = document.createElement("tr");
    const received = log.qslReceivedDate
      ? `<span class="received-date">${escapeHTML(log.qslReceivedDate)}</span>`
      : '<span class="empty-date" aria-label="暂无日期">—</span>';
    const sent = log.qslSentDate
      ? `<span class="sent-date">${escapeHTML(log.qslSentDate)}</span>`
      : '<span class="empty-date" aria-label="暂无日期">—</span>';

    tr.innerHTML = `
      <td class="time-cell" title="${escapeHTML(log.time)}">${escapeHTML(log.time || "—")}</td>
      <td class="call-cell"><a href="https://www.qrz.com/db/${encodeURIComponent(log.call)}" target="_blank" rel="noopener noreferrer">${escapeHTML(log.call)}</a></td>
      <td class="freq-cell">${escapeHTML(log.freq || "—")}</td>
      <td><span class="mode-pill">${escapeHTML(log.mode || "—")}</span></td>
      <td class="rst">${escapeHTML(log.rst || "—")}</td>
      <td title="${escapeHTML(log.qth)}">${escapeHTML(log.qth || "—")}</td>
      <td>${received}</td>
      <td>${sent}</td>
    `;
    fragment.appendChild(tr);
  });

  qsoElements.logBody.replaceChildren(fragment);
  qsoElements.emptyState.hidden = filteredLogs.length !== 0;
  qsoElements.totalInfo.textContent = String(filteredLogs.length);
  qsoElements.rangeInfo.textContent = filteredLogs.length
    ? `${start + 1}–${start + visibleLogs.length}`
    : "0–0";
  qsoElements.pageInfo.textContent = `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  qsoElements.prevBtn.disabled = currentPage <= 1;
  qsoElements.nextBtn.disabled = currentPage >= totalPages || filteredLogs.length === 0;
}

function applySearch() {
  const keyword = qsoElements.searchInput.value.trim().toLocaleUpperCase();
  filteredLogs = keyword
    ? qsoLogs.filter(log => [
        log.call, log.freq, log.mode, log.rst, log.qth,
        log.qslReceivedDate, log.qslSentDate, log.time
      ].some(value => String(value || "").toLocaleUpperCase().includes(keyword)))
    : [...qsoLogs];

  qsoElements.clearSearch.hidden = !qsoElements.searchInput.value;
  currentPage = 1;
  renderLogs();
}

qsoElements.tabQsl.addEventListener("click", () => toggleTab("qsl"));
qsoElements.tabQso.addEventListener("click", () => toggleTab("qso"));
qsoElements.searchInput.addEventListener("input", applySearch);
qsoElements.searchInput.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    qsoElements.searchInput.value = "";
    applySearch();
    qsoElements.searchInput.blur();
  }
});
qsoElements.clearSearch.addEventListener("click", () => {
  qsoElements.searchInput.value = "";
  applySearch();
  qsoElements.searchInput.focus();
});
qsoElements.prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderLogs();
  }
});
qsoElements.nextBtn.addEventListener("click", () => {
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
  if (currentPage < totalPages) {
    currentPage++;
    renderLogs();
  }
});

renderLogs();
