// ... 你的 qsoLogs 数据保持不变 ...

const pageSize = 10;
let currentPage = 1;
let filteredLogs = [...qsoLogs];

const logBody = document.getElementById("logBody");
const searchInput = document.getElementById("callsignSearch");
const logTitle = document.getElementById("tabQso"); // 现在点击 tabQso 即可触发
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const rangeInfo = document.getElementById("rangeInfo");
const totalInfo = document.getElementById("totalInfo");
const emptyState = document.getElementById("emptyState");
const logContainer = document.getElementById("logContainer");

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function formatDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return '';
  return dateStr;
}

function renderLogs() {
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visibleLogs = filteredLogs.slice(start, start + pageSize);

  const fragment = document.createDocumentFragment();
  
  visibleLogs.forEach(log => {
    const tr = document.createElement("tr");
    const sentDisplay = formatDate(log.sent_date);
    const receivedDisplay = formatDate(log.received_date);
    
    const sentHtml = sentDisplay !== '' 
      ? `<span class="sent-date">${sentDisplay}</span>` 
      : `<span class="empty-date"></span>`;
    
    const receivedHtml = receivedDisplay !== '' 
      ? `<span class="received-date">${receivedDisplay}</span>` 
      : `<span class="empty-date"></span>`;

    const freqDisplay = log.freq && log.freq.trim() !== '' ? log.freq : '';
    const modeDisplay = log.mode && log.mode.trim() !== '' ? log.mode : '';
    const rstDisplay = log.rst && log.rst.trim() !== '' ? log.rst : '';

    tr.innerHTML = `
      <td class="time-cell">${escapeHTML(log.time)}</td>
      <td class="call-cell">${escapeHTML(log.call)}</td>
      <td class="freq-cell">${escapeHTML(freqDisplay)}</td>
      <td><span class="mode-pill">${escapeHTML(modeDisplay)}</span></td>
      <td class="rst">${escapeHTML(rstDisplay)}</td>
      <td title="${escapeHTML(log.qth)}">${escapeHTML(log.qth)}</td>
      <td>${receivedHtml}</td>
      <td>${sentHtml}</td>
    `;
    fragment.appendChild(tr);
  });

  logBody.innerHTML = "";
  logBody.appendChild(fragment);

  emptyState.hidden = filteredLogs.length !== 0;
  totalInfo.textContent = filteredLogs.length;
  rangeInfo.textContent = filteredLogs.length ? `${start + 1}–${start + visibleLogs.length}` : "0–0";
  pageInfo.textContent = `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || filteredLogs.length === 0;
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchInput.value = "";
    filteredLogs = [...qsoLogs];
    currentPage = 1;
    renderLogs();
    searchInput.blur();
  }
});

searchInput.addEventListener("input", event => {
  const keyword = event.target.value.trim().toUpperCase();
  if (!keyword) {
    filteredLogs = [...qsoLogs];
  } else {
    filteredLogs = qsoLogs.filter(log => {
      const searchable = [
        log.call, log.freq, log.mode, log.qth, 
        log.sent_date, log.received_date, log.time
      ].map(val => String(val || "")).join(" ").toUpperCase();
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

// 默认折叠（因为 HTML 里已经有 collapsed 类，这里直接渲染即可）
renderLogs();