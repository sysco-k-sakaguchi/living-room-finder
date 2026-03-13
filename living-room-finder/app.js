const STORAGE_KEYS = {
  currentUser: "living-room-finder.currentUser",
  properties: "living-room-finder.properties",
};

const USER_OPTIONS = {
  keiichi: {
    label: "けいいち",
    chipClass: "chip-user-keiichi",
    reviewClass: "review-pill-user-keiichi",
    detailClass: "review-card-keiichi",
  },
  honoka: {
    label: "ほのか",
    chipClass: "chip-user-honoka",
    reviewClass: "review-pill-user-honoka",
    detailClass: "review-card-honoka",
  },
};

const USER_IDS = Object.keys(USER_OPTIONS);
const RANK_SCORES = { "": 0, C: 1, B: 2, A: 3, S: 4 };
const IMPORT_FIELD_LABELS = {
  title: "物件名",
  rent: "家賃",
  layout: "間取り",
  areaSize: "面積",
  station: "最寄り駅",
  walkMinutes: "徒歩分数",
  address: "住所",
  builtYear: "築年数または築年月",
};

const SAMPLE_PROPERTIES = [
  {
    id: "sample-001",
    title: "中野坂上 グリーンレジデンス",
    sourceSite: "SUUMO",
    url: "https://suumo.jp/chintai/tokyo/sc_nakano/sample001/",
    rent: 128000,
    layout: "1LDK",
    areaSize: 40.5,
    station: "中野坂上",
    walkMinutes: 8,
    address: "東京都中野区中央2-18-6",
    builtYear: "2019年3月",
    addedBy: "keiichi",
    memo: "駅まで平坦で歩きやすい。スーパーが近く、在宅勤務の日も便利そう。",
    createdAt: "2026-03-02T12:10:00+09:00",
    updatedAt: "2026-03-07T21:15:00+09:00",
    latitude: 35.6979,
    longitude: 139.6824,
    reviews: {
      keiichi: {
        rank: "A",
        comment: "通勤が楽で、家賃とのバランスも良い。",
        updatedAt: "2026-03-03T20:40:00+09:00",
      },
      honoka: {
        rank: "B",
        comment: "キッチンは少しコンパクトだけど全体は好印象。",
        updatedAt: "2026-03-04T22:10:00+09:00",
      },
    },
  },
  {
    id: "sample-002",
    title: "代々木上原 テラスコート",
    sourceSite: "HOME'S",
    url: "https://www.homes.co.jp/chintai/tokyo/line/sample002/",
    rent: 154000,
    layout: "1LDK",
    areaSize: 44.8,
    station: "代々木上原",
    walkMinutes: 6,
    address: "東京都渋谷区上原2-32-11",
    builtYear: "2021年11月",
    addedBy: "honoka",
    memo: "内装の雰囲気が好き。収納が広めで、在宅スペースも取りやすそう。",
    createdAt: "2026-03-05T09:30:00+09:00",
    updatedAt: "2026-03-08T18:25:00+09:00",
    latitude: 35.6689,
    longitude: 139.6808,
    reviews: {
      keiichi: {
        rank: "A",
        comment: "少し家賃は高いが、駅近でかなり住みやすそう。",
        updatedAt: "2026-03-06T19:30:00+09:00",
      },
      honoka: {
        rank: "S",
        comment: "立地も内装もかなり好き。第一候補に近い。",
        updatedAt: "2026-03-08T18:25:00+09:00",
      },
    },
  },
  {
    id: "sample-003",
    title: "高円寺 サウスハウス",
    sourceSite: "手入力",
    url: "",
    rent: 108000,
    layout: "1DK",
    areaSize: 33.1,
    station: "高円寺",
    walkMinutes: 9,
    address: "東京都杉並区高円寺南4-17-2",
    builtYear: "築8年",
    addedBy: "keiichi",
    memo: "商店街に近くて生活しやすそう。地図表示用に緯度経度も入力済み。",
    createdAt: "2026-03-01T20:20:00+09:00",
    updatedAt: "2026-03-06T07:55:00+09:00",
    latitude: 35.7056,
    longitude: 139.6499,
    reviews: {
      keiichi: {
        rank: "B",
        comment: "家賃は魅力的。もう少し広いと安心。",
        updatedAt: "2026-03-06T07:55:00+09:00",
      },
      honoka: {
        rank: "",
        comment: "",
        updatedAt: "",
      },
    },
  },
  {
    id: "sample-004",
    title: "中目黒 リバービュー",
    sourceSite: "SUUMO",
    url: "https://suumo.jp/chintai/tokyo/sc_meguro/sample004/",
    rent: 175000,
    layout: "1LDK",
    areaSize: 47.5,
    station: "中目黒",
    walkMinutes: 11,
    address: "東京都目黒区中目黒2-8-4",
    builtYear: "2017年9月",
    addedBy: "honoka",
    memo: "周辺の雰囲気は好き。緯度経度はまだ未設定なので地図には出ない例。",
    createdAt: "2026-03-09T10:15:00+09:00",
    updatedAt: "2026-03-10T21:45:00+09:00",
    latitude: null,
    longitude: null,
    reviews: {
      keiichi: {
        rank: "B",
        comment: "家賃が高めなので優先度は少し下がる。",
        updatedAt: "2026-03-10T20:30:00+09:00",
      },
      honoka: {
        rank: "A",
        comment: "街の雰囲気はかなり好き。内見してみたい。",
        updatedAt: "2026-03-10T21:45:00+09:00",
      },
    },
  },
];

const state = {
  currentUser: null,
  properties: [],
  filters: {
    search: "",
    sort: "createdDesc",
    addedBy: "all",
    sourceSite: "all",
    rank: "all",
    maxRent: "",
    maxWalk: "",
  },
  selectedPropertyId: null,
  editingPropertyId: null,
  openModal: null,
  settingsReturnTarget: null,
  map: null,
  markerLayer: null,
  mapMarkers: {},
};

const elements = {};
let appMessageTimer = null;

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  cacheElements();
  loadInitialData();
  bindEvents();
  initializeMap();
  renderAll();

  if (!state.currentUser) {
    openSettingsModal(null);
    showAppMessage("最初に利用者を選ぶと、現在の自分のレビューをすぐ更新できます。", "warning");
  }
}

