const STORAGE_KEYS = {
  currentUser: "living-room-finder.currentUser",
  properties: "living-room-finder.properties",
  preparationItems: "living-room-finder.preparationItems",
  sharedWorkspace: "living-room-finder.sharedWorkspace",
  sharedPassphrase: "living-room-finder.sharedPassphrase",
};
const SHARED_SYNC_DEFAULTS = {
  workspace: "keiichi-honoka-main",
  pollIntervalMs: 15000,
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
const PREPARATION_CATEGORY_OPTIONS = {
  buy: {
    label: "買うもの",
    heading: "購入品",
    cardClass: "prep-card-buy",
  },
  carry: {
    label: "持っていくもの",
    heading: "持参品",
    cardClass: "prep-card-carry",
  },
};
const PREPARATION_STATUS_OPTIONS = {
  todo: {
    label: "未対応",
    order: 0,
    chipClass: "chip-status-todo",
  },
  doing: {
    label: "対応中",
    order: 1,
    chipClass: "chip-status-doing",
  },
  done: {
    label: "完了",
    order: 2,
    chipClass: "chip-status-done",
  },
};
const PREPARATION_OWNER_OPTIONS = {
  common: "共通",
  keiichi: "けいいち",
  honoka: "ほのか",
};
const PREPARATION_ASSIGNEE_OPTIONS = {
  undecided: "未定",
  keiichi: "けいいち",
  honoka: "ほのか",
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
const SAMPLE_PREPARATION_ITEMS = [
  {
    id: "prep-sample-001",
    itemName: "冷蔵庫",
    category: "buy",
    ownerType: "common",
    carryFrom: "undecided",
    assignedTo: "undecided",
    status: "todo",
    quantity: 1,
    note: "サイズは物件が決まってから確認する",
    createdAt: "2026-03-03T18:00:00+09:00",
    updatedAt: "2026-03-03T18:00:00+09:00",
  },
  {
    id: "prep-sample-002",
    itemName: "洗濯機",
    category: "buy",
    ownerType: "common",
    carryFrom: "undecided",
    assignedTo: "keiichi",
    status: "doing",
    quantity: 1,
    note: "ドラム式まで見るかは予算次第",
    createdAt: "2026-03-04T11:20:00+09:00",
    updatedAt: "2026-03-08T20:30:00+09:00",
  },
  {
    id: "prep-sample-003",
    itemName: "ベッド",
    category: "buy",
    ownerType: "common",
    carryFrom: "undecided",
    assignedTo: "honoka",
    status: "todo",
    quantity: 1,
    note: "",
    createdAt: "2026-03-05T08:30:00+09:00",
    updatedAt: "2026-03-05T08:30:00+09:00",
  },
  {
    id: "prep-sample-004",
    itemName: "炊飯器",
    category: "carry",
    ownerType: "keiichi",
    carryFrom: "keiichi",
    assignedTo: "keiichi",
    status: "done",
    quantity: 1,
    note: "今のものをそのまま持っていく",
    createdAt: "2026-03-02T09:00:00+09:00",
    updatedAt: "2026-03-07T12:30:00+09:00",
  },
  {
    id: "prep-sample-005",
    itemName: "ドライヤー",
    category: "carry",
    ownerType: "honoka",
    carryFrom: "honoka",
    assignedTo: "honoka",
    status: "done",
    quantity: 1,
    note: "",
    createdAt: "2026-03-02T09:10:00+09:00",
    updatedAt: "2026-03-07T12:35:00+09:00",
  },
  {
    id: "prep-sample-006",
    itemName: "食器棚",
    category: "buy",
    ownerType: "common",
    carryFrom: "undecided",
    assignedTo: "undecided",
    status: "todo",
    quantity: 1,
    note: "横幅は 90cm 以内で探したい",
    createdAt: "2026-03-06T19:40:00+09:00",
    updatedAt: "2026-03-06T19:40:00+09:00",
  },
];

const state = {
  currentUser: null,
  properties: [],
  preparationItems: [],
  filters: {
    search: "",
    sort: "createdDesc",
    addedBy: "all",
    sourceSite: "all",
    rank: "all",
    maxRent: "",
    maxWalk: "",
  },
  preparation: {
    filter: "all",
    sort: "createdDesc",
  },
  selectedPropertyId: null,
  editingPropertyId: null,
  editingPreparationItemId: null,
  openModal: null,
  settingsReturnTarget: null,
  map: null,
  markerLayer: null,
  mapMarkers: {},
  ui: {
    activeView: "list",
    filtersExpanded: false,
  },
  sync: {
    mode: "local",
    workspace: SHARED_SYNC_DEFAULTS.workspace,
    passphrase: "",
    revision: 0,
    lastSyncedAt: "",
    statusMessage: "共有設定を保存すると、2台で同じ物件一覧を見られます。",
    pollTimer: null,
    isSyncing: false,
  },
};

const elements = {};
let appMessageTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  initializeApp().catch((error) => {
    console.error(error);
    showAppMessage("初期化中に問題が起きました。ページを再読み込みしてもう一度試してください。", "danger");
  });
});

async function initializeApp() {
  cacheElements();
  bindEvents();
  initializeMap();
  await loadInitialData();
  renderAll();

  if (!state.currentUser) {
    openSettingsModal(null);
    showAppMessage("最初に利用者を選ぶと、現在の自分のレビューをすぐ更新できます。", "warning");
  }
}

