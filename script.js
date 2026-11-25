// 全局变量
let qsoLogs = [];
let qslExtraItems = [];   // 无通联记录的 QSL 卡片（纪念卡/明信片，呼号可选）
let currentTab = "";
let isExpanded = false;
let currentPage = 1;
let filteredLogs = [];
let wallRendered = false;
const PAGE_SIZE = 10;

const QSL_IMAGE_BASE_URL = "https://img.244056614.xyz/";

let qsoElements = {};

document.addEventListener("DOMContentLoaded", async () => {
  // 安全获取版权年份
  const copyrightEl = document.getElementById("copyrightText");
  if (copyrightEl) {
    copyrightEl.textContent = `Copyright © 1996-${new Date().getFullYear()} `;
  }

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
    modalClose: document.getElementById("modalCloseBtn")
  };

  // 初始化时隐藏清空按钮
  if (qsoElements.clearSearch) {
    qsoElements.clearSearch.hidden = true;
  }

  bindEvents();

  try {
    const response = await fetch('./qso_data.json');
    if (!response.ok) throw new Error("网络请求失败，请检查文件是否存在或大小写是否正确");
    const rawData = await response.json();

    // 排序：有时间的在前，空时间在最后
    qsoLogs = rawData
      .sort((a, b) => {
        const timeA = a[0] || "";
        const timeB = b[0] || "";
        if (!timeA) return 1;
        if (!timeB) return -1;
        return timeB.localeCompare(timeA);
      })
      .map(([time, call, freq, mode, rst, qth, received, sent]) => ({
        time, call, freq, mode, rst, qth,
        receivedDate: received,
        sentDate: sent
      }));

    filteredLogs = [...qsoLogs];
    renderLogs();

    // 加载无通联记录的 QSL 卡片（可选文件，失败不影响主流程）
    try {
      const extraResponse = await fetch('./qsl_extra.json');
      if (extraResponse.ok) {
        const extraData = await extraResponse.json();
        if (Array.isArray(extraData)) {
          qslExtraItems = extraData
            .map(item => {
              if (!item || !item.img) return null;
              const url = String(item.img).trim();
              if (!url) return null;

              const call = item.call ? String(item.call).trim().toUpperCase() : "";
              const title = item.title ? String(item.title).trim() : "";
              const label = title || call;   // 展示名：title 优先，否则用 call
              if (!label) return null;       // 既无 title 又无 call，跳过

              // key：有 call 用 call（可与日志卡去重/覆盖）；无 call 用 title 保证唯一
              // 有 call 且有 title 时拼上 title，允许同呼号挂多张纪念卡
              const key = call
                ? `CALL:${call}${title ? `::${title}` : ""}`
                : `TITLE:${label}`;

              return { key, call, title, label, url };
            })
            .filter(Boolean);
        }
      }
    } catch (e) {
      console.warn("未加载 qsl_extra.json，跳过纪念卡补充:", e);
    }
  } catch (error) {
    console.error("获取数据失败:", error);
    if (qsoElements.logBody) {
      qsoElements.logBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #ff6b6b; padding: 40px;">数据加载失败：${escapeHTML(error.message)}</td></tr>`;
    }
  }
});

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
  // 赋值为极小的 Base64 透明图，瞬间中断原有图片的网络请求
  qsoElements.modalImage.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  qsoElements.imageModal.classList.add("hidden");
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

  const qslRecords = qsoLogs.filter(log => log.receivedDate || log.sentDate);

  qslRecords.sort((a, b) => {
    const dateA = a.receivedDate || a.sentDate || "";
    const dateB = b.receivedDate || b.sentDate || "";
    return dateB.localeCompare(dateA);
  });

  // 1) 日志卡：key = CALL:呼号
  const logItems = [...new Set(qslRecords.map(log => log.call))]
    .filter(Boolean)
    .map(call => {
      const upper = String(call).trim().toUpperCase();
      return upper
        ? {
            key: `CALL:${upper}`,
            call: upper,
            title: "",
            label: upper,
            url: `${QSL_IMAGE_BASE_URL}${encodeURIComponent(upper)}.jpg`
          }
        : null;
    })
    .filter(Boolean);

  // 2) 合并：同 key 纪念卡覆盖日志卡；无呼号纪念卡用 TITLE: 独立 key，不会误覆盖
  const merged = new Map();
  logItems.forEach(it => merged.set(it.key, it));
  qslExtraItems.forEach(it => merged.set(it.key, it));
  const items = [...merged.values()];

  if (items.length === 0) {
    qsoElements.wallGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">暂无 QSL 记录</div>';
    wallRendered = true;
    return;
  }

  items.forEach(({ call, title, label, url }) => {
    const displayName = title || label || call || "QSL 卡片";

    const item = document.createElement("figure");
    item.className = "wall-item";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.title = displayName;

    const image = document.createElement("img");
    image.src = url;
    image.alt = `${displayName} QSL 卡片`;
    image.loading = "lazy";
    image.decoding = "async";

    const openModal = () => {
      qsoElements.modalImage.src = url;
      qsoElements.imageModal.classList.remove("hidden");
    };

    item.addEventListener("click", openModal);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    });

    // 图片加载失败时彻底移除节点，避免 Grid 空白占位
    image.addEventListener("error", () => {
      item.remove();
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
      ? `<span class="received-date" title="${escapeHTML(log.receivedDate)}">${escapeHTML(log.receivedDate)}</span>`
      : '<span class="empty-date" aria-label="暂无日期">—</span>';

    const sent = log.sentDate
      ? `<span class="sent-date" title="${escapeHTML(log.sentDate)}">${escapeHTML(log.sentDate)}</span>`
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