function cacheElements() {
  elements.appMessage = document.getElementById("appMessage");
  elements.activeUserName = document.getElementById("activeUserName");
  elements.activeUserHint = document.getElementById("activeUserHint");
  elements.currentUserNotice = document.getElementById("currentUserNotice");
  elements.summaryPropertyCount = document.getElementById("summaryPropertyCount");
  elements.summaryFilteredCount = document.getElementById("summaryFilteredCount");
  elements.summaryTopRatedCount = document.getElementById("summaryTopRatedCount");
  elements.summaryMappedCount = document.getElementById("summaryMappedCount");
  elements.filterSummary = document.getElementById("filterSummary");

  elements.searchInput = document.getElementById("searchInput");
  elements.sortSelect = document.getElementById("sortSelect");
  elements.filterAddedBy = document.getElementById("filterAddedBy");
  elements.filterSourceSite = document.getElementById("filterSourceSite");
  elements.filterRank = document.getElementById("filterRank");
  elements.filterMaxRent = document.getElementById("filterMaxRent");
  elements.filterMaxWalk = document.getElementById("filterMaxWalk");

  elements.propertyList = document.getElementById("propertyList");
  elements.emptyState = document.getElementById("emptyState");
  elements.mapCanvas = document.getElementById("mapCanvas");
  elements.mapStatusText = document.getElementById("mapStatusText");
  elements.missingCoordinates = document.getElementById("missingCoordinates");

  elements.detailModal = document.getElementById("detailModal");
  elements.formModal = document.getElementById("formModal");
  elements.settingsModal = document.getElementById("settingsModal");

  elements.detailPropertyTitle = document.getElementById("detailPropertyTitle");
  elements.detailBadges = document.getElementById("detailBadges");
  elements.detailLead = document.getElementById("detailLead");
  elements.detailOriginalLink = document.getElementById("detailOriginalLink");
  elements.detailInfoGrid = document.getElementById("detailInfoGrid");
  elements.detailMemoText = document.getElementById("detailMemoText");
  elements.detailReviewSummary = document.getElementById("detailReviewSummary");
  elements.detailReviewCards = document.getElementById("detailReviewCards");
  elements.quickReviewTitle = document.getElementById("quickReviewTitle");
  elements.quickReviewForm = document.getElementById("quickReviewForm");
  elements.quickReviewRank = document.getElementById("quickReviewRank");
  elements.quickReviewComment = document.getElementById("quickReviewComment");
  elements.quickReviewStatus = document.getElementById("quickReviewStatus");
  elements.quickReviewLocked = document.getElementById("quickReviewLocked");
  elements.focusPropertyOnMapButton = document.getElementById("focusPropertyOnMapButton");
  elements.detailEditButton = document.getElementById("detailEditButton");
  elements.detailDeleteButton = document.getElementById("detailDeleteButton");

  elements.formModalTitle = document.getElementById("formModalTitle");
  elements.importUrlInput = document.getElementById("importUrlInput");
  elements.importSourceSite = document.getElementById("importSourceSite");
  elements.importStatusMessage = document.getElementById("importStatusMessage");
  elements.propertyForm = document.getElementById("propertyForm");
  elements.formStatusMessage = document.getElementById("formStatusMessage");
  elements.propertyTitle = document.getElementById("propertyTitle");
  elements.propertySourceSite = document.getElementById("propertySourceSite");
  elements.propertyUrl = document.getElementById("propertyUrl");
  elements.propertyRent = document.getElementById("propertyRent");
  elements.propertyLayout = document.getElementById("propertyLayout");
  elements.propertyAreaSize = document.getElementById("propertyAreaSize");
  elements.propertyStation = document.getElementById("propertyStation");
  elements.propertyWalkMinutes = document.getElementById("propertyWalkMinutes");
  elements.propertyAddress = document.getElementById("propertyAddress");
  elements.propertyBuiltYear = document.getElementById("propertyBuiltYear");
  elements.propertyAddedBy = document.getElementById("propertyAddedBy");
  elements.propertyLatitude = document.getElementById("propertyLatitude");
  elements.propertyLongitude = document.getElementById("propertyLongitude");
  elements.propertyMemo = document.getElementById("propertyMemo");
  elements.formReviewHeading = document.getElementById("formReviewHeading");
  elements.formReviewHelper = document.getElementById("formReviewHelper");
  elements.formReviewFields = document.getElementById("formReviewFields");
  elements.formReviewRank = document.getElementById("formReviewRank");
  elements.formReviewComment = document.getElementById("formReviewComment");
  elements.formReviewLocked = document.getElementById("formReviewLocked");
  elements.savePropertyButton = document.getElementById("savePropertyButton");

  elements.settingsForm = document.getElementById("settingsForm");
}

function loadInitialData() {
  state.currentUser = loadCurrentUserFromStorage();
  state.properties = loadPropertiesFromStorage();
}

function bindEvents() {
  const openFormButtons = [
    "openPropertyFormButton",
    "openAddFromNavButton",
    "openAddInlineButton",
    "emptyAddPropertyButton",
  ];
  openFormButtons.forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => openPropertyForm());
    }
  });

  const openSettingsButtons = [
    "openUserSettingsButton",
    "openSettingsButton",
    "openSettingsFromNoticeButton",
  ];
  openSettingsButtons.forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => openSettingsModal(null));
    }
  });

  document.getElementById("openSettingsFromDetailButton").addEventListener("click", () => {
    closeModal("detail");
    openSettingsModal("detail");
  });

  document.getElementById("jumpToMapButton").addEventListener("click", invalidateMapSoon);
  document.getElementById("clearFiltersButton").addEventListener("click", resetFilters);
  document.getElementById("emptyResetFiltersButton").addEventListener("click", resetFilters);
  document.getElementById("cancelFormButton").addEventListener("click", () => closeModal("form"));
  document.getElementById("closeSettingsButton").addEventListener("click", closeSettingsFlow);
  document.getElementById("clearImportButton").addEventListener("click", clearImportFields);
  document.getElementById("importFromUrlButton").addEventListener("click", handleImportFromUrl);

  [
    elements.searchInput,
    elements.sortSelect,
    elements.filterAddedBy,
    elements.filterSourceSite,
    elements.filterRank,
    elements.filterMaxRent,
    elements.filterMaxWalk,
  ].forEach((input) => {
    const eventName = input.tagName === "INPUT" && input.type === "search" ? "input" : "change";
    input.addEventListener(eventName, handleFilterChange);
    if (eventName !== "input") {
      input.addEventListener("input", handleFilterChange);
    }
  });

  elements.propertyList.addEventListener("click", handlePropertyListClick);
  elements.mapCanvas.addEventListener("click", handleMapCanvasClick);
  elements.missingCoordinates.addEventListener("click", handlePropertyListClick);
  elements.quickReviewForm.addEventListener("submit", handleQuickReviewSubmit);
  elements.propertyForm.addEventListener("submit", handlePropertyFormSubmit);
  elements.settingsForm.addEventListener("submit", handleSettingsSubmit);

  elements.detailEditButton.addEventListener("click", () => {
    if (state.selectedPropertyId) {
      closeModal("detail");
      openPropertyForm(state.selectedPropertyId);
    }
  });

  elements.detailDeleteButton.addEventListener("click", () => {
    if (state.selectedPropertyId) {
      deletePropertyById(state.selectedPropertyId);
    }
  });

  elements.focusPropertyOnMapButton.addEventListener("click", () => {
    if (state.selectedPropertyId) {
      focusPropertyOnMap(state.selectedPropertyId);
    }
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.currentTarget.getAttribute("data-close-modal");
      if (target === "settings") {
        closeSettingsFlow();
        return;
      }
      closeModal(target);
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.openModal) {
      if (state.openModal === "settings") {
        closeSettingsFlow();
      } else {
        closeModal(state.openModal);
      }
    }
  });
}

function handleFilterChange() {
  state.filters.search = elements.searchInput.value.trim();
  state.filters.sort = elements.sortSelect.value;
  state.filters.addedBy = elements.filterAddedBy.value;
  state.filters.sourceSite = elements.filterSourceSite.value;
  state.filters.rank = elements.filterRank.value;
  state.filters.maxRent = elements.filterMaxRent.value.trim();
  state.filters.maxWalk = elements.filterMaxWalk.value.trim();
  renderAll();
}

function resetFilters() {
  elements.searchInput.value = "";
  elements.sortSelect.value = "createdDesc";
  elements.filterAddedBy.value = "all";
  elements.filterSourceSite.value = "all";
  elements.filterRank.value = "all";
  elements.filterMaxRent.value = "";
  elements.filterMaxWalk.value = "";
  handleFilterChange();
  showAppMessage("絞り込み条件をクリアしました。", "success");
}

function renderAll() {
  renderCurrentUserArea();
  renderOverview();
  renderPropertyList();
  renderMap();
  syncSettingsForm();
}

