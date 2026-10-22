// 全局变量
let qsoLogs = [];
let currentTab = "";
let isExpanded = false;
let currentPage = 1;
let filteredLogs = [];
let wallRendered = false;
const PAGE_SIZE = 10;

const QSL_IMAGE_BASE_URL = "https://img.244056614.xyz/"; 

let qsoElements = {};

document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".footer-line-1 span").textContent = `Copyright © 1996-${new Date().getFullYear()} `;
  fetchBingWallpaperInfo();

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
    logBody: document.getElementById("logBody"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
    pageInfo: document.getElementById("pageInfo"),
    rangeInfo: document.getElementById("rangeInfo"),
    totalInfo: document.getElementById("totalInfo"),
    emptyState: document.getElementById("emptyState"),
    imageModal: document.getElementById("imageModal"),
    modalImage: document.getElementById("modalImage"),
    modalClose: document.querySelector(".modal-close")
  };

  bindEvents();

  try {
    const response = await fetch('./qso_data.json');
    if (!response.ok) throw new Error("网络请求失败");
    const rawData = await response.json();
    
    qsoLogs = rawData
      .sort((a, b) => (b[0] || "").localeCompare(a[0] || ""))
      .map(([time, call, freq, mode, rst, qth, received, sent]) => ({
        time, call, freq, mode, rst, qth, 
        receivedDate: received, 
        sentDate: sent
      }));

    filteredLogs = [...qsoLogs];
    renderLogs();
  } catch (error) {
    console.error("获取数据失败:", error);
    qsoElements.logBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #ff6b6b; padding: 40px;">数据加载失败。</td></tr>`;
  }
});

async function fetchBingWallpaperInfo() {
  try {
    const res = await fetch('https://bing.img.newfuture.cc/api/v1/bing');
    if (!res.ok) return;
    const data = await res.json();
    if (data && data.data && data.data.length > 0) {
      const today = data.data[0];
      const copyrightText = today.copyright || "";
      const titleText = today.title || "";
      
      const bingInfoEl = document.getElementById("bingInfo");
      if (bingInfoEl) {
        bingInfoEl.innerHTML = `<span>📷 ${titleText} (${copyrightText})</span>`;
        bingInfoEl.classList.remove("hidden");
      }
    }
  } catch (e) {
    console.log("必应壁纸信息获取失败", e);
  }
}

function bindEvents() {
  qsoElements.tabQsl.addEventListener("click", () => toggleTab("qsl"));
  qsoElements.tabQso.addEventListener("click", () => toggleTab("qso"));
  
  qsoElements.searchInput.addEventListener("input", applyFilters);
  qsoElements.searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      qsoElements.searchInput.value = "";
      applyFilters();
      qsoElements.searchInput.blur();
    }
  });
  qsoElements.clearSearch.addEventListener("click", () => {
    qsoElements.searchInput.value = "";
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

  qsoElements.modalClose.addEventListener("click", closeModal);
  qsoElements.imageModal.addEventListener("click", (e) => {
    if (e.target === qsoElements.imageModal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !qsoElements.imageModal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

function closeModal() {
  qsoElements.imageModal.classList.add("hidden");
  qsoElements.modalImage.src = "";
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

  // 1. 过滤出有 QSL 状态的记录
  const qslRecords = qsoLogs.filter(log => log.receivedDate || log.sentDate);
  
  // 2. 按照 QSL 收到时间倒序（最新收到的排最前），若没有收到时间则按寄出时间
  qslRecords.sort((a, b) => {
    const dateA = a.receivedDate || a.sentDate || "";
    const dateB = b.receivedDate || b.sentDate || "";
    return dateB.localeCompare(dateA);
  });

  // 3. 去重
  const qslCallsigns = [...new Set(qslRecords.map(log => log.call))];

  if (qslCallsigns.length === 0) {
    qsoElements.wallGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">暂无 QSL 记录</div>';
    wallRendered = true;
    return;
  }

  qslCallsigns.forEach((call) => {
    // 懒加载机制：只有呼号生成了图片 URL 才会创建节点
    if (!call) return;

    const url = `${QSL_IMAGE_BASE_URL}${call}.jpg`; 
    
    const item = document.createElement("figure");
    item.className = "wall-item";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.title = `点击查看 ${call} 的大图`;

    const image = document.createElement("img");
    image.src = url;
    image.alt = `${call} QSL 卡片`;
    image.loading = "lazy"; // 浏览器原生懒加载
    image.decoding = "async";

    item.addEventListener("click", () => {
      qsoElements.modalImage.src = url;
      qsoElements.imageModal.classList.remove("hidden");
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        qsoElements.modalImage.src = url;
        qsoElements.imageModal.classList.remove("hidden");
      }
    });

    // 图床没图直接隐藏卡片
    image.addEventListener("error", () => {
      item.style.display = 'none'; 
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
    
    const received = log.receivedDate
      ? `<span class="received-date">${escapeHTML(log.receivedDate)}</span>`
      : '<span class="empty-date" aria-label="暂无日期">—</span>';
      
    const sent = log.sentDate
      ? `<span class="sent-date">${escapeHTML(log.sentDate)}</span>`
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

function applyFilters() {
  const keyword = qsoElements.searchInput.value.trim().toLocaleUpperCase();

  filteredLogs = qsoLogs.filter(log => {
    return keyword
      ? [log.call, log.freq, log.mode, log.rst, log.qth, log.receivedDate, log.sentDate, log.time]
          .some(value => String(value || "").toLocaleUpperCase().includes(keyword))
      : true;
  });

  qsoElements.clearSearch.hidden = !qsoElements.searchInput.value;
  currentPage = 1;
  renderLogs();
}