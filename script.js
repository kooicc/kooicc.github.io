// 全局变量
let qsoLogs = [];
let currentTab = "";
let isExpanded = false;
let currentPage = 1;
let filteredLogs = [];
let wallRendered = false;
const PAGE_SIZE = 10;

const qslImages = [
  "https://img.244056614.xyz/BH3NZN.jpg",
  "https://img.244056614.xyz/BI4AJF.jpg",
  "https://img.244056614.xyz/BG3NQT.jpg",
  "https://img.244056614.xyz/BH8GTW.jpg",
  "https://img.244056614.xyz/BH4GWF.jpg",
  "https://img.244056614.xyz/BI4BRD.jpg"
];

// DOM 元素引用（延迟到 DOMContentLoaded 获取）
let qsoElements = {};

// 初始化入口
document.addEventListener("DOMContentLoaded", async () => {
  // 1. 获取 DOM 元素
  qsoElements = {
    tabQso: document.getElementById("tabQso"),
    tabQsl: document.getElementById("tabQsl"),
    qsoContent: document.getElementById("qsoContent"),
    qslContent: document.getElementById("qslContent"),
    logContainer: document.getElementById("logContainer"),
    searchContainer: document.getElementById("searchContainer"),
    wallGrid: document.getElementById("wallGrid"),
    searchInput: document.getElementById("callsignSearch"),
    clearSearch: document.getElementById("clearSearch"),
    qslFilter: document.getElementById("qslFilter"),
    logBody: document.getElementById("logBody"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
    pageInfo: document.getElementById("pageInfo"),
    rangeInfo: document.getElementById("rangeInfo"),
    totalInfo: document.getElementById("totalInfo"),
    emptyState: document.getElementById("emptyState")
  };

  // 2. 绑定事件监听器
  bindEvents();

  // 3. 请求 JSON 数据并初始化渲染
  try {
    const response = await fetch('./qso_data.json');
    if (!response.ok) throw new Error("网络请求失败");
    
    const rawData = await response.json();
    
    // 数据转换与排序
    qsoLogs = rawData
      .sort((a, b) => (b[0] || "").localeCompare(a[0] || ""))
      .map(([time, call, freq, mode, rst, qth, qslReceivedDate, qslSentDate]) => ({
        time, call, freq, mode, rst, qth, qslReceivedDate, qslSentDate
      }));

    filteredLogs = [...qsoLogs];
    renderLogs();

  } catch (error) {
    console.error("获取数据失败:", error);
    qsoElements.logBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #ff6b6b; padding: 40px;">数据加载失败，请检查网络或 qso_data.json 文件是否存在。</td></tr>`;
  }
});

function bindEvents() {
  qsoElements.tabQsl.addEventListener("click", () => toggleTab("qsl"));
  qsoElements.tabQso.addEventListener("click", () => toggleTab("qso"));
  qsoElements.searchInput.addEventListener("input", applyFilters);
  qsoElements.qslFilter.addEventListener("change", applyFilters);
  
  qsoElements.searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      qsoElements.searchInput.value = "";
      qsoElements.qslFilter.value = "all";
      applyFilters();
      qsoElements.searchInput.blur();
    }
  });
  
  qsoElements.clearSearch.addEventListener("click", () => {
    qsoElements.searchInput.value = "";
    qsoElements.qslFilter.value = "all";
    applyFilters();
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
    
    // 注意这里：把收到日期和寄出日期正确对应
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
      <td>${received}</td> <!-- 这里填收到时间 -->
      <td>${sent}</td>     <!-- 这里填寄出时间 -->
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

function applyFilters() {
  const keyword = qsoElements.searchInput.value.trim().toLocaleUpperCase();
  const filterType = qsoElements.qslFilter.value;

  filteredLogs = qsoLogs.filter(log => {
    const matchesKeyword = keyword
      ? [log.call, log.freq, log.mode, log.rst, log.qth, log.qslReceivedDate, log.qslSentDate, log.time]
          .some(value => String(value || "").toLocaleUpperCase().includes(keyword))
      : true;

    let matchesFilter = true;
    if (filterType === "sent") {
      matchesFilter = !!log.qslSentDate;
    } else if (filterType === "received") {
      matchesFilter = !!log.qslReceivedDate;
    } else if (filterType === "missing") {
      matchesFilter = !log.qslReceivedDate;
    }

    return matchesKeyword && matchesFilter;
  });

  qsoElements.clearSearch.hidden = !qsoElements.searchInput.value;
  currentPage = 1;
  renderLogs();
}