function renderCurrentUserArea() {
  if (!state.currentUser) {
    elements.activeUserName.textContent = "未設定";
    elements.activeUserHint.textContent = "設定から「けいいち」または「ほのか」を選べます。";
    elements.currentUserNotice.classList.remove("hidden");
    return;
  }

  elements.activeUserName.textContent = getUserLabel(state.currentUser);
  elements.activeUserHint.textContent = `${getUserLabel(state.currentUser)} としてレビューを保存します。`;
  elements.currentUserNotice.classList.add("hidden");
}

function renderOverview() {
  const visibleProperties = getVisibleProperties();
  const mappedCount = visibleProperties.filter(hasCoordinates).length;
  const highRatedCount = state.properties.filter((property) => getRatingMetrics(property).average >= 3).length;

  elements.summaryPropertyCount.textContent = `${state.properties.length}件`;
  elements.summaryFilteredCount.textContent = `${visibleProperties.length}件`;
  elements.summaryTopRatedCount.textContent = `${highRatedCount}件`;
  elements.summaryMappedCount.textContent = `${mappedCount}件`;

  const filterNotes = [];
  if (state.filters.search) filterNotes.push(`検索「${state.filters.search}」`);
  if (state.filters.addedBy !== "all") filterNotes.push(`追加者: ${getUserLabel(state.filters.addedBy)}`);
  if (state.filters.sourceSite !== "all") filterNotes.push(`サイト: ${state.filters.sourceSite}`);
  if (state.filters.rank !== "all") filterNotes.push(`ランク: ${state.filters.rank}以上`);
  if (state.filters.maxRent) filterNotes.push(`家賃上限: ${formatCurrency(Number(state.filters.maxRent))}`);
  if (state.filters.maxWalk) filterNotes.push(`徒歩上限: ${state.filters.maxWalk}分`);

  elements.filterSummary.textContent = filterNotes.length
    ? `${state.properties.length}件中 ${visibleProperties.length}件を表示中。条件: ${filterNotes.join(" / ")}`
    : `${state.properties.length}件中 ${visibleProperties.length}件を表示中。`;
}

function renderPropertyList() {
  const visibleProperties = getVisibleProperties();
  elements.propertyList.innerHTML = visibleProperties.map(buildPropertyCardHtml).join("");
  elements.emptyState.classList.toggle("hidden", visibleProperties.length !== 0);
}

function buildPropertyCardHtml(property) {
  const comments = getCommentCount(property);
  const urlButton = property.url
    ? `<a class="secondary-button" href="${escapeHtml(property.url)}" target="_blank" rel="noreferrer">元URL</a>`
    : `<button type="button" class="secondary-button" disabled>URLなし</button>`;

  return `
    <article class="property-card" data-property-id="${escapeHtml(property.id)}">
      <div class="card-top">
        <div class="badge-row">
          <span class="chip chip-site">${escapeHtml(property.sourceSite)}</span>
          <span class="chip ${USER_OPTIONS[property.addedBy].chipClass}">${escapeHtml(getUserLabel(property.addedBy))}追加</span>
          <span class="chip chip-comment">${comments === 0 ? "コメントなし" : `コメント${comments}件`}</span>
        </div>
        <button type="button" class="text-button" data-action="open-detail" data-property-id="${escapeHtml(property.id)}">
          詳細を見る
        </button>
      </div>

      <div>
        <h3 class="property-title">${escapeHtml(property.title)}</h3>
        <p class="property-summary">
          ${escapeHtml(formatCurrency(property.rent))} / ${escapeHtml(property.layout)} / ${escapeHtml(formatArea(property.areaSize))}
        </p>
      </div>

      <div class="meta-grid">
        <div class="meta-item">
          <span>最寄り駅</span>
          <strong>${escapeHtml(formatStation(property.station))}</strong>
        </div>
        <div class="meta-item">
          <span>徒歩</span>
          <strong>${escapeHtml(formatWalk(property.walkMinutes))}</strong>
        </div>
        <div class="meta-item">
          <span>住所</span>
          <strong>${escapeHtml(property.address || "未入力")}</strong>
        </div>
        <div class="meta-item">
          <span>更新日時</span>
          <strong>${escapeHtml(formatDateTime(property.updatedAt))}</strong>
        </div>
      </div>

      <div class="review-strip">
        ${buildReviewPill(property, "keiichi")}
        ${buildReviewPill(property, "honoka")}
      </div>

      <div class="card-actions">
        <button type="button" class="secondary-button" data-action="open-detail" data-property-id="${escapeHtml(property.id)}">詳細</button>
        <button type="button" class="secondary-button" data-action="edit-property" data-property-id="${escapeHtml(property.id)}">編集</button>
        <button
          type="button"
          class="secondary-button"
          data-action="focus-on-map"
          data-property-id="${escapeHtml(property.id)}"
          ${hasCoordinates(property) ? "" : "disabled"}
        >
          地図
        </button>
        ${urlButton}
      </div>
    </article>
  `;
}

function buildReviewPill(property, userId) {
  const review = property.reviews[userId];
  const isCurrentUser = state.currentUser === userId;
  const commentText = review.comment ? "コメントあり" : "コメントなし";

  return `
    <div class="review-pill ${USER_OPTIONS[userId].reviewClass} ${isCurrentUser ? "review-pill-current" : ""}">
      <span>${escapeHtml(getUserLabel(userId))}</span>
      <span class="rank-chip ${getRankClassName(review.rank)}">${escapeHtml(review.rank || "未評価")}</span>
      <span>${commentText}</span>
    </div>
  `;
}

function renderMap() {
  const visibleProperties = getVisibleProperties();
  const propertiesWithCoordinates = visibleProperties.filter(hasCoordinates);
  const propertiesWithoutCoordinates = visibleProperties.filter((property) => !hasCoordinates(property));

  renderMissingCoordinates(propertiesWithoutCoordinates);

  if (!state.map || !state.markerLayer) {
    elements.mapStatusText.textContent = "地図ライブラリの読み込みに失敗したため、一覧のみ利用できます。";
    return;
  }

  state.markerLayer.clearLayers();
  state.mapMarkers = {};

  if (propertiesWithCoordinates.length === 0) {
    elements.mapStatusText.textContent = "緯度・経度がある物件がないため、地図に表示できる候補はまだありません。";
    state.map.setView([35.681236, 139.767125], 11);
    return;
  }

  const bounds = [];

  propertiesWithCoordinates.forEach((property) => {
    const marker = window.L.marker([property.latitude, property.longitude]).addTo(state.markerLayer);
    marker.bindPopup(buildMapPopupHtml(property));
    state.mapMarkers[property.id] = marker;
    bounds.push([property.latitude, property.longitude]);
  });

  const fittedBounds = window.L.latLngBounds(bounds);
  if (fittedBounds.isValid()) {
    state.map.fitBounds(fittedBounds.pad(0.16), { maxZoom: 14 });
  }

  elements.mapStatusText.textContent =
    "現在の絞り込み結果のうち、緯度・経度がある物件だけを OpenStreetMap 上に表示しています。";
  invalidateMapSoon();
}