function cacheElements() {
  elements.appMessage = document.getElementById("appMessage");
  elements.openPrimaryAddButton = document.getElementById("openPropertyFormButton");
  elements.topSearchField = document.getElementById("topSearchField");
  elements.activeUserName = document.getElementById("activeUserName");
  elements.activeUserHint = document.getElementById("activeUserHint");
  elements.syncModeLabel = document.getElementById("syncModeLabel");
  elements.syncStatusMessage = document.getElementById("syncStatusMessage");
  elements.syncWorkspaceLabel = document.getElementById("syncWorkspaceLabel");
  elements.syncLastSynced = document.getElementById("syncLastSynced");
  elements.manualSyncButton = document.getElementById("manualSyncButton");
  elements.currentUserNotice = document.getElementById("currentUserNotice");
  elements.summaryPropertyCount = document.getElementById("summaryPropertyCount");
  elements.summaryFilteredCount = document.getElementById("summaryFilteredCount");
  elements.summaryTopRatedCount = document.getElementById("summaryTopRatedCount");
  elements.summaryMappedCount = document.getElementById("summaryMappedCount");
  elements.filterSummary = document.getElementById("filterSummary");
  elements.toggleFiltersButton = document.getElementById("toggleFiltersButton");
  elements.filtersPanel = document.getElementById("filtersPanel");
  elements.propertyControlsPanel = document.getElementById("propertyControlsPanel");
  elements.prepControlsPanel = document.getElementById("prepControlsPanel");
  elements.showListViewButton = document.getElementById("showListViewButton");
  elements.showMapViewButton = document.getElementById("showMapViewButton");
  elements.showPrepViewButton = document.getElementById("showPrepViewButton");
  elements.quickNavListButton = document.getElementById("quickNavListButton");
  elements.quickNavMapButton = document.getElementById("quickNavMapButton");
  elements.quickNavPrepButton = document.getElementById("quickNavPrepButton");
  elements.openAddFromNavButton = document.getElementById("openAddFromNavButton");

  elements.searchInput = document.getElementById("searchInput");
  elements.sortSelect = document.getElementById("sortSelect");
  elements.filterAddedBy = document.getElementById("filterAddedBy");
  elements.filterSourceSite = document.getElementById("filterSourceSite");
  elements.filterRank = document.getElementById("filterRank");
  elements.filterMaxRent = document.getElementById("filterMaxRent");
  elements.filterMaxWalk = document.getElementById("filterMaxWalk");

  elements.propertyList = document.getElementById("propertyList");
  elements.emptyState = document.getElementById("emptyState");
  elements.listSection = document.getElementById("listSection");
  elements.mapSection = document.getElementById("mapSection");
  elements.prepSection = document.getElementById("prepSection");
  elements.mapCanvas = document.getElementById("mapCanvas");
  elements.mapStatusText = document.getElementById("mapStatusText");
  elements.missingCoordinates = document.getElementById("missingCoordinates");
  elements.prepFilterSelect = document.getElementById("prepFilterSelect");
  elements.prepSortSelect = document.getElementById("prepSortSelect");
  elements.prepFilterSummary = document.getElementById("prepFilterSummary");
  elements.prepBuyList = document.getElementById("prepBuyList");
  elements.prepCarryList = document.getElementById("prepCarryList");
  elements.prepBuyCount = document.getElementById("prepBuyCount");
  elements.prepCarryCount = document.getElementById("prepCarryCount");
  elements.prepListEmptyState = document.getElementById("prepListEmptyState");

  elements.detailModal = document.getElementById("detailModal");
  elements.formModal = document.getElementById("formModal");
  elements.settingsModal = document.getElementById("settingsModal");
  elements.prepFormModal = document.getElementById("prepFormModal");

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
  elements.sharedWorkspaceInput = document.getElementById("sharedWorkspaceInput");
  elements.sharedPassphraseInput = document.getElementById("sharedPassphraseInput");
  elements.settingsSyncStatus = document.getElementById("settingsSyncStatus");

  elements.prepItemForm = document.getElementById("prepItemForm");
  elements.prepFormModalTitle = document.getElementById("prepFormModalTitle");
  elements.prepItemName = document.getElementById("prepItemName");
  elements.prepCategory = document.getElementById("prepCategory");
  elements.prepOwnerType = document.getElementById("prepOwnerType");
  elements.prepCarryFromField = document.getElementById("prepCarryFromField");
  elements.prepCarryFrom = document.getElementById("prepCarryFrom");
  elements.prepAssignedTo = document.getElementById("prepAssignedTo");
  elements.prepStatus = document.getElementById("prepStatus");
  elements.prepQuantity = document.getElementById("prepQuantity");
  elements.prepNote = document.getElementById("prepNote");
  elements.prepFormHint = document.getElementById("prepFormHint");
  elements.prepFormStatusMessage = document.getElementById("prepFormStatusMessage");
  elements.savePrepItemButton = document.getElementById("savePrepItemButton");
}

async function loadInitialData() {
  state.currentUser = loadCurrentUserFromStorage();
  state.properties = loadPropertiesFromStorage();
  state.preparationItems = loadPreparationItemsFromStorage();
  loadSharedSyncSettingsFromStorage();

  if (hasSharedSyncConfig()) {
    const connected = await connectSharedWorkspace(state.properties, { silent: true });
    if (!connected) {
      state.properties = loadPropertiesFromStorage();
      setLocalSyncStatus("共有に接続できなかったため、この端末の保存データを表示しています。");
    }
    return;
  }

  setLocalSyncStatus("現在はこの端末だけに保存しています。共有したいときは設定でワークスペースを保存してください。");
}