function renderMissingCoordinates(properties) {
  if (properties.length === 0) {
    elements.missingCoordinates.innerHTML = `
      <div class="map-missing-item">
        <strong>緯度・経度未設定の物件はありません。</strong>
        <span class="helper-text">地図に載せたい物件は、追加・編集画面で緯度と経度を入力してください。</span>
      </div>
    `;
    return;
  }

  elements.missingCoordinates.innerHTML = `
    <div class="map-missing-list">
      ${properties
        .map((property) => {
          const searchTarget = property.address || property.title;
          const searchLink = searchTarget
            ? `<a class="text-button" href="https://www.openstreetmap.org/search?query=${encodeURIComponent(searchTarget)}" target="_blank" rel="noreferrer">OpenStreetMapで探す</a>`
            : "";

          return `
            <div class="map-missing-item">
              <strong>${escapeHtml(property.title)}</strong>
              <div class="helper-text">${escapeHtml(property.address || "住所未入力")}</div>
              <div class="button-row">
                <button type="button" class="secondary-button" data-action="edit-property" data-property-id="${escapeHtml(property.id)}">
                  座標を入力
                </button>
                ${searchLink}
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function buildMapPopupHtml(property) {
  return `
    <div>
      <h3 class="map-popup-title">${escapeHtml(property.title)}</h3>
      <p class="map-popup-copy">
        ${escapeHtml(formatCurrency(property.rent))} / ${escapeHtml(property.layout)} / ${escapeHtml(formatWalk(property.walkMinutes))}
      </p>
      <div class="button-row">
        <button type="button" class="secondary-button" data-action="open-detail" data-property-id="${escapeHtml(property.id)}">
          詳細
        </button>
        ${
          property.url
            ? `<a class="text-button" href="${escapeHtml(property.url)}" target="_blank" rel="noreferrer">元URL</a>`
            : ""
        }
      </div>
    </div>
  `;
}

function openPropertyDetail(propertyId) {
  const property = findPropertyById(propertyId);
  if (!property) return;

  state.selectedPropertyId = propertyId;
  renderDetailModal(property);
  openModal("detail");
}

function renderDetailModal(property) {
  elements.detailPropertyTitle.textContent = property.title;
  elements.detailLead.textContent = buildPropertyLead(property);
  elements.detailBadges.innerHTML = `
    <span class="chip chip-site">${escapeHtml(property.sourceSite)}</span>
    <span class="chip ${USER_OPTIONS[property.addedBy].chipClass}">${escapeHtml(getUserLabel(property.addedBy))}追加</span>
    <span class="chip chip-comment">${getCommentCount(property) === 0 ? "コメントなし" : `コメント${getCommentCount(property)}件`}</span>
  `;

  if (property.url) {
    elements.detailOriginalLink.href = property.url;
    elements.detailOriginalLink.classList.remove("hidden");
  } else {
    elements.detailOriginalLink.classList.add("hidden");
  }

  elements.detailInfoGrid.innerHTML = buildInfoGridHtml(property);
  elements.detailMemoText.textContent = property.memo || "共通メモはまだありません。";
  elements.detailReviewSummary.textContent =
    "ランクは S / A / B / C の順です。並び替えの評価順では、2人の平均値を使っています。";
  elements.detailReviewCards.innerHTML = USER_IDS.map((userId) => buildDetailReviewCard(property, userId)).join("");

  renderQuickReviewEditor(property);
}

function buildInfoGridHtml(property) {
  const infoItems = [
    ["家賃", formatCurrency(property.rent)],
    ["間取り", property.layout || "未入力"],
    ["面積", formatArea(property.areaSize)],
    ["最寄り駅", formatStation(property.station)],
    ["徒歩", formatWalk(property.walkMinutes)],
    ["住所", property.address || "未入力"],
    ["築年数 / 築年月", property.builtYear || "未入力"],
    ["追加者", getUserLabel(property.addedBy)],
    ["作成日時", formatDateTime(property.createdAt)],
    ["更新日時", formatDateTime(property.updatedAt)],
    ["緯度", hasMeaningfulValue(property.latitude) ? String(property.latitude) : "未入力"],
    ["経度", hasMeaningfulValue(property.longitude) ? String(property.longitude) : "未入力"],
  ];

  return infoItems
    .map(
      ([label, value]) => `
        <div class="info-item">
          <dt>${escapeHtml(label)}</dt>
          <dd>${escapeHtml(value)}</dd>
        </div>
      `
    )
    .join("");
}

function buildDetailReviewCard(property, userId) {
  const review = property.reviews[userId];

  return `
    <article class="review-card ${USER_OPTIONS[userId].detailClass}">
      <div class="review-card-header">
        <h4>${escapeHtml(getUserLabel(userId))}</h4>
        <span class="rank-chip ${getRankClassName(review.rank)}">${escapeHtml(review.rank || "未評価")}</span>
      </div>
      <p>${review.comment ? escapeHtml(review.comment).replace(/\n/g, "<br>") : "まだコメントはありません。"}</p>
      <small>${review.updatedAt ? `更新: ${formatDateTime(review.updatedAt)}` : "まだ更新されていません。"}</small>
    </article>
  `;
}

function renderQuickReviewEditor(property) {
  if (!state.currentUser) {
    elements.quickReviewTitle.textContent = "現在の利用者のレビューを更新";
    elements.quickReviewForm.classList.add("hidden");
    elements.quickReviewLocked.classList.remove("hidden");
    elements.quickReviewStatus.textContent = "";
    return;
  }

  const currentReview = property.reviews[state.currentUser];
  elements.quickReviewTitle.textContent = `${getUserLabel(state.currentUser)}のレビューを更新`;
  elements.quickReviewForm.classList.remove("hidden");
  elements.quickReviewLocked.classList.add("hidden");
  elements.quickReviewRank.value = currentReview.rank || "";
  elements.quickReviewComment.value = currentReview.comment || "";
  elements.quickReviewStatus.textContent = currentReview.updatedAt
    ? `前回更新: ${formatDateTime(currentReview.updatedAt)}`
    : "まだレビューは保存されていません。";
  elements.focusPropertyOnMapButton.disabled = !hasCoordinates(property);
}

function handleQuickReviewSubmit(event) {
  event.preventDefault();

  if (!state.currentUser || !state.selectedPropertyId) {
    showAppMessage("先に利用者を選んでください。", "warning");
    return;
  }

  const property = findPropertyById(state.selectedPropertyId);
  if (!property) return;

  const now = new Date().toISOString();
  const newRank = normalizeRank(elements.quickReviewRank.value);
  const newComment = cleanText(elements.quickReviewComment.value);
  const currentReview = property.reviews[state.currentUser];

  if (currentReview.rank === newRank && currentReview.comment === newComment) {
    elements.quickReviewStatus.textContent = "変更はありません。";
    return;
  }

  property.reviews[state.currentUser] = buildReviewRecord(currentReview, newRank, newComment, now);
  property.updatedAt = now;
  savePropertiesToStorage();
  renderAll();
  renderDetailModal(property);
  showAppMessage(`${getUserLabel(state.currentUser)}のレビューを保存しました。`, "success");
}

function openPropertyForm(propertyId = null) {
  state.editingPropertyId = propertyId;
  resetPropertyForm();

  if (propertyId) {
    const property = findPropertyById(propertyId);
    if (!property) return;
    populatePropertyForm(property);
    elements.formModalTitle.textContent = "物件を編集";
    elements.savePropertyButton.textContent = "更新する";
  } else {
    elements.formModalTitle.textContent = "物件を追加";
    elements.savePropertyButton.textContent = "保存する";
    elements.propertyAddedBy.value = state.currentUser || "keiichi";
  }

  renderPropertyFormReviewArea();
  openModal("form");
}

function resetPropertyForm() {
  elements.propertyForm.reset();
  elements.formStatusMessage.textContent = "";
  elements.importStatusMessage.textContent = "まずは URL を判定し、可能ならブラウザから取得を試します。";
  elements.importUrlInput.value = "";
  elements.importSourceSite.value = "自動判定";
  elements.propertySourceSite.value = "手入力";
  elements.propertyAddedBy.value = state.currentUser || "keiichi";
  elements.formReviewRank.value = "";
  elements.formReviewComment.value = "";
}

function populatePropertyForm(property) {
  elements.importUrlInput.value = property.url || "";
  elements.importSourceSite.value = property.sourceSite || "自動判定";
  elements.propertyTitle.value = property.title || "";
  elements.propertySourceSite.value = property.sourceSite || "手入力";
  elements.propertyUrl.value = property.url || "";
  elements.propertyRent.value = hasMeaningfulValue(property.rent) ? String(property.rent) : "";
  elements.propertyLayout.value = property.layout || "";
  elements.propertyAreaSize.value = hasMeaningfulValue(property.areaSize) ? String(property.areaSize) : "";
  elements.propertyStation.value = property.station || "";
  elements.propertyWalkMinutes.value = hasMeaningfulValue(property.walkMinutes) ? String(property.walkMinutes) : "";
  elements.propertyAddress.value = property.address || "";
  elements.propertyBuiltYear.value = property.builtYear || "";
  elements.propertyAddedBy.value = property.addedBy || "keiichi";
  elements.propertyLatitude.value = hasMeaningfulValue(property.latitude) ? String(property.latitude) : "";
  elements.propertyLongitude.value = hasMeaningfulValue(property.longitude) ? String(property.longitude) : "";
  elements.propertyMemo.value = property.memo || "";
  elements.importStatusMessage.textContent = property.url
    ? "既存の URL を読み込んでいます。必要なら再度 URL から自動読込を試せます。"
    : "この物件は URL なしで保存されています。";
}

function renderPropertyFormReviewArea() {
  if (!state.currentUser) {
    elements.formReviewHeading.textContent = "現在の利用者のレビュー";
    elements.formReviewHelper.textContent =
      "利用者を選ぶと、この欄がけいいち用 / ほのか用のどちらに保存されるか明確になります。";
    elements.formReviewFields.classList.add("hidden");
    elements.formReviewLocked.classList.remove("hidden");
    elements.formReviewRank.disabled = true;
    elements.formReviewComment.disabled = true;
    return;
  }

  const sourceProperty = state.editingPropertyId ? findPropertyById(state.editingPropertyId) : null;
  const review = sourceProperty ? sourceProperty.reviews[state.currentUser] : createEmptyReview();

  elements.formReviewHeading.textContent = `${getUserLabel(state.currentUser)}のレビュー`;
  elements.formReviewHelper.textContent = `${getUserLabel(state.currentUser)} 側のレビューとして保存されます。`;
  elements.formReviewFields.classList.remove("hidden");
  elements.formReviewLocked.classList.add("hidden");
  elements.formReviewRank.disabled = false;
  elements.formReviewComment.disabled = false;
  elements.formReviewRank.value = review.rank || "";
  elements.formReviewComment.value = review.comment || "";
}

function handlePropertyFormSubmit(event) {
  event.preventDefault();

  if (!elements.propertyForm.reportValidity()) {
    elements.formStatusMessage.textContent = "入力内容を確認してください。";
    return;
  }

  const existingProperty = state.editingPropertyId ? findPropertyById(state.editingPropertyId) : null;
  const now = new Date().toISOString();
  const rawPropertyUrl = cleanText(elements.propertyUrl.value);
  const normalizedPropertyUrl = rawPropertyUrl ? normalizeUrl(rawPropertyUrl) : "";

  if (rawPropertyUrl && !normalizedPropertyUrl) {
    elements.formStatusMessage.textContent = "掲載URL は http:// または https:// で始まる URL を入力してください。";
    return;
  }

  const property = {
    id: existingProperty ? existingProperty.id : createPropertyId(),
    title: cleanText(elements.propertyTitle.value),
    sourceSite: normalizeSourceSiteValue(elements.propertySourceSite.value),
    url: normalizedPropertyUrl,
    rent: toNullableNumber(elements.propertyRent.value),
    layout: cleanText(elements.propertyLayout.value),
    areaSize: toNullableNumber(elements.propertyAreaSize.value),
    station: cleanText(elements.propertyStation.value),
    walkMinutes: toNullableNumber(elements.propertyWalkMinutes.value),
    address: cleanText(elements.propertyAddress.value),
    builtYear: cleanText(elements.propertyBuiltYear.value),
    addedBy: USER_IDS.includes(elements.propertyAddedBy.value) ? elements.propertyAddedBy.value : "keiichi",
    memo: cleanText(elements.propertyMemo.value),
    createdAt: existingProperty ? existingProperty.createdAt : now,
    updatedAt: now,
    latitude: toNullableNumber(elements.propertyLatitude.value),
    longitude: toNullableNumber(elements.propertyLongitude.value),
    reviews: existingProperty ? cloneReviews(existingProperty.reviews) : createEmptyReviews(),
  };

  if (state.currentUser) {
    const existingReview = existingProperty ? existingProperty.reviews[state.currentUser] : createEmptyReview();
    property.reviews[state.currentUser] = buildReviewRecord(
      existingReview,
      normalizeRank(elements.formReviewRank.value),
      cleanText(elements.formReviewComment.value),
      now
    );
  }

  if (existingProperty) {
    const index = state.properties.findIndex((item) => item.id === existingProperty.id);
    state.properties.splice(index, 1, normalizeProperty(property));
  } else {
    state.properties.unshift(normalizeProperty(property));
  }

  savePropertiesToStorage();
  closeModal("form");
  renderAll();
  openPropertyDetail(property.id);
  showAppMessage(existingProperty ? "物件情報を更新しました。" : "新しい物件を追加しました。", "success");
}

async function handleImportFromUrl() {
  const rawUrl = cleanText(elements.importUrlInput.value);
  if (!rawUrl) {
    elements.importStatusMessage.textContent = "まずは SUUMO または HOME'S の URL を入力してください。";
    return;
  }

  const normalizedUrl = normalizeUrl(rawUrl);
  if (!normalizedUrl) {
    elements.importStatusMessage.textContent = "URL の形式が正しくないようです。https:// から始まる URL を入力してください。";
    return;
  }

  elements.importUrlInput.value = normalizedUrl;
  elements.propertyUrl.value = normalizedUrl;

  const detectedSite = detectSourceSiteFromUrl(normalizedUrl);
  const selectedHint = elements.importSourceSite.value;
  const preferredSite = selectedHint !== "自動判定" ? selectedHint : detectedSite || "手入力";

  elements.importStatusMessage.textContent = "URL を判定して、自動読込を試しています...";

  if (preferredSite && preferredSite !== "自動判定") {
    elements.propertySourceSite.value = normalizeSourceSiteValue(preferredSite);
  }

  const importButton = document.getElementById("importFromUrlButton");
  importButton.disabled = true;

  try {
    const result = await attemptImportFromUrl(normalizedUrl, preferredSite);
    applyImportedFields(result.fields);
    elements.importStatusMessage.textContent = result.message;
    elements.formStatusMessage.textContent = "";
    showAppMessage(result.message, result.tone);
  } finally {
    importButton.disabled = false;
  }
}

async function attemptImportFromUrl(url, preferredSite) {
  const detectedSite = detectSourceSiteFromUrl(url);
  const finalSite = preferredSite && preferredSite !== "自動判定" ? preferredSite : detectedSite || "手入力";
  const fields = {
    url,
    sourceSite: normalizeSourceSiteValue(finalSite),
  };

  if (!detectedSite && preferredSite === "自動判定") {
    return {
      fields,
      message: "SUUMO / HOME'S の URL と判定できませんでした。URL は保持したので、手入力で補完してください。",
      tone: "warning",
    };
  }

  if (finalSite === "手入力") {
    return {
      fields,
      message: "URL は保持しました。自動読込の対象外なので、下の手入力フォームで補完してください。",
      tone: "warning",
    };
  }

  try {
    // CORS の都合で失敗しやすいため、成功しても「補助入力」扱いで使います。
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "omit",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const extractedFields = extractPropertyFromHtml(html, finalSite);
    const mergedFields = { ...fields, ...extractedFields };
    const populatedKeys = Object.keys(extractedFields).filter((key) => hasMeaningfulValue(extractedFields[key]));

    if (populatedKeys.length === 0) {
      return {
        fields: mergedFields,
        message:
          `${finalSite} と判定しましたが、ブラウザから十分な情報を抜き出せませんでした。` +
          "URL は保持したので、手入力で補完してください。",
        tone: "warning",
      };
    }

    return {
      fields: mergedFields,
      message:
        `${finalSite} と判定し、${formatImportedFieldNames(populatedKeys)} をフォームに反映しました。` +
        "足りない項目だけ手入力で補完してください。",
      tone: "success",
    };
  } catch (error) {
    return {
      fields,
      message:
        `${finalSite} と判定しましたが、自動読込はできませんでした。` +
        "ブラウザの CORS 制約や掲載サイトの仕様による可能性があります。URL は保持したので、手入力で補完してください。",
      tone: "warning",
    };
  }
}

function extractPropertyFromHtml(html, sourceSite) {
  const parser = new DOMParser();
  const documentFromHtml = parser.parseFromString(html, "text/html");
  const pageText = normalizeWhitespace(
    (documentFromHtml.body?.textContent || documentFromHtml.documentElement?.textContent || "").replace(/\u3000/g, " ")
  );
  const jsonLdObjects = parseJsonLd(documentFromHtml);

  const addressCandidate = firstMeaningful([
    ...jsonLdObjects.map(extractAddressFromJsonLd),
    matchJapaneseAddress(pageText),
  ]);
  const stationInfo = extractStationInfo(pageText);
  const builtYearCandidate = firstMeaningful([
    ...jsonLdObjects.map(extractBuiltYearFromJsonLd),
    extractBuiltYearFromText(pageText),
  ]);
  const titleCandidate = cleanImportedTitle(
    firstMeaningful([
      documentFromHtml.querySelector('meta[property="og:title"]')?.getAttribute("content"),
      documentFromHtml.querySelector('meta[name="twitter:title"]')?.getAttribute("content"),
      ...jsonLdObjects.map((item) => item?.name),
      documentFromHtml.title,
    ]),
    sourceSite
  );

  const extracted = {
    title: titleCandidate,
    rent: extractRentFromText(pageText),
    layout: extractLayoutFromText(pageText),
    areaSize: extractAreaSizeFromText(pageText),
    station: stationInfo.station,
    walkMinutes: stationInfo.walkMinutes,
    address: addressCandidate,
    builtYear: builtYearCandidate,
  };

  return removeEmptyFields(extracted);
}

function applyImportedFields(fields) {
  if (hasMeaningfulValue(fields.sourceSite)) {
    elements.propertySourceSite.value = normalizeSourceSiteValue(fields.sourceSite);
    elements.importSourceSite.value = normalizeSourceSiteValue(fields.sourceSite);
  }

  if (hasMeaningfulValue(fields.url)) {
    elements.propertyUrl.value = fields.url;
    elements.importUrlInput.value = fields.url;
  }

  setFieldValueIfPresent(elements.propertyTitle, fields.title);
  setFieldValueIfPresent(elements.propertyRent, fields.rent);
  setFieldValueIfPresent(elements.propertyLayout, fields.layout);
  setFieldValueIfPresent(elements.propertyAreaSize, fields.areaSize);
  setFieldValueIfPresent(elements.propertyStation, fields.station);
  setFieldValueIfPresent(elements.propertyWalkMinutes, fields.walkMinutes);
  setFieldValueIfPresent(elements.propertyAddress, fields.address);
  setFieldValueIfPresent(elements.propertyBuiltYear, fields.builtYear);
}

function setFieldValueIfPresent(element, value) {
  if (!hasMeaningfulValue(value)) return;
  element.value = String(value);
}

function clearImportFields() {
  elements.importUrlInput.value = "";
  elements.importSourceSite.value = "自動判定";
  elements.propertyUrl.value = "";
  elements.importStatusMessage.textContent = "URL 欄をクリアしました。URL なしの手入力でも追加できます。";
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.settingsForm);
  const selectedUser = formData.get("currentUser");

  if (!USER_IDS.includes(selectedUser)) {
    showAppMessage("けいいち / ほのか のどちらかを選んでください。", "warning");
    return;
  }

  state.currentUser = selectedUser;
  saveCurrentUserToStorage(selectedUser);
  renderAll();

  const shouldReturnToDetail = state.settingsReturnTarget === "detail" && state.selectedPropertyId;
  closeModal("settings");
  state.settingsReturnTarget = null;

  if (shouldReturnToDetail) {
    openPropertyDetail(state.selectedPropertyId);
  }

  showAppMessage(`${getUserLabel(selectedUser)} として操作する設定を保存しました。`, "success");
}

function closeSettingsFlow() {
  const shouldReturnToDetail = state.settingsReturnTarget === "detail" && state.selectedPropertyId;
  closeModal("settings");
  state.settingsReturnTarget = null;

  if (shouldReturnToDetail) {
    openPropertyDetail(state.selectedPropertyId);
  }
}

function openSettingsModal(returnTarget) {
  state.settingsReturnTarget = returnTarget;
  syncSettingsForm();
  openModal("settings");
}

function syncSettingsForm() {
  const radioButtons = elements.settingsForm.querySelectorAll('input[name="currentUser"]');
  radioButtons.forEach((radio) => {
    radio.checked = radio.value === state.currentUser;
  });
}

function handlePropertyListClick(event) {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const { action, propertyId } = actionButton.dataset;
    if (action === "open-detail") openPropertyDetail(propertyId);
    if (action === "edit-property") openPropertyForm(propertyId);
    if (action === "focus-on-map") focusPropertyOnMap(propertyId);
    return;
  }

  const missingCoordinatesEdit = event.target.closest("#missingCoordinates [data-action='edit-property']");
  if (missingCoordinatesEdit) {
    openPropertyForm(missingCoordinatesEdit.dataset.propertyId);
  }
}

function handleMapCanvasClick(event) {
  const actionButton = event.target.closest("[data-action]");
  if (actionButton && actionButton.dataset.propertyId) {
    const { action, propertyId } = actionButton.dataset;
    if (action === "open-detail") {
      openPropertyDetail(propertyId);
    }
  }
}