function bindEvents() {
  const openFormButtons = [
    "openAddInlineButton",
    "emptyAddPropertyButton",
  ];
  openFormButtons.forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => openPropertyForm());
    }
  });

  [elements.openPrimaryAddButton, elements.openAddFromNavButton].forEach((button) => {
    if (button) {
      button.addEventListener("click", openAddForCurrentView);
    }
  });

  [
    document.getElementById("openPrepFormButton"),
    document.getElementById("openPrepFormInlineButton"),
    document.getElementById("emptyAddPrepButton"),
  ].forEach((button) => {
    if (button) {
      button.addEventListener("click", () => openPreparationForm());
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

  [
    elements.showListViewButton,
    elements.quickNavListButton,
  ].forEach((button) => {
    if (button) {
      button.addEventListener("click", () => switchMainView("list"));
    }
  });

  [
    elements.showMapViewButton,
    elements.quickNavMapButton,
  ].forEach((button) => {
    if (button) {
      button.addEventListener("click", () => switchMainView("map", { scroll: true }));
    }
  });

  [
    elements.showPrepViewButton,
    elements.quickNavPrepButton,
  ].forEach((button) => {
    if (button) {
      button.addEventListener("click", () => switchMainView("prep", { scroll: true }));
    }
  });

  document.getElementById("openSettingsFromDetailButton").addEventListener("click", () => {
    closeModal("detail");
    openSettingsModal("detail");
  });

  document.getElementById("clearFiltersButton").addEventListener("click", resetFilters);
  document.getElementById("emptyResetFiltersButton").addEventListener("click", resetFilters);
  elements.toggleFiltersButton.addEventListener("click", toggleFiltersPanel);
  document.getElementById("cancelFormButton").addEventListener("click", () => closeModal("form"));
  document.getElementById("cancelPrepFormButton").addEventListener("click", () => closeModal("prepForm"));
  document.getElementById("closeSettingsButton").addEventListener("click", closeSettingsFlow);
  document.getElementById("clearImportButton").addEventListener("click", clearImportFields);
  document.getElementById("importFromUrlButton").addEventListener("click", handleImportFromUrl);
  document.getElementById("resetPrepFilterButton").addEventListener("click", resetPreparationFilters);
  elements.manualSyncButton.addEventListener("click", () => {
    refreshSharedProperties({ manual: true });
  });

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

  [elements.prepFilterSelect, elements.prepSortSelect].forEach((input) => {
    input.addEventListener("change", handlePreparationFilterChange);
  });

  elements.propertyList.addEventListener("click", handlePropertyListClick);
  elements.mapCanvas.addEventListener("click", handleMapCanvasClick);
  elements.missingCoordinates.addEventListener("click", handlePropertyListClick);
  elements.prepSection.addEventListener("click", handlePreparationListClick);
  elements.prepSection.addEventListener("change", handlePreparationListChange);
  elements.quickReviewForm.addEventListener("submit", handleQuickReviewSubmit);
  elements.propertyForm.addEventListener("submit", handlePropertyFormSubmit);
  elements.settingsForm.addEventListener("submit", handleSettingsSubmit);
  elements.prepItemForm.addEventListener("submit", handlePreparationFormSubmit);
  elements.prepCategory.addEventListener("change", syncPreparationCarryFieldVisibility);

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

function handlePreparationFilterChange() {
  state.preparation.filter = elements.prepFilterSelect.value;
  state.preparation.sort = elements.prepSortSelect.value;
  renderPreparationUi();
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

function resetPreparationFilters() {
  elements.prepFilterSelect.value = "all";
  elements.prepSortSelect.value = "createdDesc";
  handlePreparationFilterChange();
  showAppMessage("準備リストの絞り込みを戻しました。", "success");
}

function renderAll() {
  renderCurrentUserArea();
  renderSyncStatus();
  renderOverview();
  renderFilterUi();
  renderPreparationUi();
  renderViewState();
  renderPropertyList();
  renderMap();
  syncSettingsForm();
  syncOpenModalContent();
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

function renderSyncStatus() {
  if (state.sync.mode === "shared") {
    elements.syncModeLabel.textContent = "2人で共有中";
    elements.syncStatusMessage.textContent = state.sync.statusMessage;
    elements.syncWorkspaceLabel.textContent = `workspace: ${state.sync.workspace}`;
    elements.syncLastSynced.textContent = state.sync.lastSyncedAt
      ? `最終同期: ${formatDateTime(state.sync.lastSyncedAt)}`
      : "最終同期: 接続済み";
    elements.manualSyncButton.disabled = state.sync.isSyncing;
    return;
  }

  elements.syncModeLabel.textContent = "この端末だけ";
  elements.syncStatusMessage.textContent = state.sync.statusMessage;
  elements.syncWorkspaceLabel.textContent = "workspace: ローカルのみ";
  elements.syncLastSynced.textContent = "最終同期: まだ未接続";
  elements.manualSyncButton.disabled = true;
}

function syncOpenModalContent() {
  if (state.openModal === "detail" && state.selectedPropertyId) {
    const property = findPropertyById(state.selectedPropertyId);
    if (property) {
      renderDetailModal(property);
    } else {
      closeModal("detail");
    }
    return;
  }

  if (state.openModal === "prepForm" && state.editingPreparationItemId) {
    const item = findPreparationItemById(state.editingPreparationItemId);
    if (!item) {
      closeModal("prepForm");
    }
  }
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

function renderFilterUi() {
  const appliedCount = getAppliedFilterCount();
  const buttonLabel = state.ui.filtersExpanded
    ? "絞り込みを閉じる"
    : appliedCount > 0
      ? `絞り込み ${appliedCount}件`
      : "絞り込み";

  elements.toggleFiltersButton.textContent = buttonLabel;
  elements.filtersPanel.classList.toggle("hidden", !state.ui.filtersExpanded);
}

function renderViewState() {
  const isListView = state.ui.activeView === "list";
  const isMapView = state.ui.activeView === "map";
  const isPrepView = state.ui.activeView === "prep";

  elements.listSection.classList.toggle("hidden", !isListView);
  elements.mapSection.classList.toggle("hidden", !isMapView);
  elements.prepSection.classList.toggle("hidden", !isPrepView);
  elements.propertyControlsPanel.classList.toggle("hidden", isPrepView);
  elements.prepControlsPanel.classList.toggle("hidden", !isPrepView);
  elements.topSearchField.classList.toggle("hidden", isPrepView);

  syncViewButtonState(elements.showListViewButton, isListView);
  syncViewButtonState(elements.quickNavListButton, isListView);
  syncViewButtonState(elements.showMapViewButton, isMapView);
  syncViewButtonState(elements.quickNavMapButton, isMapView);
  syncViewButtonState(elements.showPrepViewButton, isPrepView);
  syncViewButtonState(elements.quickNavPrepButton, isPrepView);

  if (elements.openPrimaryAddButton) {
    elements.openPrimaryAddButton.textContent = isPrepView ? "準備を追加" : "物件を追加";
  }

  if (isMapView) {
    invalidateMapSoon();
  }
}

function syncViewButtonState(button, isActive) {
  if (!button) return;
  button.classList.toggle("is-active", isActive);
  button.setAttribute("aria-pressed", String(isActive));
}

function toggleFiltersPanel() {
  state.ui.filtersExpanded = !state.ui.filtersExpanded;
  renderFilterUi();
}

function switchMainView(viewName, options = {}) {
  state.ui.activeView = ["map", "prep"].includes(viewName) ? viewName : "list";
  renderViewState();

  if (options.scroll) {
    const target = state.ui.activeView === "map"
      ? elements.mapSection
      : state.ui.activeView === "prep"
        ? elements.prepSection
        : elements.listSection;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getAppliedFilterCount() {
  let count = 0;
  if (state.filters.search) count += 1;
  if (state.filters.addedBy !== "all") count += 1;
  if (state.filters.sourceSite !== "all") count += 1;
  if (state.filters.rank !== "all") count += 1;
  if (state.filters.maxRent) count += 1;
  if (state.filters.maxWalk) count += 1;
  return count;
}

function renderPreparationUi() {
  const visibleItems = getVisiblePreparationItems();
  const buyItems = visibleItems.filter((item) => item.category === "buy");
  const carryItems = visibleItems.filter((item) => item.category === "carry");

  elements.prepFilterSelect.value = state.preparation.filter;
  elements.prepSortSelect.value = state.preparation.sort;
  elements.prepBuyCount.textContent = `${buyItems.length}件`;
  elements.prepCarryCount.textContent = `${carryItems.length}件`;
  elements.prepBuyList.innerHTML = buyItems.length
    ? buyItems.map(buildPreparationItemCardHtml).join("")
    : buildPreparationEmptyCategoryHtml("買うものはまだありません。");
  elements.prepCarryList.innerHTML = carryItems.length
    ? carryItems.map(buildPreparationItemCardHtml).join("")
    : buildPreparationEmptyCategoryHtml("持っていくものはまだありません。");
  elements.prepListEmptyState.classList.toggle("hidden", visibleItems.length !== 0);

  const filterNotes = [];
  if (state.preparation.filter !== "all") {
    filterNotes.push(getPreparationFilterLabel(state.preparation.filter));
  }
  filterNotes.push(`並び替え: ${getPreparationSortLabel(state.preparation.sort)}`);
  elements.prepFilterSummary.textContent = `${state.preparationItems.length}件中 ${visibleItems.length}件を表示中。${filterNotes.join(" / ")}。このリストは今の端末に保存されます。`;
}

function renderPropertyList() {
  const visibleProperties = getVisibleProperties();
  elements.propertyList.innerHTML = visibleProperties.map(buildPropertyCardHtml).join("");
  elements.emptyState.classList.toggle("hidden", visibleProperties.length !== 0);
}

function buildPreparationItemCardHtml(item) {
  const status = PREPARATION_STATUS_OPTIONS[item.status];
  const itemMeta = [
    `<span class="meta-inline-text">${escapeHtml(getPreparationOwnerLabel(item.ownerType))}</span>`,
    item.category === "carry"
      ? `<span class="meta-inline-text">${escapeHtml(getPreparationCarryLabel(item.carryFrom))}</span>`
      : "",
    `<span class="meta-inline-text">担当: ${escapeHtml(getPreparationAssignedLabel(item.assignedTo))}</span>`,
    `<span class="chip ${status.chipClass}">${escapeHtml(status.label)}</span>`,
    item.note
      ? `<span class="chip chip-comment">メモあり</span>`
      : `<span class="chip chip-muted">メモなし</span>`,
  ].filter(Boolean).join("");

  return `
    <article class="prep-card ${PREPARATION_CATEGORY_OPTIONS[item.category].cardClass}" data-prep-id="${escapeHtml(item.id)}">
      <div class="prep-card-top">
        <div class="prep-card-heading">
          <h3 class="prep-item-title">${escapeHtml(item.itemName)}</h3>
          <p class="prep-item-caption">${escapeHtml(PREPARATION_CATEGORY_OPTIONS[item.category].label)}</p>
        </div>
        <span class="prep-quantity-chip">数量 ${escapeHtml(formatPreparationQuantity(item.quantity))}</span>
      </div>

      <div class="prep-meta-row">
        ${itemMeta}
      </div>

      <div class="prep-card-footer">
        <label class="field field-compact prep-status-field">
          <span>進み具合</span>
          <select data-action="change-prep-status" data-prep-id="${escapeHtml(item.id)}">
            ${Object.entries(PREPARATION_STATUS_OPTIONS)
              .map(([statusKey, config]) => `
                <option value="${statusKey}" ${item.status === statusKey ? "selected" : ""}>${escapeHtml(config.label)}</option>
              `)
              .join("")}
          </select>
        </label>

        <div class="prep-action-row">
          <button type="button" class="secondary-button prep-small-button" data-action="edit-prep" data-prep-id="${escapeHtml(item.id)}">
            編集
          </button>
          <button type="button" class="danger-button prep-small-button" data-action="delete-prep" data-prep-id="${escapeHtml(item.id)}">
            削除
          </button>
        </div>
      </div>
    </article>
  `;
}

function buildPreparationEmptyCategoryHtml(message) {
  return `
    <div class="prep-empty-card">
      <p class="helper-text">${escapeHtml(message)}</p>
    </div>
  `;
}

function buildPropertyCardHtml(property) {
  const orderedUsers = state.currentUser
    ? [state.currentUser, ...USER_IDS.filter((userId) => userId !== state.currentUser)]
    : USER_IDS;

  return `
    <article class="property-card" data-property-id="${escapeHtml(property.id)}">
      <div class="property-card-heading">
        <h3 class="property-title">${escapeHtml(property.title)}</h3>
        <p class="property-summary">
          ${escapeHtml(formatCurrency(property.rent))} / ${escapeHtml(property.layout || "間取り未入力")}
        </p>
      </div>

      <div class="card-meta-inline">
        <span class="meta-inline-text">${escapeHtml(formatStation(property.station))}</span>
        <span class="meta-inline-text">${escapeHtml(formatWalk(property.walkMinutes))}</span>
        <span class="chip ${USER_OPTIONS[property.addedBy].chipClass}">${escapeHtml(getUserLabel(property.addedBy))}追加</span>
      </div>

      <div class="review-compact-strip">
        ${orderedUsers.map((userId) => buildCompactReviewCard(property, userId)).join("")}
      </div>

      <div class="card-actions card-actions-compact">
        <button type="button" class="primary-button" data-action="open-detail" data-property-id="${escapeHtml(property.id)}">
          詳細を見る
        </button>
      </div>
    </article>
  `;
}

function buildCompactReviewCard(property, userId) {
  const review = property.reviews[userId];
  const isCurrentUser = state.currentUser === userId;
  const summaryLabel = state.currentUser
    ? isCurrentUser
      ? "自分の評価"
      : "相手の評価"
    : `${getUserLabel(userId)}の評価`;

  return `
    <div class="review-summary-card ${USER_OPTIONS[userId].reviewClass} ${isCurrentUser ? "review-pill-current" : ""}">
      <span class="label">${escapeHtml(summaryLabel)}</span>
      <span class="rank-chip ${getRankClassName(review.rank)}">${escapeHtml(review.rank || "未評価")}</span>
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

async function handleQuickReviewSubmit(event) {
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

  const nextProperty = normalizeProperty({
    ...property,
    reviews: {
      ...cloneReviews(property.reviews),
      [state.currentUser]: buildReviewRecord(currentReview, newRank, newComment, now),
    },
    updatedAt: now,
  });
  const persistResult = await persistProperties(upsertPropertyInList(state.properties, nextProperty));
  if (!persistResult.ok) {
    elements.quickReviewStatus.textContent = persistResult.message;
    showAppMessage(persistResult.message, "warning");
    return;
  }

  renderAll();
  renderDetailModal(findPropertyById(state.selectedPropertyId));
  showAppMessage(`${getUserLabel(state.currentUser)}のレビューを保存しました。`, "success");
}

function openAddForCurrentView() {
  if (state.ui.activeView === "prep") {
    openPreparationForm();
    return;
  }
  openPropertyForm();
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

function openPreparationForm(itemId = null) {
  state.editingPreparationItemId = itemId;
  resetPreparationForm();

  if (itemId) {
    const item = findPreparationItemById(itemId);
    if (!item) return;
    populatePreparationForm(item);
    elements.prepFormModalTitle.textContent = "項目を編集";
    elements.savePrepItemButton.textContent = "更新する";
  } else {
    elements.prepFormModalTitle.textContent = "項目を追加";
    elements.savePrepItemButton.textContent = "保存する";
  }

  syncPreparationCarryFieldVisibility();
  openModal("prepForm");
}

function resetPropertyForm() {
  elements.propertyForm.reset();
  elements.formStatusMessage.textContent = "";
  elements.importStatusMessage.textContent = "まずは URL を判定し、対応していれば自動読込を試します。";
  elements.importUrlInput.value = "";
  elements.importSourceSite.value = "自動判定";
  elements.propertySourceSite.value = "手入力";
  elements.propertyAddedBy.value = state.currentUser || "keiichi";
  elements.formReviewRank.value = "";
  elements.formReviewComment.value = "";
}

function resetPreparationForm() {
  elements.prepItemForm.reset();
  elements.prepFormStatusMessage.textContent = "";
  elements.prepItemName.value = "";
  elements.prepCategory.value = "buy";
  elements.prepOwnerType.value = "common";
  elements.prepCarryFrom.value = "undecided";
  elements.prepAssignedTo.value = "undecided";
  elements.prepStatus.value = "todo";
  elements.prepQuantity.value = "1";
  elements.prepNote.value = "";
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

function populatePreparationForm(item) {
  elements.prepItemName.value = item.itemName;
  elements.prepCategory.value = item.category;
  elements.prepOwnerType.value = item.ownerType;
  elements.prepCarryFrom.value = item.category === "carry" ? item.carryFrom : "undecided";
  elements.prepAssignedTo.value = item.assignedTo;
  elements.prepStatus.value = item.status;
  elements.prepQuantity.value = String(item.quantity);
  elements.prepNote.value = item.note;
}

function syncPreparationCarryFieldVisibility() {
  const isCarryItem = elements.prepCategory.value === "carry";
  elements.prepCarryFromField.classList.toggle("hidden", !isCarryItem);
  elements.prepCarryFrom.disabled = !isCarryItem;
  if (!isCarryItem) {
    elements.prepCarryFrom.value = "undecided";
    elements.prepFormHint.textContent = "買うものは、担当と進み具合だけ決めれば保存できます。";
    return;
  }

  elements.prepFormHint.textContent = "持っていくものは、誰が持参するかも一緒にメモしておけます。";
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

async function handlePropertyFormSubmit(event) {
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

  const normalizedProperty = normalizeProperty(property);
  const nextProperties = upsertPropertyInList(state.properties, normalizedProperty);
  const persistResult = await persistProperties(nextProperties);
  if (!persistResult.ok) {
    elements.formStatusMessage.textContent = persistResult.message;
    showAppMessage(persistResult.message, "warning");
    return;
  }

  closeModal("form");
  renderAll();
  openPropertyDetail(normalizedProperty.id);
  showAppMessage(existingProperty ? "物件情報を更新しました。" : "新しい物件を追加しました。", "success");
}

function handlePreparationListClick(event) {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const { action, prepId } = actionButton.dataset;
  if (!prepId) return;

  if (action === "edit-prep") {
    openPreparationForm(prepId);
    return;
  }

  if (action === "delete-prep") {
    deletePreparationItemById(prepId);
  }
}

function handlePreparationListChange(event) {
  const actionTarget = event.target.closest("[data-action='change-prep-status']");
  if (!actionTarget) return;

  updatePreparationStatus(actionTarget.dataset.prepId, actionTarget.value);
}

function handlePreparationFormSubmit(event) {
  event.preventDefault();

  if (!elements.prepItemForm.reportValidity()) {
    elements.prepFormStatusMessage.textContent = "入力内容を確認してください。";
    return;
  }

  const existingItem = state.editingPreparationItemId
    ? findPreparationItemById(state.editingPreparationItemId)
    : null;
  const now = new Date().toISOString();
  const normalizedItem = normalizePreparationItem({
    id: existingItem ? existingItem.id : createPreparationItemId(),
    itemName: cleanText(elements.prepItemName.value),
    category: normalizePreparationCategory(elements.prepCategory.value),
    ownerType: normalizePreparationOwnerType(elements.prepOwnerType.value),
    carryFrom: elements.prepCategory.value === "carry"
      ? normalizePreparationAssignee(elements.prepCarryFrom.value)
      : "undecided",
    assignedTo: normalizePreparationAssignee(elements.prepAssignedTo.value),
    status: normalizePreparationStatus(elements.prepStatus.value),
    quantity: normalizePreparationQuantity(elements.prepQuantity.value),
    note: cleanText(elements.prepNote.value),
    createdAt: existingItem ? existingItem.createdAt : now,
    updatedAt: now,
  });

  state.preparationItems = upsertPreparationItemInList(state.preparationItems, normalizedItem);
  savePreparationItemsToStorage(state.preparationItems);
  closeModal("prepForm");
  renderPreparationUi();
  if (state.ui.activeView !== "prep") {
    switchMainView("prep");
  }
  showAppMessage(existingItem ? "準備項目を更新しました。" : "準備項目を追加しました。", "success");
}

function updatePreparationStatus(itemId, nextStatus) {
  const item = findPreparationItemById(itemId);
  if (!item) return;

  const normalizedStatus = normalizePreparationStatus(nextStatus);
  if (item.status === normalizedStatus) return;

  const updatedItem = normalizePreparationItem({
    ...item,
    status: normalizedStatus,
    updatedAt: new Date().toISOString(),
  });

  state.preparationItems = upsertPreparationItemInList(state.preparationItems, updatedItem);
  savePreparationItemsToStorage(state.preparationItems);
  renderPreparationUi();
  showAppMessage(`「${item.itemName}」を ${getPreparationStatusLabel(normalizedStatus)} にしました。`, "success");
}

function deletePreparationItemById(itemId) {
  const item = findPreparationItemById(itemId);
  if (!item) return;

  const confirmed = window.confirm(`「${item.itemName}」を削除しますか？ この操作は取り消せません。`);
  if (!confirmed) return;

  state.preparationItems = deletePreparationItemFromList(state.preparationItems, itemId);
  savePreparationItemsToStorage(state.preparationItems);

  if (state.editingPreparationItemId === itemId) {
    state.editingPreparationItemId = null;
    closeModal("prepForm");
  }

  renderPreparationUi();
  showAppMessage("準備項目を削除しました。", "danger");
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
  const preferredSite = selectedHint !== "自動判定" ? selectedHint : "自動判定";
  const previewSite = detectedSite || (preferredSite !== "自動判定" ? preferredSite : "");

  elements.importStatusMessage.textContent = "URL を判定して、自動読込を試しています...";

  if (previewSite) {
    elements.propertySourceSite.value = normalizeSourceSiteValue(previewSite);
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
  const finalSite = detectedSite || (preferredSite && preferredSite !== "自動判定" ? preferredSite : "手入力");
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
    const response = await fetch("/api/import-property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        url,
        preferredSite: preferredSite !== "自動判定" ? preferredSite : "",
      }),
    });
    const result = await response.json().catch(() => null);

    return {
      fields: { ...fields, ...(result?.fields || {}) },
      message: result?.message || buildImportApiUnavailableMessage(response.status),
      tone: response.ok && result?.success ? "success" : "warning",
    };
  } catch (error) {
    return {
      fields,
      message: buildImportApiUnavailableMessage(),
      tone: "warning",
    };
  }
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

function buildImportApiUnavailableMessage(statusCode) {
  const hostname = window.location.hostname || "";
  const isGithubPages = hostname.includes("github.io");
  const isLocalPreview = hostname === "localhost" || hostname === "127.0.0.1";

  if (isGithubPages || isLocalPreview || statusCode === 404) {
    return "この表示先では URL 自動読込 API が使えません。Vercel の公開URLで開くか、手入力で補完してください。";
  }

  return "URL 自動読込 API に接続できませんでした。URL は保持したので、手入力で補完してください。";
}

function clearImportFields() {
  elements.importUrlInput.value = "";
  elements.importSourceSite.value = "自動判定";
  elements.propertyUrl.value = "";
  elements.importStatusMessage.textContent = "URL 欄をクリアしました。URL なしの手入力でも追加できます。";
}

async function handleSettingsSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.settingsForm);
  const selectedUser = formData.get("currentUser");

  if (!USER_IDS.includes(selectedUser)) {
    showAppMessage("けいいち / ほのか のどちらかを選んでください。", "warning");
    return;
  }

  state.currentUser = selectedUser;
  saveCurrentUserToStorage(selectedUser);

  const requestedWorkspace = normalizeWorkspaceValue(elements.sharedWorkspaceInput.value) || SHARED_SYNC_DEFAULTS.workspace;
  const requestedPassphrase = cleanText(elements.sharedPassphraseInput.value);

  if (!requestedPassphrase) {
    clearSharedSyncSettings();
    setLocalSyncStatus("共有設定を解除しました。現在はこの端末だけに保存します。");
    savePropertiesToStorage(state.properties);
    renderAll();

    const shouldReturnToDetail = state.settingsReturnTarget === "detail" && state.selectedPropertyId;
    closeModal("settings");
    state.settingsReturnTarget = null;

    if (shouldReturnToDetail) {
      openPropertyDetail(state.selectedPropertyId);
    }

    showAppMessage(`${getUserLabel(selectedUser)} として保存しました。共有はオフです。`, "success");
    return;
  }

  elements.settingsSyncStatus.textContent = "共有ワークスペースへ接続しています...";
  saveSharedSyncSettings(requestedWorkspace, requestedPassphrase);
  state.sync.workspace = requestedWorkspace;
  state.sync.passphrase = requestedPassphrase;

  const connected = await connectSharedWorkspace(state.properties);
  if (!connected) {
    elements.settingsSyncStatus.textContent = state.sync.statusMessage;
    renderAll();
    showAppMessage(state.sync.statusMessage, "warning");
    return;
  }

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

  elements.sharedWorkspaceInput.value = state.sync.workspace || SHARED_SYNC_DEFAULTS.workspace;
  elements.sharedPassphraseInput.value = state.sync.passphrase || "";
  elements.settingsSyncStatus.textContent =
    state.sync.mode === "shared"
      ? "同じワークスペース名と合言葉を入れた端末同士で、物件一覧を共有しています。"
      : "共有を使うときは、2台とも同じワークスペース名と合言葉を保存してください。";
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

  switchMainView("map", { scroll: true });
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

async function deletePropertyById(propertyId) {
  const property = findPropertyById(propertyId);
  if (!property) return;

  const confirmed = window.confirm(`「${property.title}」を削除しますか？ この操作は取り消せません。`);
  if (!confirmed) return;

  const persistResult = await persistProperties(deletePropertyFromList(state.properties, propertyId));
  if (!persistResult.ok) {
    showAppMessage(persistResult.message, "warning");
    return;
  }

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
  ["detail", "form", "settings", "prepForm"].forEach((modalName) => {
    if (modalName !== name) {
      closeModal(modalName);
    }
  });

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

  if (name === "prepForm") {
    state.editingPreparationItemId = null;
    elements.prepFormStatusMessage.textContent = "";
  }

  const anyVisibleModal = [elements.detailModal, elements.formModal, elements.settingsModal, elements.prepFormModal].some(
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
  if (name === "prepForm") return elements.prepFormModal;
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

function getVisiblePreparationItems() {
  return state.preparationItems
    .filter(matchesPreparationFilter)
    .sort(comparePreparationItemsByCurrentSort);
}

function matchesPreparationFilter(item) {
  if (state.preparation.filter === "todo") return item.status === "todo";
  if (state.preparation.filter === "doing") return item.status === "doing";
  if (state.preparation.filter === "done") return item.status === "done";
  if (state.preparation.filter === "keiichiRelated") {
    return [item.ownerType, item.assignedTo, item.carryFrom].includes("keiichi");
  }
  if (state.preparation.filter === "honokaRelated") {
    return [item.ownerType, item.assignedTo, item.carryFrom].includes("honoka");
  }
  if (state.preparation.filter === "buyOnly") return item.category === "buy";
  if (state.preparation.filter === "carryOnly") return item.category === "carry";
  return true;
}

function comparePreparationItemsByCurrentSort(itemA, itemB) {
  if (state.preparation.sort === "updatedDesc") {
    return new Date(itemB.updatedAt).getTime() - new Date(itemA.updatedAt).getTime();
  }

  if (state.preparation.sort === "unfinishedFirst") {
    const orderDiff = getPreparationStatusOrder(itemA.status) - getPreparationStatusOrder(itemB.status);
    if (orderDiff !== 0) return orderDiff;
    return new Date(itemB.updatedAt).getTime() - new Date(itemA.updatedAt).getTime();
  }

  if (state.preparation.sort === "completedLast") {
    const isDoneA = itemA.status === "done";
    const isDoneB = itemB.status === "done";
    if (isDoneA !== isDoneB) return isDoneA ? 1 : -1;
    return new Date(itemB.updatedAt).getTime() - new Date(itemA.updatedAt).getTime();
  }

  if (state.preparation.sort === "nameAsc") {
    return itemA.itemName.localeCompare(itemB.itemName, "ja");
  }

  return new Date(itemB.createdAt).getTime() - new Date(itemA.createdAt).getTime();
}

function getPreparationStatusOrder(status) {
  return PREPARATION_STATUS_OPTIONS[status]?.order ?? 99;
}

function loadCurrentUserFromStorage() {
  const savedUser = readStorage(STORAGE_KEYS.currentUser);
  return USER_IDS.includes(savedUser) ? savedUser : null;
}

function saveCurrentUserToStorage(userId) {
  writeStorage(STORAGE_KEYS.currentUser, userId);
}

function loadSharedSyncSettingsFromStorage() {
  const savedWorkspace = normalizeWorkspaceValue(readStorage(STORAGE_KEYS.sharedWorkspace)) || SHARED_SYNC_DEFAULTS.workspace;
  const savedPassphrase = cleanText(readStorage(STORAGE_KEYS.sharedPassphrase));

  state.sync.workspace = savedWorkspace;
  state.sync.passphrase = savedPassphrase;
}

function saveSharedSyncSettings(workspace, passphrase) {
  writeStorage(STORAGE_KEYS.sharedWorkspace, workspace);
  writeStorage(STORAGE_KEYS.sharedPassphrase, passphrase);
}

function clearSharedSyncSettings() {
  state.sync.mode = "local";
  state.sync.workspace = SHARED_SYNC_DEFAULTS.workspace;
  state.sync.passphrase = "";
  state.sync.revision = 0;
  state.sync.lastSyncedAt = "";
  state.sync.statusMessage = "共有設定を保存すると、2台で同じ物件一覧を見られます。";
  clearSharedPolling();
  try {
    window.localStorage.removeItem(STORAGE_KEYS.sharedWorkspace);
    window.localStorage.removeItem(STORAGE_KEYS.sharedPassphrase);
  } catch (error) {
    // localStorage が使えない場合も、そのままローカル運用へ戻す
  }
}

function hasSharedSyncConfig() {
  return Boolean(state.sync.workspace && state.sync.passphrase);
}

async function connectSharedWorkspace(seedProperties, options = {}) {
  const { silent = false } = options;

  if (!hasSharedSyncConfig()) {
    setLocalSyncStatus("共有設定がないため、この端末だけの保存を使っています。");
    return false;
  }

  state.sync.isSyncing = true;
  renderSyncStatus();

  try {
    const result = await callSharedApi("connect", {
      workspace: state.sync.workspace,
      passphrase: state.sync.passphrase,
      seedProperties: seedProperties.map(normalizeProperty),
    });

    applySharedSnapshot(result, result.message);
    startSharedPolling();
    return true;
  } catch (error) {
    clearSharedPolling();
    setLocalSyncStatus(error.message || "共有ワークスペースに接続できませんでした。");
    if (!silent) {
      elements.settingsSyncStatus.textContent = state.sync.statusMessage;
    }
    return false;
  } finally {
    state.sync.isSyncing = false;
    renderSyncStatus();
  }
}

async function refreshSharedProperties(options = {}) {
  const { manual = false } = options;

  if (state.sync.mode !== "shared" || !hasSharedSyncConfig()) {
    if (manual) {
      showAppMessage("共有設定がまだ保存されていないため、同期できません。", "warning");
    }
    return false;
  }

  if (state.sync.isSyncing) {
    return false;
  }

  state.sync.isSyncing = true;
  renderSyncStatus();

  try {
    const result = await callSharedApi("fetch", {
      workspace: state.sync.workspace,
      passphrase: state.sync.passphrase,
    });

    const revisionChanged = Number(result.revision || 0) !== state.sync.revision;
    applySharedSnapshot(result, manual ? result.message : "共有データの最新状態を反映しています。");

    if (manual) {
      renderAll();
      showAppMessage(result.message, "success");
    } else if (revisionChanged && state.openModal !== "form") {
      renderAll();
    }

    return true;
  } catch (error) {
    if (manual) {
      showAppMessage(error.message || "共有データの更新に失敗しました。", "warning");
    }
    state.sync.statusMessage = error.message || "共有データの更新に失敗しました。";
    renderSyncStatus();
    return false;
  } finally {
    state.sync.isSyncing = false;
    renderSyncStatus();
  }
}

async function persistProperties(nextProperties) {
  const normalizedProperties = nextProperties.map(normalizeProperty);

  if (state.sync.mode !== "shared" || !hasSharedSyncConfig()) {
    state.properties = normalizedProperties;
    savePropertiesToStorage(normalizedProperties);
    return { ok: true };
  }

  state.sync.isSyncing = true;
  renderSyncStatus();

  try {
    const result = await callSharedApi("saveSnapshot", {
      workspace: state.sync.workspace,
      passphrase: state.sync.passphrase,
      properties: normalizedProperties,
      clientRevision: state.sync.revision,
    });

    applySharedSnapshot(result, result.message);
    return { ok: true };
  } catch (error) {
    if (error.snapshot) {
      applySharedSnapshot(error.snapshot, error.message);
      renderAll();
    }

    return {
      ok: false,
      message: error.message || "共有保存に失敗しました。時間をおいてもう一度試してください。",
    };
  } finally {
    state.sync.isSyncing = false;
    renderSyncStatus();
  }
}

async function callSharedApi(action, payload) {
  const response = await fetch("/api/shared-properties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      action,
      ...payload,
    }),
  });

  const result = await response.json().catch(() => null);
  if (response.ok && result?.success) {
    return result;
  }

  const error = new Error(
    result?.message || buildSharedApiUnavailableMessage(response.status)
  );
  error.reason = result?.reason || "shared-api-error";

  if (result?.properties) {
    error.snapshot = result;
  }

  throw error;
}

function applySharedSnapshot(snapshot, statusMessage) {
  state.properties = (snapshot.properties || []).map(normalizeProperty);
  state.sync.mode = "shared";
  state.sync.revision = Number(snapshot.revision || 0);
  state.sync.lastSyncedAt = cleanText(snapshot.updatedAt);
  state.sync.statusMessage = statusMessage || "共有ワークスペースと同期しています。";
  savePropertiesToStorage(state.properties);
}

function setLocalSyncStatus(message) {
  state.sync.mode = "local";
  state.sync.revision = 0;
  state.sync.lastSyncedAt = "";
  state.sync.statusMessage = message;
  clearSharedPolling();
}

function startSharedPolling() {
  clearSharedPolling();
  state.sync.pollTimer = window.setInterval(() => {
    if (state.sync.mode !== "shared" || state.openModal === "form") {
      return;
    }
    refreshSharedProperties({ manual: false });
  }, SHARED_SYNC_DEFAULTS.pollIntervalMs);
}

function clearSharedPolling() {
  if (state.sync.pollTimer) {
    window.clearInterval(state.sync.pollTimer);
    state.sync.pollTimer = null;
  }
}

function upsertPropertyInList(list, property) {
  const normalizedProperty = normalizeProperty(property);
  const existingIndex = list.findIndex((item) => item.id === normalizedProperty.id);
  const nextList = list.map((item) => normalizeProperty(item));

  if (existingIndex >= 0) {
    nextList.splice(existingIndex, 1, normalizedProperty);
    return nextList;
  }

  return [normalizedProperty, ...nextList];
}

function deletePropertyFromList(list, propertyId) {
  return list
    .filter((item) => item.id !== propertyId)
    .map((item) => normalizeProperty(item));
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

function savePropertiesToStorage(properties = state.properties) {
  writeStorage(STORAGE_KEYS.properties, JSON.stringify(properties));
}

function loadPreparationItemsFromStorage() {
  const storedValue = readStorage(STORAGE_KEYS.preparationItems);

  if (storedValue === null) {
    const sampleItems = cloneSamplePreparationItems();
    writeStorage(STORAGE_KEYS.preparationItems, JSON.stringify(sampleItems));
    return sampleItems.map(normalizePreparationItem);
  }

  try {
    const parsed = JSON.parse(storedValue);
    if (!Array.isArray(parsed)) throw new Error("Array expected");
    return parsed.map(normalizePreparationItem);
  } catch (error) {
    const fallbackItems = cloneSamplePreparationItems();
    writeStorage(STORAGE_KEYS.preparationItems, JSON.stringify(fallbackItems));
    showAppMessage("準備リストの読み込みに失敗したため、サンプルデータを再投入しました。", "warning");
    return fallbackItems.map(normalizePreparationItem);
  }
}

function savePreparationItemsToStorage(items = state.preparationItems) {
  writeStorage(STORAGE_KEYS.preparationItems, JSON.stringify(items));
}

function upsertPreparationItemInList(list, item) {
  const normalizedItem = normalizePreparationItem(item);
  const nextList = list.map((currentItem) => normalizePreparationItem(currentItem));
  const existingIndex = nextList.findIndex((currentItem) => currentItem.id === normalizedItem.id);

  if (existingIndex >= 0) {
    nextList.splice(existingIndex, 1, normalizedItem);
    return nextList;
  }

  return [normalizedItem, ...nextList];
}

function deletePreparationItemFromList(list, itemId) {
  return list
    .filter((item) => item.id !== itemId)
    .map((item) => normalizePreparationItem(item));
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

function normalizeWorkspaceValue(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function buildSharedApiUnavailableMessage(statusCode) {
  const hostname = window.location.hostname || "";
  const isGithubPages = hostname.includes("github.io");
  const isLocalPreview = hostname === "localhost" || hostname === "127.0.0.1";

  if (isGithubPages || isLocalPreview || statusCode === 404) {
    return "この表示先では共有APIが使えません。Vercel の公開URLで開いているか確認してください。";
  }

  return "共有データAPIに接続できませんでした。時間をおいてもう一度試してください。";
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

function cloneSamplePreparationItems() {
  return JSON.parse(JSON.stringify(SAMPLE_PREPARATION_ITEMS));
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

function normalizePreparationCategory(category) {
  return PREPARATION_CATEGORY_OPTIONS[category] ? category : "buy";
}

function normalizePreparationStatus(status) {
  return PREPARATION_STATUS_OPTIONS[status] ? status : "todo";
}

function normalizePreparationOwnerType(ownerType) {
  return PREPARATION_OWNER_OPTIONS[ownerType] ? ownerType : "common";
}

function normalizePreparationAssignee(userId) {
  return PREPARATION_ASSIGNEE_OPTIONS[userId] ? userId : "undecided";
}

function normalizePreparationQuantity(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.max(1, Math.round(parsed));
}

function normalizePreparationItem(item) {
  const category = normalizePreparationCategory(item.category);
  return {
    id: cleanText(item.id) || createPreparationItemId(),
    itemName: cleanText(item.itemName),
    category,
    ownerType: normalizePreparationOwnerType(item.ownerType),
    carryFrom: category === "carry" ? normalizePreparationAssignee(item.carryFrom) : "undecided",
    assignedTo: normalizePreparationAssignee(item.assignedTo),
    status: normalizePreparationStatus(item.status),
    quantity: normalizePreparationQuantity(item.quantity),
    note: cleanText(item.note),
    createdAt: cleanText(item.createdAt) || new Date().toISOString(),
    updatedAt: cleanText(item.updatedAt) || cleanText(item.createdAt) || new Date().toISOString(),
  };
}

function toNullableNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function findPropertyById(propertyId) {
  return state.properties.find((property) => property.id === propertyId) || null;
}

function findPreparationItemById(itemId) {
  return state.preparationItems.find((item) => item.id === itemId) || null;
}

function createPropertyId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `property-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createPreparationItemId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `prep-${window.crypto.randomUUID()}`;
  }
  return `prep-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getUserLabel(userId) {
  return USER_OPTIONS[userId]?.label || "未設定";
}

function getPreparationOwnerLabel(ownerType) {
  if (ownerType === "common") return "共通で使うもの";
  return `${PREPARATION_OWNER_OPTIONS[ownerType] || "未定"}のもの`;
}

function getPreparationCarryLabel(carryFrom) {
  if (carryFrom === "keiichi" || carryFrom === "honoka") {
    return `${PREPARATION_OWNER_OPTIONS[carryFrom]}が持参`;
  }
  return "持参者は未定";
}

function getPreparationAssignedLabel(assignedTo) {
  return PREPARATION_ASSIGNEE_OPTIONS[assignedTo] || "未定";
}

function getPreparationStatusLabel(status) {
  return PREPARATION_STATUS_OPTIONS[status]?.label || "未対応";
}

function getPreparationFilterLabel(filterName) {
  const labels = {
    all: "すべて",
    todo: "未対応",
    doing: "対応中",
    done: "完了",
    keiichiRelated: "けいいち関連",
    honokaRelated: "ほのか関連",
    buyOnly: "買うものだけ",
    carryOnly: "持っていくものだけ",
  };
  return labels[filterName] || "すべて";
}

function getPreparationSortLabel(sortName) {
  const labels = {
    createdDesc: "新しい順",
    updatedDesc: "更新が新しい順",
    unfinishedFirst: "未対応を上にする",
    completedLast: "完了を下にする",
    nameAsc: "名前順",
  };
  return labels[sortName] || "新しい順";
}

function formatPreparationQuantity(value) {
  return `${normalizePreparationQuantity(value)}個`;
}

function formatCurrency(value) {
  if (!hasMeaningfulValue(value)) return "未入力";
  return `¥${new Intl.NumberFormat("ja-JP").format(Number(value))}`;
}

function formatArea(value) {
  if (!hasMeaningfulValue(value)) return "未入力";
  return `${new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 2 }).format(Number(value))}m²`;
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