function focusPropertyOnMap(propertyId) {
  const property = findPropertyById(propertyId);
  if (!property || !hasCoordinates(property)) {
    showAppMessage("緯度・経度が未設定なので、まだ地図のピンにはできません。", "warning");
    return;
  }

  document.getElementById("mapSection").scrollIntoView({ behavior: "smooth", block: "start" });
  invalidateMapSoon();

  window.setTimeout(() => {
    const marker = state.mapMarkers[propertyId];
    if (state.map) {
      state.map.setView([property.latitude, property.longitude], 15);
    }
    if (marker) {
      marker.openPopup();
    }
  }, 240);

  showAppMessage(`${property.title} を地図で表示しました。`, "success");
}

function deletePropertyById(propertyId) {
  const property = findPropertyById(propertyId);
  if (!property) return;

  const confirmed = window.confirm(`「${property.title}」を削除しますか？ この操作は取り消せません。`);
  if (!confirmed) return;

  state.properties = state.properties.filter((item) => item.id !== propertyId);
  savePropertiesToStorage();

  if (state.selectedPropertyId === propertyId) {
    state.selectedPropertyId = null;
    closeModal("detail");
  }

  if (state.editingPropertyId === propertyId) {
    state.editingPropertyId = null;
    closeModal("form");
  }

  renderAll();
  showAppMessage("物件を削除しました。", "danger");
}

function openModal(name) {
  closeModal("detail");
  closeModal("form");
  closeModal("settings");

  const modal = getModalElement(name);
  if (!modal) return;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  state.openModal = name;
}

function closeModal(name) {
  const modal = getModalElement(name);
  if (!modal) return;

  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  if (name === "form") {
    state.editingPropertyId = null;
    elements.formStatusMessage.textContent = "";
  }

  const anyVisibleModal = [elements.detailModal, elements.formModal, elements.settingsModal].some(
    (item) => item && !item.classList.contains("hidden")
  );

  if (!anyVisibleModal) {
    document.body.classList.remove("modal-open");
    state.openModal = null;
  }
}

function getModalElement(name) {
  if (name === "detail") return elements.detailModal;
  if (name === "form") return elements.formModal;
  if (name === "settings") return elements.settingsModal;
  return null;
}

function initializeMap() {
  if (!window.L) {
    elements.mapStatusText.textContent =
      "地図ライブラリを読み込めませんでした。通信環境があるときに再読み込みすると地図が表示されます。";
    return;
  }

  state.map = window.L.map(elements.mapCanvas, {
    zoomControl: true,
    scrollWheelZoom: false,
  }).setView([35.681236, 139.767125], 11);

  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(state.map);

  state.markerLayer = window.L.layerGroup().addTo(state.map);
}

function invalidateMapSoon() {
  if (!state.map) return;
  window.setTimeout(() => {
    state.map.invalidateSize();
  }, 220);
}

function getVisibleProperties() {
  return state.properties
    .filter(matchesCurrentFilters)
    .sort(comparePropertiesByCurrentSort);
}

function matchesCurrentFilters(property) {
  const searchText = normalizeWhitespace(
    [
      property.title,
      property.address,
      property.station,
      property.memo,
      property.reviews.keiichi.comment,
      property.reviews.honoka.comment,
    ]
      .join(" ")
      .toLowerCase()
  );

  const searchKeyword = state.filters.search.toLowerCase();
  const maxRent = Number(state.filters.maxRent || 0);
  const maxWalk = Number(state.filters.maxWalk || 0);
  const minimumRankScore = RANK_SCORES[state.filters.rank] || 0;

  if (searchKeyword && !searchText.includes(searchKeyword)) return false;
  if (state.filters.addedBy !== "all" && property.addedBy !== state.filters.addedBy) return false;
  if (state.filters.sourceSite !== "all" && property.sourceSite !== state.filters.sourceSite) return false;
  if (maxRent && Number(property.rent || 0) > maxRent) return false;
  if (maxWalk && Number(property.walkMinutes || Number.MAX_SAFE_INTEGER) > maxWalk) return false;

  if (
    minimumRankScore &&
    !USER_IDS.some((userId) => RANK_SCORES[property.reviews[userId].rank || ""] >= minimumRankScore)
  ) {
    return false;
  }

  return true;
}

function comparePropertiesByCurrentSort(propertyA, propertyB) {
  if (state.filters.sort === "rentAsc") {
    return compareNullableNumbers(propertyA.rent, propertyB.rent, "asc");
  }

  if (state.filters.sort === "rentDesc") {
    return compareNullableNumbers(propertyA.rent, propertyB.rent, "desc");
  }

  if (state.filters.sort === "walkAsc") {
    return compareNullableNumbers(propertyA.walkMinutes, propertyB.walkMinutes, "asc");
  }

  if (state.filters.sort === "ratingDesc") {
    const ratingA = getRatingMetrics(propertyA);
    const ratingB = getRatingMetrics(propertyB);

    if (ratingB.average !== ratingA.average) return ratingB.average - ratingA.average;
    if (ratingB.best !== ratingA.best) return ratingB.best - ratingA.best;
    return new Date(propertyB.updatedAt).getTime() - new Date(propertyA.updatedAt).getTime();
  }

  return new Date(propertyB.createdAt).getTime() - new Date(propertyA.createdAt).getTime();
}

function getRatingMetrics(property) {
  const scores = USER_IDS.map((userId) => RANK_SCORES[property.reviews[userId].rank || ""]);
  const total = scores.reduce((sum, score) => sum + score, 0);
  const average = total / USER_IDS.length;
  const best = Math.max(...scores);
  return { average, best };
}

function compareNullableNumbers(valueA, valueB, direction) {
  const hasA = hasMeaningfulValue(valueA);
  const hasB = hasMeaningfulValue(valueB);

  if (!hasA && !hasB) return 0;
  if (!hasA) return 1;
  if (!hasB) return -1;

  const safeA = Number(valueA);
  const safeB = Number(valueB);

  if (direction === "desc") {
    return safeB - safeA;
  }

  return safeA - safeB;
}

function loadCurrentUserFromStorage() {
  const savedUser = readStorage(STORAGE_KEYS.currentUser);
  return USER_IDS.includes(savedUser) ? savedUser : null;
}

function saveCurrentUserToStorage(userId) {
  writeStorage(STORAGE_KEYS.currentUser, userId);
}

function loadPropertiesFromStorage() {
  const storedValue = readStorage(STORAGE_KEYS.properties);

  if (storedValue === null) {
    const sampleData = cloneSampleProperties();
    writeStorage(STORAGE_KEYS.properties, JSON.stringify(sampleData));
    return sampleData.map(normalizeProperty);
  }

  try {
    const parsed = JSON.parse(storedValue);
    if (!Array.isArray(parsed)) throw new Error("Array expected");
    return parsed.map(normalizeProperty);
  } catch (error) {
    const fallbackData = cloneSampleProperties();
    writeStorage(STORAGE_KEYS.properties, JSON.stringify(fallbackData));
    showAppMessage("保存データの読み込みに失敗したため、サンプルデータを再投入しました。", "warning");
    return fallbackData.map(normalizeProperty);
  }
}

function savePropertiesToStorage() {
  writeStorage(STORAGE_KEYS.properties, JSON.stringify(state.properties));
}

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    showAppMessage("localStorage に保存できませんでした。プライベートブラウズ設定などを確認してください。", "warning");
    return false;
  }
}

function normalizeProperty(property) {
  const normalizedReviews = createEmptyReviews();
  USER_IDS.forEach((userId) => {
    const sourceReview = property.reviews?.[userId] || createEmptyReview();
    normalizedReviews[userId] = {
      rank: normalizeRank(sourceReview.rank),
      comment: cleanText(sourceReview.comment),
      updatedAt: cleanText(sourceReview.updatedAt),
    };
  });

  return {
    id: cleanText(property.id) || createPropertyId(),
    title: cleanText(property.title),
    sourceSite: normalizeSourceSiteValue(property.sourceSite),
    url: normalizeUrl(cleanText(property.url)),
    rent: toNullableNumber(property.rent),
    layout: cleanText(property.layout),
    areaSize: toNullableNumber(property.areaSize),
    station: cleanText(property.station),
    walkMinutes: toNullableNumber(property.walkMinutes),
    address: cleanText(property.address),
    builtYear: cleanText(property.builtYear),
    addedBy: USER_IDS.includes(property.addedBy) ? property.addedBy : "keiichi",
    memo: cleanText(property.memo),
    createdAt: cleanText(property.createdAt) || new Date().toISOString(),
    updatedAt: cleanText(property.updatedAt) || cleanText(property.createdAt) || new Date().toISOString(),
    latitude: toNullableNumber(property.latitude),
    longitude: toNullableNumber(property.longitude),
    reviews: normalizedReviews,
  };
}

function createEmptyReviews() {
  return {
    keiichi: createEmptyReview(),
    honoka: createEmptyReview(),
  };
}

function createEmptyReview() {
  return {
    rank: "",
    comment: "",
    updatedAt: "",
  };
}

function buildReviewRecord(existingReview, rank, comment, now) {
  const hasContent = Boolean(rank || comment);
  const hasChanged = (existingReview?.rank || "") !== rank || (existingReview?.comment || "") !== comment;

  if (!hasContent) {
    return { rank: "", comment: "", updatedAt: "" };
  }

  return {
    rank,
    comment,
    updatedAt: hasChanged ? now : existingReview?.updatedAt || now,
  };
}

function cloneSampleProperties() {
  return JSON.parse(JSON.stringify(SAMPLE_PROPERTIES));
}

function cloneReviews(reviews) {
  return JSON.parse(JSON.stringify(reviews || createEmptyReviews()));
}

function detectSourceSiteFromUrl(url) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes("suumo.jp")) return "SUUMO";
    if (hostname.includes("homes.co.jp")) return "HOME'S";
    return "";
  } catch (error) {
    return "";
  }
}

function normalizeSourceSiteValue(value) {
  if (value === "SUUMO" || value === "HOME'S") return value;
  return "手入力";
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    return /^https?:$/i.test(parsed.protocol) ? parsed.toString() : "";
  } catch (error) {
    return "";
  }
}

function normalizeRank(rank) {
  return ["S", "A", "B", "C"].includes(rank) ? rank : "";
}

function toNullableNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function findPropertyById(propertyId) {
  return state.properties.find((property) => property.id === propertyId) || null;
}

function createPropertyId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `property-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getUserLabel(userId) {
  return USER_OPTIONS[userId]?.label || "未設定";
}

function formatCurrency(value) {
  if (!hasMeaningfulValue(value)) return "未入力";
  return `¥${new Intl.NumberFormat("ja-JP").format(Number(value))}`;
}

function formatArea(value) {
  if (!hasMeaningfulValue(value)) return "未入力";
  return `${Number(value).toFixed(Number(value) % 1 === 0 ? 0 : 1)}m²`;
}

function formatWalk(value) {
  if (!hasMeaningfulValue(value)) return "徒歩未入力";
  return `徒歩${Number(value)}分`;
}

function formatStation(value) {
  if (!value) return "未入力";
  return value.endsWith("駅") ? value : `${value}駅`;
}

function formatDateTime(value) {
  if (!value) return "未入力";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未入力";

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function buildPropertyLead(property) {
  return [
    formatCurrency(property.rent),
    property.layout || "間取り未入力",
    formatArea(property.areaSize),
    `${formatStation(property.station)} ${formatWalk(property.walkMinutes)}`,
    property.address || "住所未入力",
  ].join(" / ");
}

function getCommentCount(property) {
  let count = 0;
  if (property.memo) count += 1;
  USER_IDS.forEach((userId) => {
    if (property.reviews[userId].comment) count += 1;
  });
  return count;
}

function hasCoordinates(property) {
  return Number.isFinite(property.latitude) && Number.isFinite(property.longitude);
}

function hasMeaningfulValue(value) {
  return value !== null && value !== undefined && value !== "";
}

function getRankClassName(rank) {
  if (!rank) return "rank-empty";
  return `rank-${rank.toLowerCase()}`;
}

function showAppMessage(message, tone = "success") {
  if (!elements.appMessage) return;

  elements.appMessage.textContent = message;
  elements.appMessage.dataset.tone = tone;
  elements.appMessage.classList.remove("hidden");

  window.clearTimeout(appMessageTimer);
  appMessageTimer = window.setTimeout(() => {
    elements.appMessage.classList.add("hidden");
  }, 4200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : value == null ? "" : String(value).trim();
}

function normalizeWhitespace(value) {
  return cleanText(value).replace(/\s+/g, " ");
}

function formatImportedFieldNames(fieldNames) {
  return fieldNames.map((fieldName) => IMPORT_FIELD_LABELS[fieldName] || fieldName).join(" / ");
}

function firstMeaningful(values) {
  return values.find((value) => hasMeaningfulValue(value)) || "";
}

function removeEmptyFields(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => hasMeaningfulValue(value))
  );
}

function parseJsonLd(documentFromHtml) {
  const scriptElements = Array.from(documentFromHtml.querySelectorAll('script[type="application/ld+json"]'));

  return scriptElements.flatMap((scriptElement) => {
    try {
      const parsed = JSON.parse(scriptElement.textContent || "{}");
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      return [];
    }
  });
}

function extractAddressFromJsonLd(item) {
  if (!item || !item.address) return "";
  if (typeof item.address === "string") return cleanText(item.address);

  const parts = [
    item.address.addressRegion,
    item.address.addressLocality,
    item.address.streetAddress,
  ].filter(Boolean);

  return parts.join("");
}

function extractBuiltYearFromJsonLd(item) {
  if (!item) return "";
  if (item.yearBuilt) return String(item.yearBuilt);
  if (item.dateCreated) return String(item.dateCreated);
  return "";
}

function extractRentFromText(text) {
  const match = text.match(/(\d{1,3}(?:,\d{3})+|\d{4,6})\s*円/);
  return match ? Number(match[1].replaceAll(",", "")) : null;
}

function extractLayoutFromText(text) {
  const match = text.match(/(ワンルーム|1R|1K|1DK|1LDK|2K|2DK|2LDK|3K|3DK|3LDK|4LDK)/i);
  return match ? match[1].toUpperCase() : "";
}

function extractAreaSizeFromText(text) {
  const match = text.match(/(\d{1,3}(?:\.\d+)?)\s*(?:m2|㎡)/i);
  return match ? Number(match[1]) : null;
}

function extractStationInfo(text) {
  const match = text.match(/([^\s、,]{1,24}?駅)\s*徒歩\s*(\d{1,2})分/);
  if (!match) {
    return { station: "", walkMinutes: null };
  }

  return {
    station: match[1].replace(/駅$/, ""),
    walkMinutes: Number(match[2]),
  };
}

function matchJapaneseAddress(text) {
  const match = text.match(/(東京都|神奈川県|千葉県|埼玉県)[^\s]{4,80}/);
  return match ? match[0] : "";
}

function extractBuiltYearFromText(text) {
  const directMatch = text.match(/(20\d{2}年\d{1,2}月|築\d{1,2}年)/);
  return directMatch ? directMatch[1] : "";
}

function cleanImportedTitle(title, sourceSite) {
  if (!title) return "";

  return title
    .replace(/^\[[^\]]+\]\s*/, "")
    .replace(/^【[^】]+】\s*/, "")
    .replace(/\s*[|｜].*$/, "")
    .replace(/\s*-\s*(SUUMO|HOME'S).*$/i, "")
    .replace(new RegExp(`\\s*${sourceSite}\\s*$`, "i"), "")
    .trim();
}
