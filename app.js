const storageKey = "aabudgeting-app-v2";
const sessionKey = "aabudgeting-session-v1";
const adminEmail = "sreedharanys@gmail.com";
const defaultFontSize = 16;
const fontStacks = {
  inter: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  system: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"Cascadia Mono", "SFMono-Regular", Consolas, monospace',
};
const paymentMethods = ["Cash", "UPI", "Bank Transfer", "Credit Card", "Gift Card"];
const countryNames = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada",
  "China", "Denmark", "Egypt", "France", "Germany", "Greece", "India", "Indonesia", "Ireland", "Italy", "Japan",
  "Malaysia", "Mexico", "Nepal", "Netherlands", "New Zealand", "Norway", "Portugal", "Singapore", "South Africa",
  "Spain", "Sri Lanka", "Switzerland", "Thailand", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];
const currencyCodes = [
  "AED", "AFN", "ALL", "ARS", "AUD", "BDT", "BRL", "CAD", "CHF", "CNY", "DKK", "EUR", "GBP", "HKD", "IDR", "INR",
  "JPY", "LKR", "MYR", "NPR", "NZD", "PHP", "QAR", "SAR", "SGD", "THB", "USD", "VND", "ZAR"
];
const builtinCategories = [
  ["Transportation", "TR", "#f87500"], ["Restaurants", "FD", "#13b59c"], ["Accommodation", "HT", "#e14b42"],
  ["Groceries", "GR", "#08a8e8"], ["Shopping", "SH", "#17ad71"], ["Activities", "AC", "#e91d72"],
  ["Drinks", "DR", "#7b41d9"], ["Coffee", "CF", "#94624a"], ["Flights", "FL", "#4095ff"],
  ["General", "GN", "#ffb21a"], ["Fees & Charges", "FX", "#a326ba"], ["Sightseeing", "SG", "#8ecb53"],
  ["Entertainment", "EN", "#ff5b29"], ["Laundry", "LD", "#00a6a9"], ["Exchange Fees", "EX", "#586ad9"]
];
const iconPalette = ["TR", "FD", "HT", "GR", "SH", "AC", "DR", "CF", "FL", "GN", "FX", "SG", "EN", "LD", "EX", "PK", "TX", "MD", "HL", "WK", "EV", "PT", "BK", "CL"];
const palette = ["#f87500", "#13b59c", "#e91d5b", "#4095ff", "#17ad71", "#a326ba", "#ffb21a", "#08a8e8", "#e14b42", "#7b41d9", "#586ad9", "#8ecb53"];
const themedIconPaths = {
  budget: "media/icons/png/budget/budget_1.png",
  money: "media/icons/png/money/money_1.png",
  saving: "media/icons/png/saving/saving_1.png",
  shopping: "media/icons/png/shopping/shopping_1.png",
  spending: "media/icons/png/spending/spending_1.png",
  wallet: "media/icons/png/wallet/wallet_1.png",
};
const categoryIconRepository = [
  { id: "budget-plan", label: "Budget", path: "media/icons/png/budget/budget_1.png" },
  { id: "budget-list", label: "Plan", path: "media/icons/png/budget/budget_10.png" },
  { id: "money-cash", label: "Money", path: "media/icons/png/money/money_1.png" },
  { id: "money-coins", label: "Coins", path: "media/icons/png/money/money_10.png" },
  { id: "money-fee", label: "Fees", path: "media/icons/png/money/money_11.png" },
  { id: "saving-piggy", label: "Saving", path: "media/icons/png/saving/saving_1.png" },
  { id: "saving-goal", label: "Goal", path: "media/icons/png/saving/saving_10.png" },
  { id: "shopping-bag", label: "Shopping", path: "media/icons/png/shopping/shopping_1.png" },
  { id: "shopping-cart", label: "Groceries", path: "media/icons/png/shopping/shopping_10.png" },
  { id: "shopping-home", label: "Home", path: "media/icons/png/shopping/shopping_12.png" },
  { id: "spending-card", label: "Spending", path: "media/icons/png/spending/spending_1.png" },
  { id: "spending-food", label: "Food", path: "media/icons/png/spending/spending_10.png" },
  { id: "spending-fun", label: "Fun", path: "media/icons/png/spending/spending_11.png" },
  { id: "spending-cafe", label: "Cafe", path: "media/icons/png/spending/spending_12.png" },
  { id: "wallet-main", label: "Wallet", path: "media/icons/png/wallet/wallet_1.png" },
  { id: "wallet-travel", label: "Travel", path: "media/icons/png/wallet/wallet_10.png" },
  { id: "wallet-stay", label: "Stay", path: "media/icons/png/wallet/wallet_12.png" },
  { id: "wallet-flight", label: "Flight", path: "media/icons/png/wallet/wallet_13.png" },
];
const defaultCategoryIconMap = {
  Transportation: "media/icons/png/wallet/wallet_10.png",
  Restaurants: "media/icons/png/spending/spending_10.png",
  Accommodation: "media/icons/png/wallet/wallet_12.png",
  Groceries: "media/icons/png/shopping/shopping_10.png",
  Shopping: "media/icons/png/shopping/shopping_1.png",
  Activities: "media/icons/png/spending/spending_11.png",
  Drinks: "media/icons/png/spending/spending_12.png",
  Coffee: "media/icons/png/spending/spending_13.png",
  Flights: "media/icons/png/wallet/wallet_13.png",
  General: "media/icons/png/budget/budget_1.png",
  "Fees & Charges": "media/icons/png/money/money_11.png",
  Sightseeing: "media/icons/png/spending/spending_14.png",
  Entertainment: "media/icons/png/spending/spending_11.png",
  Laundry: "media/icons/png/shopping/shopping_12.png",
  "Exchange Fees": "media/icons/png/money/money_10.png",
};
const exchangeRateTtlMs = 12 * 60 * 60 * 1000;
let categoryMap = {};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const screens = $$(".screen");

const els = {
  actionMenu: $("#actionMenu"),
  tripNameInput: $("#tripNameInput"),
  tripPhotoInput: $("#tripPhotoInput"),
  tripPhotoPreview: $("#tripPhotoPreview"),
  tripPhotoLabel: $("#tripPhotoLabel"),
  startDateInput: $("#startDateInput"),
  endDateInput: $("#endDateInput"),
  dailyBudgetInput: $("#dailyBudgetInput"),
  currencySearch: $("#currencySearch"),
  currencyList: $("#currencyList"),
  categorySearch: $("#categorySearch"),
  categoryGrid: $("#categoryGrid"),
  amountInput: $("#amountInput"),
  noteInput: $("#noteInput"),
  dateInput: $("#dateInput"),
  paymentInput: $("#paymentInput"),
  countryInput: $("#countryInput"),
  countryOptions: $("#countryOptions"),
  locationInput: $("#locationInput"),
  locationStatus: $("#locationStatus"),
  useLocationButton: $("#useLocationButton"),
  userInput: $("#userInput"),
  userOptions: $("#userOptions"),
  splitButton: $("#splitButton"),
  splitSummary: $("#splitSummary"),
  invoiceInput: $("#invoiceInput"),
  invoiceLabel: $("#invoiceLabel"),
  invoiceGallery: $("#invoiceGallery"),
  excludeMetricsInput: $("#excludeMetricsInput"),
  refundInput: $("#refundInput"),
  editorCategoryIcon: $("#editorCategoryIcon"),
  editorCurrencyButton: $("#editorCurrencyButton"),
  expenseCurrencyInput: $("#expenseCurrencyInput"),
  filterCategory: $("#filterCategory"),
  filterCategoryOptions: $("#filterCategoryOptions"),
  filterCategorySummary: $("#filterCategorySummary"),
  filterCategoryDropdown: $("#filterCategoryDropdown"),
  filterUser: $("#filterUser"),
  filterFromDate: $("#filterFromDate"),
  filterToDate: $("#filterToDate"),
  filterLocation: $("#filterLocation"),
  filterPayment: $("#filterPayment"),
  chartMode: $("#chartMode"),
  chartType: $("#chartType"),
  authEmailInput: $("#authEmailInput"),
  authPasswordInput: $("#authPasswordInput"),
  authLoginButton: $("#authLoginButton"),
  authCreateButton: $("#authCreateButton"),
  authStatus: $("#authStatus"),
  ownerAvatar: $("#ownerAvatar"),
  ownerPhotoInput: $("#ownerPhotoInput"),
  ownerPhotoLabel: $("#ownerPhotoLabel"),
  ownerNameInput: $("#ownerNameInput"),
  ownerEmailInput: $("#ownerEmailInput"),
  ownerPasswordInput: $("#ownerPasswordInput"),
  fontFamilyInput: $("#fontFamilyInput"),
  fontSizeInput: $("#fontSizeInput"),
  fontSizeLabel: $("#fontSizeLabel"),
  wallpaperInput: $("#wallpaperInput"),
  wallpaperLabel: $("#wallpaperLabel"),
  wallpaperLibrary: $("#wallpaperLibrary"),
  wallpaperNameInput: $("#wallpaperNameInput"),
  expenseUserList: $("#expenseUserList"),
  autoLocationInput: $("#autoLocationInput"),
  backupStatus: $("#backupStatus"),
  displayCurrencySelect: $("#displayCurrencySelect"),
  categoryOrderButton: $("#categoryOrderButton"),
  categoryManageButton: $("#categoryManageButton"),
  categoryOrderPanel: $("#categoryOrderPanel"),
  categoryManagePanel: $("#categoryManagePanel"),
  changePasswordOld: $("#changePasswordOld"),
  changePasswordNew: $("#changePasswordNew"),
  changePasswordButton: $("#changePasswordButton"),
  changePasswordStatus: $("#changePasswordStatus"),
  deleteAccountButton: $("#deleteAccountButton"),
  adminLocationStatus: $("#adminLocationStatus"),
  adminSavedLocations: $("#adminSavedLocations"),
  adminSystemSummary: $("#adminSystemSummary"),
  adminUserList: $("#adminUserList"),
  adminLogList: $("#adminLogList"),
};

const state = normalizeState(loadRawState());
rebuildCategoryMap();
state.screen = "auth";
state.currentUserEmail = loadSession()?.email || "";
state.selectedCategory = { name: "Transportation", icon: defaultCategoryIconMap.Transportation, color: "#f87500" };
state.editingId = null;
state.splitDraft = null;
state.locationDraft = null;
state.openTripMenuId = null;
state.tripDraft = null;
state.creatingTrip = false;
state.entryCurrency = null;
state.categoryReorderMode = false;
state.categoryEditor = null;
let backupTimer = null;

document.addEventListener("click", (event) => {
  const menuTrigger = event.target.closest(".menu-trigger");
  const insideMenu = event.target.closest("#actionMenu");
  if (menuTrigger) {
    els.actionMenu.hidden = !els.actionMenu.hidden;
    return;
  }
  if (!els.actionMenu.hidden && !insideMenu) els.actionMenu.hidden = true;

  const tripOpen = event.target.closest("[data-trip-open]");
  if (tripOpen) {
    openTrip(tripOpen.dataset.tripOpen);
    return;
  }

  const tripMenu = event.target.closest("[data-trip-menu]");
  if (tripMenu) {
    state.openTripMenuId = state.openTripMenuId === tripMenu.dataset.tripMenu ? null : tripMenu.dataset.tripMenu;
    renderTrips();
    return;
  }

  const editTrip = event.target.closest("[data-edit-trip]");
  if (editTrip) {
    openTrip(editTrip.dataset.editTrip, "confirm");
    return;
  }

  const deleteTrip = event.target.closest("[data-delete-trip]");
  if (deleteTrip) {
    deleteTripById(deleteTrip.dataset.deleteTrip);
    return;
  }

  const themeOption = event.target.closest("[data-theme-option]");
  if (themeOption) {
    state.settings.theme = themeOption.dataset.themeOption;
    persistRender();
    return;
  }

  const wallpaperOption = event.target.closest("[data-wallpaper-option]");
  if (wallpaperOption) {
    state.settings.wallpaper = wallpaperOption.dataset.wallpaperOption;
    persistRender();
    return;
  }

  const wallpaperSelect = event.target.closest("[data-wallpaper-select]");
  if (wallpaperSelect) {
    selectWallpaper(wallpaperSelect.dataset.wallpaperSelect);
    return;
  }

  const wallpaperDelete = event.target.closest("[data-wallpaper-delete]");
  if (wallpaperDelete) {
    deleteWallpaper(wallpaperDelete.dataset.wallpaperDelete);
    return;
  }

  const splitChoice = event.target.closest("[data-split-choice]");
  if (splitChoice) {
    applySplitChoice(splitChoice.dataset.splitChoice);
    return;
  }

  const splitMode = event.target.closest("[data-split-mode]");
  if (splitMode) {
    ensureSplitDraft();
    state.splitDraft.mode = splitMode.dataset.splitMode;
    renderSplitAdjuster();
    return;
  }

  if (event.target.closest("[data-backup-now]")) {
    backupNow();
    return;
  }

  if (event.target.closest("[data-logout]")) {
    logout();
    return;
  }

  if (event.target.closest("[data-delete-account]")) {
    deleteAccount();
    return;
  }

  const exportFormat = event.target.closest("[data-export-format]");
  if (exportFormat) {
    exportData(exportFormat.dataset.exportFormat);
    return;
  }

  if (event.target.closest("[data-export-csv]")) {
    exportData("csv");
    return;
  }

  if (event.target.closest("[data-admin-location]")) {
    refreshAdminLocation();
    return;
  }

  if (event.target.closest("[data-admin-clear-logs]")) {
    clearAdminLogs();
    return;
  }

  const adminSave = event.target.closest("[data-admin-save-user]");
  if (adminSave) {
    saveAdminUser(adminSave.dataset.adminSaveUser);
    return;
  }

  const adminDelete = event.target.closest("[data-admin-delete-user]");
  if (adminDelete) {
    deleteAdminUser(adminDelete.dataset.adminDeleteUser);
    return;
  }

  const goTarget = event.target.closest("[data-go]");
  if (goTarget) {
    if (goTarget.hasAttribute("data-new-trip")) startNewTrip();
    go(goTarget.dataset.go);
  }
});

$("#finishTripButton").addEventListener("click", finishTrip);
$("#addUserButton").addEventListener("click", addUser);
$("#reviewUsersButton").addEventListener("click", addUser);
$("#saveEntryButton").addEventListener("click", () => saveEntry());
els.authLoginButton.addEventListener("click", () => authenticate("login"));
els.authCreateButton.addEventListener("click", () => authenticate("create"));
els.authPasswordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") authenticate("login");
});
els.ownerPhotoInput.addEventListener("change", saveProfilePhoto);
els.useLocationButton.addEventListener("click", () => tryAutoLocation(false));
els.splitButton.addEventListener("click", () => {
  ensureSplitDraft();
  go("split");
});
els.userInput.addEventListener("change", () => {
  ensureSplitDraft();
  const paidBy = els.userInput.value || owner().email;
  state.splitDraft.paidBy = paidBy;
  if (!state.splitDraft.participants.includes(paidBy)) state.splitDraft.participants.push(paidBy);
  if (["entry", "split", "adjustSplit"].includes(state.screen)) renderExpenseUsers();
  renderSplitSummary();
});
els.tripPhotoInput.addEventListener("change", () => saveTripPhoto());
els.tripNameInput.addEventListener("input", () => {
  activeTrip().name = els.tripNameInput.value.trim() || "Untitled Trip";
  persistRender();
});
els.startDateInput.addEventListener("change", updateTripDates);
els.endDateInput.addEventListener("change", updateTripDates);
els.dailyBudgetInput.addEventListener("input", () => {
  activeTrip().dailyBudget = parseAmount(els.dailyBudgetInput.value);
  persistRender();
});
els.currencySearch.addEventListener("input", renderCurrencies);
els.categorySearch.addEventListener("input", renderCategories);
els.chartMode.addEventListener("change", renderAnalytics);
els.chartType.addEventListener("change", renderAnalytics);
els.fontFamilyInput.addEventListener("change", () => {
  state.settings.fontFamily = els.fontFamilyInput.value;
  persistRender();
});
els.fontSizeInput.addEventListener("input", () => {
  state.settings.fontSize = Number(els.fontSizeInput.value) || defaultFontSize;
  persistRender();
});
els.wallpaperInput.addEventListener("change", saveWallpaper);
els.autoLocationInput.addEventListener("change", () => {
  state.settings.autoLocation = els.autoLocationInput.checked;
  persistRender();
});
els.invoiceInput.addEventListener("change", renderInvoiceSelection);
els.displayCurrencySelect?.addEventListener("change", async () => {
  state.settings.displayCurrency = els.displayCurrencySelect.value || "";
  if (state.settings.displayCurrency) await ensureExchangeRates();
  saveState();
  renderAll();
});
els.expenseCurrencyInput?.addEventListener("change", async () => {
  state.entryCurrency = normalizeCurrency({ code: els.expenseCurrencyInput.value || activeTrip().currency.code });
  await ensureExchangeRates();
  renderSplitTotal();
});
els.categoryOrderButton?.addEventListener("click", toggleCategoryReorder);
els.categoryManageButton?.addEventListener("click", openCategoryEditor);
els.changePasswordButton?.addEventListener("click", changePassword);
els.deleteAccountButton?.addEventListener("click", deleteAccount);
$$("[data-theme-option]").forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.theme = button.dataset.themeOption;
    persistRender();
  });
});
$$("[data-wallpaper-option]").forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.wallpaper = button.dataset.wallpaperOption;
    persistRender();
  });
});
["change", "input"].forEach((eventName) => {
  [els.filterCategory, els.filterUser, els.filterFromDate, els.filterToDate, els.filterLocation, els.filterPayment].forEach((el) => el.addEventListener(eventName, renderSearch));
});
els.filterCategoryOptions?.addEventListener("change", (event) => {
  const input = event.target.closest("[data-filter-category]");
  if (!input) return;
  const selected = new Set(selectedFilterCategories());
  if (input.checked) selected.add(input.value);
  else selected.delete(input.value);
  Array.from(els.filterCategory.options).forEach((option) => {
    option.selected = selected.has(option.value);
  });
  renderCategoryFilterOptions();
  renderSearch();
});

function activeTrip() {
  if (state.tripDraft) return state.tripDraft;
  if (!state.trips.length) {
    const trip = sampleTrip(owner().email);
    trip.entries = [];
    state.trips.push(trip);
    state.activeTripId = trip.id;
  }
  return state.trips.find((trip) => trip.id === state.activeTripId) || state.trips[0];
}

function owner() {
  return findUser(state.currentUserEmail) || state.users[0] || defaultUser();
}

function go(screenName) {
  els.actionMenu.hidden = true;
  state.openTripMenuId = null;
  if (screenName !== "auth" && !state.currentUserEmail) screenName = "auth";
  if (screenName === "admin" && !isAdmin()) {
    alert("Admin Center is only available for sreedharanys@gmail.com.");
    screenName = state.currentUserEmail ? "account" : "auth";
  }

  const entryFlow = ["entry", "split", "adjustSplit"];
  if (entryFlow.includes(state.screen) && !entryFlow.includes(screenName) && screenName !== "category") {
    state.editingId = null;
    state.splitDraft = null;
    state.locationDraft = null;
    state.entryCurrency = null;
  }

  if (state.creatingTrip && state.tripDraft && screenName === "trips") {
    cancelDraftTrip();
  }

  if (screenName === "entry" && !state.editingId && !state.splitDraft) prepareNewEntry();
  if (screenName === "confirm") syncTripInputs();
  if (screenName === "stats") renderAnalytics();
  if (screenName === "search") renderSearch();
  if (screenName === "account") renderAccount();
  if (screenName === "admin") renderAdmin();
  if (screenName === "category") renderCategories();
  if (screenName === "entries") renderDisplayCurrencyOptions();
  if (screenName === "split") renderSplitChoices();
  if (screenName === "adjustSplit") renderSplitAdjuster();

  state.screen = screenName;
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === screenName);
    if (screen.dataset.screen === screenName) screen.scrollTop = 0;
  });
}

function openTrip(id, target = "entries") {
  if (!state.trips.some((trip) => trip.id === id)) return;
  state.tripDraft = null;
  state.creatingTrip = false;
  state.activeTripId = id;
  state.openTripMenuId = null;
  state.editingId = null;
  state.splitDraft = null;
  saveState();
  renderAll();
  go(target);
}

function cancelDraftTrip() {
  state.tripDraft = null;
  state.creatingTrip = false;
}

function startNewTrip() {
  state.tripDraft = sampleTrip(owner().email);
  state.tripDraft.currency = normalizeCurrency(state.settings.homeCurrency);
  state.tripDraft.name = "";
  state.tripDraft.entries = [];
  state.creatingTrip = true;
  syncSetupFields();
}

function deleteTripById(id) {
  const trip = state.trips.find((item) => item.id === id);
  if (!trip) return;
  if (!confirm(`Delete ${trip.name || "this trip"} and its expenses?`)) return;
  state.trips = state.trips.filter((item) => item.id !== id);
  if (!state.trips.length) state.trips.push(sampleTrip(owner().email));
  state.activeTripId = state.trips[0].id;
  state.openTripMenuId = null;
  persistRender();
  go("trips");
}

function finishTrip() {
  const trip = activeTrip();
  trip.name = els.tripNameInput.value.trim() || "Untitled Trip";
  updateTripDates();
  if (state.tripDraft) {
    state.trips.unshift(state.tripDraft);
    state.activeTripId = state.tripDraft.id;
    state.tripDraft = null;
    state.creatingTrip = false;
  }
  persistRender();
  go("entries");
}

function syncSetupFields() {
  const trip = activeTrip();
  els.tripNameInput.value = trip.name;
  els.startDateInput.value = trip.startDate;
  els.endDateInput.value = trip.endDate;
  els.dailyBudgetInput.value = Number(trip.dailyBudget || 0).toFixed(2);
  renderTripPhoto();
}

function syncTripInputs() {
  const trip = activeTrip();
  trip.name = els.tripNameInput.value.trim() || trip.name || "Untitled Trip";
  updateTripDates();
  saveState();
}

function updateTripDates() {
  const trip = activeTrip();
  trip.startDate = els.startDateInput.value || trip.startDate;
  trip.endDate = els.endDateInput.value || trip.startDate;
  if (trip.endDate < trip.startDate) trip.endDate = trip.startDate;
  els.endDateInput.value = trip.endDate;
  persistRender();
}

async function saveTripPhoto() {
  const media = await storeMediaFiles(els.tripPhotoInput.files, "photos");
  if (media[0]) {
    activeTrip().photo = media[0];
    persistRender();
  }
  els.tripPhotoInput.value = "";
}

function prepareNewEntry() {
  const userName = owner().email;
  state.editingId = null;
  state.splitDraft = makeSplit("equal", userName, participantKeys());
  state.locationDraft = null;
  state.entryCurrency = normalizeCurrency(activeTrip().currency || state.settings.homeCurrency);
  state.selectedCategory = state.selectedCategory || { name: "Transportation", icon: defaultCategoryIconMap.Transportation, color: "#f87500" };
  els.amountInput.value = "";
  els.noteInput.value = "";
  els.dateInput.value = today();
  els.paymentInput.value = "Credit Card";
  els.countryInput.value = "India";
  els.locationInput.value = "";
  els.locationStatus.textContent = "Location will be saved with this expense when allowed.";
  els.userInput.value = userName;
  els.invoiceInput.value = "";
  els.invoiceLabel.textContent = "No invoice uploaded";
  els.invoiceGallery.innerHTML = "";
  els.excludeMetricsInput.checked = false;
  els.refundInput.checked = false;
  renderEditorCategory();
  renderExpenseCurrencyOptions();
  renderExpenseUsers();
  renderSplitSummary();
  if (state.settings.autoLocation) setTimeout(() => tryAutoLocation(true), 80);
}

function editEntry(id) {
  const entry = activeTrip().entries.find((item) => item.id === id);
  if (!entry) {
    state.editingId = null;
    state.splitDraft = null;
    state.locationDraft = null;
    alert("This expense could not be opened. Try refreshing the trip list.");
    return;
  }
  state.editingId = id;
  state.selectedCategory = { name: entry.category, icon: entry.icon, color: entry.color };
  state.splitDraft = normalizeSplit(entry.split, entry.user);
  state.locationDraft = entry.latitude && entry.longitude ? { latitude: entry.latitude, longitude: entry.longitude } : null;
  state.entryCurrency = normalizeCurrency(entry.currency || { code: entry.currencyCode || activeTrip().currency.code });
  els.amountInput.value = String(entry.amount);
  els.noteInput.value = entry.name;
  els.dateInput.value = entry.date;
  els.paymentInput.value = entry.payment;
  els.countryInput.value = entry.country;
  els.locationInput.value = entry.location;
  els.locationStatus.textContent = state.locationDraft ? `GPS saved: ${entry.latitude}, ${entry.longitude}` : "No GPS coordinates saved.";
  els.userInput.value = entry.user;
  els.invoiceInput.value = "";
  els.invoiceLabel.textContent = entry.invoices?.length ? "Invoice attached" : "No invoice uploaded";
  renderInvoiceGallery(entry.invoices || []);
  els.excludeMetricsInput.checked = entry.excludeMetrics;
  els.refundInput.checked = entry.refund;
  renderEditorCategory();
  renderExpenseCurrencyOptions();
  renderExpenseUsers();
  renderSplitSummary();
  go("entry");
}

async function saveEntry() {
  const amount = parseAmount(els.amountInput.value);
  if (!amount) {
    els.amountInput.focus();
    return;
  }

  const trip = activeTrip();
  const entries = trip.entries;
  const previous = entries.find((item) => item.id === state.editingId);
  const uploadedInvoices = await storeMediaFiles(els.invoiceInput.files, "invoices");
  const invoices = uploadedInvoices.length ? uploadedInvoices : previous?.invoices || [];
  const userName = els.userInput.value || owner().email;
  const expenseCurrency = currentExpenseCurrency(previous);
  const split = normalizeSplit(state.splitDraft, userName);
  split.paidBy = userName;
  split.participants = split.participants?.length ? split.participants : [userName];
  await ensureExchangeRates();

  const entry = {
    id: state.editingId || crypto.randomUUID(),
    name: els.noteInput.value.trim() || state.selectedCategory.name,
    category: state.selectedCategory.name,
    payment: els.paymentInput.value,
    country: els.countryInput.value.trim() || "India",
    location: els.locationInput.value.trim() || "Unknown place",
    latitude: state.locationDraft?.latitude || previous?.latitude || null,
    longitude: state.locationDraft?.longitude || previous?.longitude || null,
    date: els.dateInput.value || today(),
    user: userName,
    userEmail: userName,
    split,
    amount,
    currency: expenseCurrency,
    currencyCode: expenseCurrency.code,
    invoices,
    invoiceNames: invoices.map((file) => file.name),
    excludeMetrics: els.excludeMetricsInput.checked,
    refund: els.refundInput.checked,
    icon: state.selectedCategory.icon,
    color: state.selectedCategory.color,
  };

  const existingIndex = entries.findIndex((item) => item.id === entry.id);
  if (existingIndex >= 0) entries[existingIndex] = entry;
  else entries.unshift(entry);
  addSystemLog(existingIndex >= 0 ? "Expense updated" : "Expense created", `${entry.name} · ${formatCurrencyAmount(entry.amount, expenseCurrency)} · ${trip.name}`, "user");

  state.editingId = null;
  state.splitDraft = null;
  state.locationDraft = null;
  state.entryCurrency = null;
  persistRender();
  go("entries");
}

function renderCategories() {
  const search = els.categorySearch.value.toLowerCase();
  els.categoryGrid.innerHTML = "";
  getCategoryCatalog()
    .filter(([name]) => name.toLowerCase().includes(search))
    .forEach(([name, icon, color]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.draggable = state.categoryReorderMode;
      button.dataset.categoryName = name;
      button.className = state.categoryReorderMode ? "category-tile reorder-mode" : "category-tile";
      button.innerHTML = `
        <span class="category-image" style="--category-color:${color}">
          <img src="${escapeHtml(categoryImageFor(name, icon))}" alt="" />
        </span>
        <strong>${escapeHtml(name)}</strong>
        ${state.categoryReorderMode ? "<small>Drag</small>" : ""}
      `;
      if (!state.categoryReorderMode) {
        button.addEventListener("click", () => {
          state.selectedCategory = { name, icon, color };
          renderEditorCategory();
          if (!state.editingId) prepareNewEntry();
          go("entry");
        });
      }
      els.categoryGrid.append(button);
    });
  if (state.categoryReorderMode) bindCategoryDragReorder();
}

function toggleCategoryReorder() {
  state.categoryReorderMode = !state.categoryReorderMode;
  els.categoryOrderPanel.hidden = true;
  els.categoryManagePanel.hidden = true;
  if (!state.categoryReorderMode) persistRender();
  els.categoryOrderButton.textContent = state.categoryReorderMode ? "Done Dragging" : "Change Order";
  renderCategories();
}

function renderCategoryOrderPanel() {
  const names = getCategoryOrder();
  els.categoryOrderPanel.innerHTML = `
    <p class="panel-hint">Drag categories or use arrows to reorder.</p>
    <div class="category-order-list">
      ${names.map((name, index) => {
        const meta = categoryMap[name] || { icon: "GN", color: palette[0] };
        return `<div class="category-order-row" draggable="true" data-category-name="${escapeHtml(name)}">
          <span class="category-image" style="--category-color:${meta.color}"><img src="${escapeHtml(categoryImageFor(name, meta.icon))}" alt="" /></span>
          <strong>${escapeHtml(name)}</strong>
          <span class="order-actions">
            <button type="button" data-move-category="${escapeHtml(name)}" data-direction="up" ${index === 0 ? "disabled" : ""}>↑</button>
            <button type="button" data-move-category="${escapeHtml(name)}" data-direction="down" ${index === names.length - 1 ? "disabled" : ""}>↓</button>
          </span>
        </div>`;
      }).join("")}
    </div>
    <button type="button" class="secondary-button" id="finishCategoryOrder">Done reordering</button>
  `;
  els.categoryOrderPanel.querySelector("#finishCategoryOrder")?.addEventListener("click", toggleCategoryReorder);
  els.categoryOrderPanel.querySelectorAll("[data-move-category]").forEach((button) => {
    button.addEventListener("click", () => moveCategory(button.dataset.moveCategory, button.dataset.direction));
  });
  bindCategoryOrderDrag();
}

function bindCategoryOrderDrag() {
  const list = els.categoryOrderPanel.querySelector(".category-order-list");
  if (!list) return;
  let dragged = null;
  list.querySelectorAll(".category-order-row").forEach((row) => {
    row.addEventListener("dragstart", () => { dragged = row.dataset.categoryName; row.classList.add("dragging"); });
    row.addEventListener("dragend", () => row.classList.remove("dragging"));
    row.addEventListener("dragover", (event) => event.preventDefault());
    row.addEventListener("drop", (event) => {
      event.preventDefault();
      const target = row.dataset.categoryName;
      if (!dragged || dragged === target) return;
      reorderCategoryNames(dragged, target);
      renderCategoryOrderPanel();
      renderCategories();
      persistRender();
    });
  });
}

function bindCategoryManagerDrag() {
  const list = els.categoryManagePanel.querySelector(".category-manager-list");
  if (!list) return;
  let dragged = null;
  list.querySelectorAll(".category-manager-row").forEach((row) => {
    row.addEventListener("dragstart", () => {
      dragged = row.dataset.categoryName;
      row.classList.add("dragging");
    });
    row.addEventListener("dragend", () => row.classList.remove("dragging"));
    row.addEventListener("dragover", (event) => event.preventDefault());
    row.addEventListener("drop", (event) => {
      event.preventDefault();
      const target = row.dataset.categoryName;
      if (!dragged || dragged === target) return;
      reorderCategoryNames(dragged, target);
      persistRender();
      openCategoryEditor(state.categoryEditor?.originalName || null);
    });
  });
}

function bindCategoryDragReorder() {
  let dragged = null;
  els.categoryGrid.querySelectorAll("button[data-category-name]").forEach((button) => {
    button.addEventListener("dragstart", () => { dragged = button.dataset.categoryName; button.classList.add("dragging"); });
    button.addEventListener("dragend", () => button.classList.remove("dragging"));
    button.addEventListener("dragover", (event) => event.preventDefault());
    button.addEventListener("drop", (event) => {
      event.preventDefault();
      const target = button.dataset.categoryName;
      if (!dragged || dragged === target) return;
      reorderCategoryNames(dragged, target);
      renderCategories();
      persistRender();
    });
  });
}

function moveCategory(name, direction) {
  const order = getCategoryOrder();
  const index = order.indexOf(name);
  if (index < 0) return;
  const next = direction === "up" ? index - 1 : index + 1;
  if (next < 0 || next >= order.length) return;
  order.splice(index, 1);
  order.splice(next, 0, name);
  state.settings.categoryOrder = order;
  renderCategoryOrderPanel();
  renderCategories();
  persistRender();
}

function reorderCategoryNames(fromName, toName) {
  const order = getCategoryOrder();
  const from = order.indexOf(fromName);
  const to = order.indexOf(toName);
  if (from < 0 || to < 0) return;
  order.splice(from, 1);
  order.splice(to, 0, fromName);
  state.settings.categoryOrder = order;
}

function openCategoryEditor(existingName = null) {
  state.categoryReorderMode = false;
  els.categoryOrderButton.textContent = "Change Order";
  els.categoryOrderPanel.hidden = true;
  els.categoryManagePanel.hidden = false;
  const existing = existingName ? findCategoryRecord(existingName) : null;
  state.categoryEditor = existing
    ? { ...existing, originalName: existingName }
    : { name: "", icon: categoryIconRepository[0].path, color: palette[0], custom: true, originalName: null };
  renderCategoryEditorPanel();
}

function renderCategoryEditorPanel() {
  const editor = state.categoryEditor;
  if (!editor) return;
  const ordered = getCategoryCatalog();
  els.categoryManagePanel.innerHTML = `
    <div class="category-manager-head">
      <div>
        <h3>Category Studio</h3>
        <p class="panel-hint">Drag rows to reorder. Pick icons from the local icon repository.</p>
      </div>
      <button type="button" class="secondary-button" id="closeCategoryManager">Close</button>
    </div>
    <div class="category-editor">
      <label>Name<input id="categoryEditorName" value="${escapeHtml(editor.name)}" placeholder="Category name" ${editor.originalName && !editor.custom ? "readonly" : ""} /></label>
      <label>Color<input id="categoryEditorColor" type="color" value="${escapeHtml(editor.color)}" /></label>
      <div class="selected-category-preview">
        <span style="--category-color:${editor.color}"><img src="${escapeHtml(categoryImageFor(editor.name, editor.icon))}" alt="" /></span>
        <strong>${escapeHtml(editor.name || "New category")}</strong>
      </div>
      <div class="icon-picker-label">Icon Library</div>
      <div id="categoryIconPicker" class="icon-picker image-icon-picker">
        ${categoryIconRepository.map((icon) => `<button type="button" class="icon-pick${categoryImageFor(editor.name, editor.icon) === icon.path ? " active" : ""}" data-pick-icon="${escapeHtml(icon.path)}" title="${escapeHtml(icon.label)}"><img src="${escapeHtml(icon.path)}" alt="" /><small>${escapeHtml(icon.label)}</small></button>`).join("")}
      </div>
      <div class="category-editor-actions">
        <button type="button" class="primary-button" id="saveCategoryEditor">${editor.originalName ? "Save changes" : "Add category"}</button>
        <button type="button" class="secondary-button" id="newCategoryEditor">New category</button>
        ${editor.originalName && editor.custom ? `<button type="button" class="danger-button" id="deleteCategoryEditor">Delete</button>` : ""}
      </div>
    </div>
    <div class="category-manager-list">
      ${ordered.map(([name, icon, color]) => {
        const record = findCategoryRecord(name);
        return `<div class="category-manager-row" draggable="true" data-category-name="${escapeHtml(name)}">
          <span class="drag-grip">::</span>
          <span class="category-image" style="--category-color:${color}"><img src="${escapeHtml(categoryImageFor(name, icon))}" alt="" /></span>
          <strong>${escapeHtml(name)}</strong>
          <button type="button" data-edit-category="${escapeHtml(name)}">Edit</button>
          ${record?.custom ? `<button type="button" data-delete-category-inline="${escapeHtml(name)}">Delete</button>` : ""}
        </div>`;
      }).join("")}
    </div>
  `;
  els.categoryManagePanel.querySelector("#categoryEditorName")?.addEventListener("input", (event) => {
    editor.name = event.target.value;
  });
  els.categoryManagePanel.querySelector("#categoryEditorColor")?.addEventListener("input", (event) => {
    editor.color = event.target.value;
  });
  els.categoryManagePanel.querySelectorAll("[data-pick-icon]").forEach((button) => {
    button.addEventListener("click", () => {
      editor.icon = button.dataset.pickIcon;
      renderCategoryEditorPanel();
    });
  });
  els.categoryManagePanel.querySelector("#saveCategoryEditor")?.addEventListener("click", saveCategoryEditor);
  els.categoryManagePanel.querySelector("#newCategoryEditor")?.addEventListener("click", () => {
    state.categoryEditor = { name: "", icon: categoryIconRepository[0].path, color: palette[0], custom: true, originalName: null };
    renderCategoryEditorPanel();
  });
  els.categoryManagePanel.querySelector("#closeCategoryManager")?.addEventListener("click", () => {
    els.categoryManagePanel.hidden = true;
    state.categoryEditor = null;
  });
  els.categoryManagePanel.querySelector("#deleteCategoryEditor")?.addEventListener("click", deleteCategoryEditor);
  els.categoryManagePanel.querySelectorAll("[data-edit-category]").forEach((button) => {
    button.addEventListener("click", () => openCategoryEditor(button.dataset.editCategory));
  });
  els.categoryManagePanel.querySelectorAll("[data-delete-category-inline]").forEach((button) => {
    button.addEventListener("click", () => deleteCategoryByName(button.dataset.deleteCategoryInline));
  });
  bindCategoryManagerDrag();
}

function saveCategoryEditor() {
  const editor = state.categoryEditor;
  const name = String(editor?.name || "").trim();
  if (!name) {
    alert("Category name is required.");
    return;
  }
  const payload = { name, icon: categoryImageFor(name, editor.icon), color: editor.color || palette[0] };
  const custom = Array.isArray(state.settings.customCategories) ? [...state.settings.customCategories] : [];
  const builtin = builtinCategories.some(([itemName]) => itemName === name);
  if (editor.originalName && editor.originalName !== name) {
    renameCategoryReferences(editor.originalName, name);
    const order = getCategoryOrder().map((item) => item === editor.originalName ? name : item);
    state.settings.categoryOrder = order;
  }
  if (builtin && editor.originalName) {
    state.settings.categoryOverrides = state.settings.categoryOverrides || {};
    state.settings.categoryOverrides[name] = { icon: payload.icon, color: payload.color };
  } else if (editor.custom || !builtin) {
    const index = custom.findIndex((item) => item.name === (editor.originalName || name));
    if (index >= 0) custom[index] = payload;
    else custom.push(payload);
    state.settings.customCategories = custom.filter((item) => !builtinCategories.some(([itemName]) => itemName === item.name));
  }
  const order = getCategoryOrder();
  if (!order.includes(name)) order.push(name);
  state.settings.categoryOrder = order;
  rebuildCategoryMap();
  els.categoryManagePanel.hidden = true;
  state.categoryEditor = null;
  persistRender();
}

function deleteCategoryEditor() {
  const editor = state.categoryEditor;
  if (!editor?.originalName) return;
  deleteCategoryByName(editor.originalName);
}

function deleteCategoryByName(name) {
  const record = findCategoryRecord(name);
  if (!record?.custom) return;
  if (!confirm(`Delete category "${name}"? Existing expenses keep their history.`)) return;
  state.settings.customCategories = (state.settings.customCategories || []).filter((item) => item.name !== name);
  state.settings.categoryOrder = getCategoryOrder().filter((item) => item !== name);
  rebuildCategoryMap();
  state.categoryEditor = { name: "", icon: categoryIconRepository[0].path, color: palette[0], custom: true, originalName: null };
  persistRender();
  openCategoryEditor();
}

function renameCategoryReferences(fromName, toName) {
  state.trips.forEach((trip) => {
    trip.entries.forEach((entry) => {
      if (entry.category === fromName) {
        entry.category = toName;
        const meta = categoryMap[toName];
        if (meta) {
          entry.icon = meta.icon;
          entry.color = meta.color;
        }
      }
    });
  });
}

function findCategoryRecord(name) {
  const custom = (state.settings.customCategories || []).find((item) => item.name === name);
  if (custom) return { ...custom, icon: categoryImageFor(custom.name, custom.icon), originalName: name, custom: true };
  const builtin = builtinCategories.find(([itemName]) => itemName === name);
  if (builtin) {
    const patch = state.settings.categoryOverrides?.[name] || {};
    return { name: builtin[0], icon: categoryImageFor(name, patch.icon || builtin[1]), color: patch.color || builtin[2], originalName: name, custom: false };
  }
  return null;
}

function getCategoryCatalog() {
  const order = getCategoryOrder();
  const records = new Map();
  const overrides = state.settings.categoryOverrides || {};
  builtinCategories.forEach(([name, icon, color]) => {
    const patch = overrides[name] || {};
    records.set(name, [name, categoryImageFor(name, patch.icon || icon), patch.color || color]);
  });
  (state.settings.customCategories || []).forEach((item) => records.set(item.name, [item.name, categoryImageFor(item.name, item.icon), item.color]));
  const ordered = order.filter((name) => records.has(name)).map((name) => records.get(name));
  records.forEach((value, name) => {
    if (!order.includes(name)) ordered.push(value);
  });
  return ordered;
}

function getCategoryOrder() {
  const names = new Set(builtinCategories.map(([name]) => name));
  (state.settings.customCategories || []).forEach((item) => names.add(item.name));
  const allNames = [...names];
  const saved = Array.isArray(state.settings.categoryOrder) ? state.settings.categoryOrder.filter((name) => names.has(name)) : [];
  const missing = allNames.filter((name) => !saved.includes(name));
  return [...saved, ...missing];
}

function rebuildCategoryMap() {
  categoryMap = Object.fromEntries(getCategoryCatalog().map(([name, icon, color]) => [name, { icon, color }]));
}

function renderCurrencies() {
  const search = els.currencySearch.value.toLowerCase();
  const displayNames = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(["en"], { type: "currency" }) : null;
  els.currencyList.innerHTML = "";
  currencyCodes
    .map((code) => [code, displayNames ? displayNames.of(code) : code])
    .filter(([code, name]) => `${code} ${name}`.toLowerCase().includes(search))
    .forEach(([code, name], index) => {
      const row = document.createElement("button");
      row.className = "currency-row";
      row.type = "button";
      row.innerHTML = `<span style="background:${pickColor(index)}">${code}</span><strong>${escapeHtml(name)}</strong>`;
      row.addEventListener("click", () => {
        const symbol = currencySymbol(code);
        const currency = { code, symbol, label: `${code} (${symbol})` };
        if (state.creatingTrip) {
          activeTrip().currency = normalizeCurrency(state.settings.homeCurrency);
          go("currency");
          return;
        }
        activeTrip().currency = currency;
        state.settings.homeCurrency = currency;
        persistRender();
        go("currency");
      });
      els.currencyList.append(row);
    });
}

function renderTrips() {
  const list = $("#tripList");
  list.innerHTML = "";
  if (!state.trips.length) {
    list.innerHTML = `<p class="empty-state">No trips yet. Create your first trip to start tracking expenses.</p>`;
    return;
  }
  state.trips.forEach((trip) => {
    const total = trip.entries.reduce((sum, entry) => sum + entryHomeAmount(entry, trip), 0);
    const shell = document.createElement("article");
    shell.className = `trip-card-shell${trip.id === state.activeTripId ? " active-trip" : ""}`;
    const image = trip.photo?.url
      ? `<span class="trip-photo" style="background-image:url('${cssUrl(trip.photo.url)}')"></span>`
      : `<span class="globe-icon">${escapeHtml((trip.name || "T").slice(0, 1).toUpperCase())}</span>`;
    shell.innerHTML = `
      <button class="trip-card" data-trip-open="${trip.id}" type="button">
        ${image}
        <span>
          <strong>${escapeHtml(trip.name || "Untitled Trip")}</strong>
          <small>${escapeHtml(state.users.map((user) => user.name).join(", "))}</small>
          <small>${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}</small>
          <small><b>${formatMoney(total, 0, trip)}</b> · <b>${formatMoney(trip.dailyBudget, 0, trip)}</b> /day</small>
        </span>
      </button>
      <button class="trip-card-menu" data-trip-menu="${trip.id}" type="button" aria-label="Trip menu">...</button>
      <div class="trip-inline-menu" ${state.openTripMenuId === trip.id ? "" : "hidden"}>
        <button data-edit-trip="${trip.id}" type="button">Edit all options</button>
        <button data-delete-trip="${trip.id}" type="button">Delete trip</button>
      </div>
    `;
    list.append(shell);
  });
}

function renderEntries() {
  const list = $("#entryList");
  const entries = activeTrip().entries;
  list.innerHTML = entries.length ? "" : `<p class="empty-state">No expenses yet.</p>`;
  entries.forEach((entry) => list.append(entryNode(entry)));
}

function expenseIconForCategory(category = "") {
  const text = String(category).toLowerCase();
  if (/grocery|shopping|laundry/.test(text)) return themedIconPaths.shopping;
  if (/restaurant|drink|coffee|activity|entertainment|sightseeing/.test(text)) return themedIconPaths.spending;
  if (/flight|transport|accommodation|hotel/.test(text)) return themedIconPaths.wallet;
  if (/saving|dream|goal/.test(text)) return themedIconPaths.saving;
  if (/fee|exchange|money/.test(text)) return themedIconPaths.money;
  return themedIconPaths.budget;
}

function categoryImageFor(name = "", icon = "") {
  const value = String(icon || "");
  if (value.startsWith("media/icons/") || value.startsWith("data:image/") || /\.(png|jpg|jpeg|webp|svg)$/i.test(value)) return value;
  return defaultCategoryIconMap[name] || categoryIconRepository[0].path;
}

function entryNode(entry) {
  const item = document.createElement("button");
  item.className = "entry-item";
  item.type = "button";
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    editEntry(entry.id);
  });
  const invoiceText = entry.invoices?.length ? ` · ${entry.invoices.length} invoice${entry.invoices.length === 1 ? "" : "s"}` : "";
  const gpsText = entry.latitude && entry.longitude ? " · GPS" : "";
  item.innerHTML = `
    <span class="icon themed-entry-icon" style="--entry-color:${entry.color}">
      <img src="${escapeHtml(categoryImageFor(entry.category, entry.icon) || expenseIconForCategory(entry.category))}" alt="" />
      <b>${escapeHtml(entry.icon)}</b>
    </span>
    <span><strong>${escapeHtml(entry.name)}</strong><small>${escapeHtml(entry.category)} · ${escapeHtml(entry.payment)} · ${escapeHtml(entry.location)}${gpsText}${invoiceText} · ${escapeHtml(splitLabel(entry.split))}</small></span>
    <strong>${formatMoney(entryMetricAmount(entry))}</strong>
  `;
  return item;
}

function renderSearch() {
  const selectedCategories = selectedFilterCategories();
  const filters = {
    categories: selectedCategories,
    user: els.filterUser.value,
    from: els.filterFromDate.value,
    to: els.filterToDate.value,
    location: els.filterLocation.value.trim().toLowerCase(),
    payment: els.filterPayment.value,
  };
  const results = activeTrip().entries.filter((entry) => {
    const participants = entry.split?.participants || [];
    if (filters.categories.length && !filters.categories.includes(entry.category)) return false;
    if (filters.user && entry.user !== filters.user && !participants.includes(filters.user)) return false;
    if (filters.from && entry.date < filters.from) return false;
    if (filters.to && entry.date > filters.to) return false;
    if (filters.location && !entry.location.toLowerCase().includes(filters.location)) return false;
    if (filters.payment && entry.payment !== filters.payment) return false;
    return true;
  });
  const list = $("#searchEntryList");
  list.innerHTML = "";
  results.forEach((entry) => list.append(entryNode(entry)));
  $("#searchResultCount").textContent = `${results.length} item${results.length === 1 ? "" : "s"}`;
}

function selectedFilterCategories() {
  return Array.from(els.filterCategory?.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);
}

function renderAnalytics() {
  const entries = metricEntries(activeTrip());
  const key = els.chartMode.value;
  const rows = key === "user"
    ? groupByUserShares(entries)
    : key === "country"
      ? groupByMetric(entries, "country")
      : key === "payment"
        ? groupByMetric(entries, "payment")
        : groupByMetric(entries, "category");
  renderStatsSummary(entries);
  renderChart(rows, entries);
  renderMonthBars(entries);
}

function renderDonut(rows) {
  const donut = $("#donutChart");
  const legend = $("#donutLegend");
  const total = rows.reduce((sum, row) => sum + Math.max(0, row.amount), 0);
  if (!rows.length || !total) {
    donut.style.background = "radial-gradient(circle at center, var(--panel) 0 42%, #303b63 43% 100%)";
    legend.innerHTML = `<p class="empty-state">No chart data yet.</p>`;
    return;
  }
  let start = 0;
  const stops = rows.map((row, index) => {
    const pct = Math.max(0, row.amount) / total * 100;
    const color = categoryMap[row.label]?.color || palette[index % palette.length];
    const segment = `${color} ${start}% ${start + pct}%`;
    start += pct;
    return segment;
  });
  donut.style.background = `radial-gradient(circle at center, var(--panel) 0 38%, transparent 39%), conic-gradient(${stops.join(", ")})`;
  legend.innerHTML = rows.map((row, index) => {
    const color = categoryMap[row.label]?.color || palette[index % palette.length];
    const pct = total ? Math.round((Math.max(0, row.amount) / total) * 100) : 0;
    return `<div><i style="background:${color}"></i><span>${escapeHtml(row.label)}</span><strong>${pct}% · ${formatMoney(row.amount)}</strong></div>`;
  }).join("");
}

function renderStatsSummary(entries) {
  const total = entries.reduce((sum, entry) => sum + entryMetricAmount(entry), 0);
  const refunds = entries.filter((entry) => entry.refund).reduce((sum, entry) => sum + Math.abs(entryMetricAmount(entry)), 0);
  const largest = entries.reduce((best, entry) => !best || entryMetricAmount(entry) > entryMetricAmount(best) ? entry : best, null);
  const daily = total / tripDays(activeTrip());
  $("#analyticsSummary").innerHTML = [
    ["Metric total", formatMoney(total)],
    ["Daily average", formatMoney(daily)],
    ["Refunds", formatMoney(refunds)],
    ["Largest", largest ? `${escapeHtml(largest.name)}: ${formatMoney(entryMetricAmount(largest))}` : "No expenses"],
  ].map(([label, value]) => `<article><span>${label}</span><strong>${value}</strong></article>`).join("");
}

function renderChart(rows, entries) {
  const chart = $("#chartCanvas");
  const legend = $("#donutLegend");
  const type = els.chartType.value || "pie";
  chart.className = `chart-canvas chart-${type}`;
  if (type === "line") {
    renderLineChart(entries, chart, legend);
    return;
  }

  const total = rows.reduce((sum, row) => sum + Math.max(0, row.amount), 0);
  if (!rows.length || !total) {
    chart.innerHTML = `<p class="empty-state">No chart data yet.</p>`;
    legend.innerHTML = "";
    return;
  }

  if (type === "bar") {
    const max = Math.max(...rows.map((row) => Math.max(0, row.amount)), 1);
    chart.innerHTML = rows.slice(0, 8).map((row, index) => {
      const color = row.color || categoryMap[row.label]?.color || palette[index % palette.length];
      const width = Math.max(4, (Math.max(0, row.amount) / max) * 100);
      return `<div class="chart-bar"><span>${escapeHtml(row.label)}</span><i style="width:${width}%;background:${color}"></i><strong>${formatMoney(row.amount)}</strong></div>`;
    }).join("");
  } else {
    let start = 0;
    const stops = rows.map((row, index) => {
      const pct = Math.max(0, row.amount) / total * 100;
      const color = row.color || categoryMap[row.label]?.color || palette[index % palette.length];
      const segment = `${color} ${start}% ${start + pct}%`;
      start += pct;
      return segment;
    });
    chart.innerHTML = `<div class="donut-chart dynamic-donut" style="background:radial-gradient(circle at center, var(--panel) 0 38%, transparent 39%), conic-gradient(${stops.join(", ")})"></div>`;
  }

  legend.innerHTML = rows.map((row, index) => {
    const color = row.color || categoryMap[row.label]?.color || palette[index % palette.length];
    const pct = total ? Math.round((Math.max(0, row.amount) / total) * 100) : 0;
    return `<div><i style="background:${color}"></i><span>${escapeHtml(row.label)}</span><strong>${pct}% / ${formatMoney(row.amount)}</strong></div>`;
  }).join("");
}

function renderLineChart(entries, chart, legend) {
  const rows = groupByDateMetric(entries);
  if (!rows.length) {
    chart.innerHTML = `<p class="empty-state">No chart data yet.</p>`;
    legend.innerHTML = "";
    return;
  }
  const values = rows.map((row) => row.amount);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = Math.max(1, max - min);
  const points = rows.map((row, index) => {
    const x = rows.length === 1 ? 50 : (index / (rows.length - 1)) * 100;
    const y = 90 - ((row.amount - min) / span) * 80;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  chart.innerHTML = `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Spend trend">
      <polyline points="${points}" fill="none" stroke="var(--pink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
    </svg>
    <div class="line-labels"><span>${escapeHtml(formatDate(rows[0].label))}</span><strong>${formatMoney(max)}</strong><span>${escapeHtml(formatDate(rows[rows.length - 1].label))}</span></div>
  `;
  legend.innerHTML = rows.slice(-5).reverse().map((row) => `<div><i></i><span>${escapeHtml(formatDate(row.label))}</span><strong>${formatMoney(row.amount)}</strong></div>`).join("");
}

function renderMonthBars(entries) {
  const byMonth = Array.from({ length: 12 }, (_, month) => ({ label: new Date(2026, month, 1).toLocaleString("en", { month: "short" }), amount: 0 }));
  entries.forEach((entry) => {
    const date = new Date(entry.date);
    if (!Number.isNaN(date.getTime())) byMonth[date.getMonth()].amount += entryMetricAmount(entry);
  });
  const max = Math.max(1, ...byMonth.map((row) => row.amount));
  $("#monthBars").innerHTML = byMonth.map((row) => `<span style="height:${Math.max(8, (row.amount / max) * 100)}%" title="${row.label} ${formatMoney(row.amount)}"></span>`).join("");
}

function renderFilterOptions() {
  fillSelect(els.paymentInput, paymentMethods);
  fillSelect(els.filterPayment, ["", ...paymentMethods], "All payment methods");
  renderCategoryFilterOptions();
  fillSelectOptions(els.filterUser, [{ value: "", label: "All users" }, ...state.users.map((user) => ({ value: user.email, label: user.name }))]);
  fillSelectOptions(els.userInput, state.users.map((user) => ({ value: user.email, label: `${user.name} (${user.email})` })));
  els.countryOptions.innerHTML = countryNames.map((name) => `<option value="${escapeHtml(name)}"></option>`).join("");
  els.userOptions.innerHTML = state.users.map((user) => `<option value="${escapeHtml(user.email)}">${escapeHtml(user.name)}</option>`).join("");
  renderExpenseUsers();
}

function renderCategoryFilterOptions() {
  if (!els.filterCategory) return;
  const selected = new Set(selectedFilterCategories());
  const categories = getCategoryCatalog().map(([name, icon, color]) => ({ name, icon, color }));
  els.filterCategory.innerHTML = categories
    .map((category) => `<option value="${escapeHtml(category.name)}" ${selected.has(category.name) ? "selected" : ""}>${escapeHtml(category.name)}</option>`)
    .join("");
  if (els.filterCategorySummary) {
    els.filterCategorySummary.textContent = selected.size
      ? selected.size === 1
        ? [...selected][0]
        : `${selected.size} categories selected`
      : "All categories";
  }
  if (!els.filterCategoryOptions) return;
  els.filterCategoryOptions.innerHTML = `
    <label class="category-filter-chip all-chip">
      <input data-filter-clear type="checkbox" ${selected.size ? "" : "checked"} />
      <span>All</span>
    </label>
    ${categories.map((category) => `
      <label class="category-filter-chip">
        <input data-filter-category type="checkbox" value="${escapeHtml(category.name)}" ${selected.has(category.name) ? "checked" : ""} />
        <i style="background:${category.color}"><img src="${escapeHtml(categoryImageFor(category.name, category.icon))}" alt="" /></i>
        <span>${escapeHtml(category.name)}</span>
      </label>
    `).join("")}
  `;
  els.filterCategoryOptions.querySelector("[data-filter-clear]")?.addEventListener("change", () => {
    Array.from(els.filterCategory.options).forEach((option) => { option.selected = false; });
    renderCategoryFilterOptions();
    renderSearch();
  });
}

function renderTripLabels() {
  const trip = activeTrip();
  const home = normalizeCurrency(state.settings.homeCurrency || trip.currency);
  $$("#tripTitle, .screen[data-screen='entries'] .trip-title span, .screen[data-screen='stats'] .trip-title span, .screen[data-screen='search'] .trip-title span").forEach((el) => { el.textContent = trip.name || "Untitled Trip"; });
  $("#reviewName").textContent = trip.name || "Untitled Trip";
  $("#homeCurrencyLabel").textContent = home.label;
  $("#reviewCurrency").textContent = trip.currency.label;
  $("#reviewDates").textContent = `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`;
  $("#reviewBudget").textContent = formatMoney(trip.dailyBudget);
  $("#reviewUsers").textContent = state.users.map((user) => `${user.name} (${user.email})`).join(", ");
  if (els.editorCurrencyButton) els.editorCurrencyButton.textContent = trip.currency.code;
  renderExpenseCurrencyOptions();
}

function renderTripPhoto() {
  const trip = activeTrip();
  if (trip.photo?.url) {
    els.tripPhotoPreview.textContent = "";
    els.tripPhotoPreview.style.backgroundImage = `url('${cssUrl(trip.photo.url)}')`;
    els.tripPhotoPreview.classList.add("has-photo");
    els.tripPhotoLabel.textContent = "Photo saved";
  } else {
    els.tripPhotoPreview.textContent = "+";
    els.tripPhotoPreview.style.backgroundImage = "";
    els.tripPhotoPreview.classList.remove("has-photo");
    els.tripPhotoLabel.textContent = "Add a photo (optional)";
  }
}

function renderTotals() {
  const trip = activeTrip();
  const total = trip.entries.reduce((sum, entry) => sum + entryMetricAmount(entry), 0);
  const metricTotal = metricEntries(trip).reduce((sum, entry) => sum + entryMetricAmount(entry), 0);
  const days = tripDays(trip);
  const dailyAverage = days > 0 ? metricTotal / days : metricTotal;
  $("#totalSpend").textContent = formatMoney(total);
  $("#dailyAverage").textContent = formatMoney(dailyAverage);
  $("#todayTotal").textContent = formatMoney(total);
  $("#statsDailyAverage").textContent = formatMoney(dailyAverage);
  $("#statsTotalDate").textContent = formatMoney(metricTotal);
}

function renderEditorCategory() {
  els.editorCategoryIcon.textContent = "";
  els.editorCategoryIcon.innerHTML = `<img src="${escapeHtml(categoryImageFor(state.selectedCategory.name, state.selectedCategory.icon))}" alt="" />`;
  els.editorCategoryIcon.style.background = state.selectedCategory.color;
}

function currentExpenseCurrency(previous = null) {
  const selectedCode = els.expenseCurrencyInput?.value || state.entryCurrency?.code || previous?.currencyCode || previous?.currency?.code || activeTrip().currency?.code;
  return normalizeCurrency({ code: selectedCode || normalizeCurrency(state.settings.homeCurrency || activeTrip().currency).code });
}

function renderExpenseCurrencyOptions() {
  if (!els.expenseCurrencyInput) return;
  const current = currentExpenseCurrency();
  els.expenseCurrencyInput.innerHTML = currencyCodes
    .map((code) => `<option value="${escapeHtml(code)}">${escapeHtml(code)}</option>`)
    .join("");
  if (!currencyCodes.includes(current.code)) {
    els.expenseCurrencyInput.insertAdjacentHTML("afterbegin", `<option value="${escapeHtml(current.code)}">${escapeHtml(current.code)}</option>`);
  }
  els.expenseCurrencyInput.value = current.code;
  state.entryCurrency = current;
}

function renderInvoiceSelection() {
  const count = els.invoiceInput.files.length;
  els.invoiceLabel.textContent = count ? "Invoice attached" : "No invoice uploaded";
}

function renderInvoiceGallery(invoices) {
  els.invoiceGallery.innerHTML = invoices.map((file, index) => `
    <a href="${escapeHtml(file.url)}" target="_blank" rel="noreferrer">
      <span style="background-image:url('${cssUrl(file.url)}')"></span>
      <small>Invoice ${index + 1}</small>
    </a>
  `).join("");
}

function renderExpenseUsers() {
  if (!els.expenseUserList) return;
  ensureSplitDraft();
  const selected = new Set(state.splitDraft.participants || []);
  els.expenseUserList.innerHTML = state.users.map((user) => `
    <label class="expense-user-chip">
      <input data-expense-user="${escapeHtml(user.email)}" type="checkbox" ${selected.has(user.email) ? "checked" : ""} />
      <span>${avatar(user.email)}</span>
      <strong>${escapeHtml(user.name)}</strong>
    </label>
  `).join("");
  els.expenseUserList.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const email = input.dataset.expenseUser;
      const next = new Set(state.splitDraft.participants || []);
      if (input.checked) next.add(email);
      else next.delete(email);
      if (!next.size) next.add(els.userInput.value || owner().email);
      state.splitDraft.participants = Array.from(next);
      if (!state.splitDraft.participants.includes(state.splitDraft.paidBy)) {
        state.splitDraft.participants.push(state.splitDraft.paidBy);
      }
      renderExpenseUsers();
      renderSplitSummary();
      saveState();
    });
  });
}

function renderSplitChoices() {
  ensureSplitDraft();
  const participants = selectedParticipantKeys();
  $("#splitChoices").innerHTML = [
    ["equal", "Split equally"],
    ["amount", "Amount wise"],
  ].map(([id, label]) => `<button data-split-choice="${id}" type="button"><span class="avatar-pair">${participants.slice(0, 3).map(avatar).join("")}</span><strong>${escapeHtml(label)}</strong><b>${state.splitDraft.mode === id ? "OK" : ""}</b></button>`).join("");
}

function renderSplitAdjuster() {
  ensureSplitDraft();
  const draft = state.splitDraft;
  if (!["equal", "amount"].includes(draft.mode)) draft.mode = "equal";
  $$(".split-tabs button").forEach((button) => button.classList.toggle("active", button.dataset.splitMode === draft.mode));
  $("#paidByAvatar").style.background = userColor(draft.paidBy);
  $("#paidByAvatar").textContent = userLabel(draft.paidBy).slice(0, 1).toUpperCase();
  $("#paidByLabel").textContent = `Paid by ${userLabel(draft.paidBy)}`;
  const help = draft.mode === "amount"
    ? ["Amount wise", "Enter the exact amount each selected user owes."]
    : ["Split equally", "Selected users share this expense equally."];
  $("#splitModeHelp").innerHTML = `<strong>${help[0]}</strong><span>${help[1]}</span>`;
  const rows = draft.mode === "amount" ? selectedParticipantKeys() : participantKeys();
  $("#splitParticipants").innerHTML = rows.map((name) => participantRow(name, draft)).join("");
  $("#splitParticipants").querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      draft.values[input.dataset.name] = parseAmount(input.value);
      renderSplitTotal();
      renderSplitSummary();
      saveState();
    });
  });
  $("#splitParticipants").querySelectorAll("[data-toggle-person]").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.togglePerson;
      draft.participants = draft.participants.includes(name) ? draft.participants.filter((item) => item !== name) : [...draft.participants, name];
      if (!draft.participants.length) draft.participants = [name];
      renderExpenseUsers();
      renderSplitAdjuster();
    });
  });
  renderSplitTotal();
}

function participantRow(name, draft) {
  const active = draft.participants.includes(name);
  if (draft.mode === "equal") {
    return `<button class="participant-row" data-toggle-person="${escapeHtml(name)}" type="button">${avatar(name)}<strong>${escapeHtml(userLabel(name))}</strong><b>${active ? "OK" : ""}</b></button>`;
  }
  return `<label class="participant-row">${avatar(name)}<strong>${escapeHtml(userLabel(name))}</strong><span>${currentExpenseCurrency().symbol}</span><input data-name="${escapeHtml(name)}" value="${draft.values[name] || ""}" inputmode="decimal" placeholder="0" /></label>`;
}

function renderSplitTotal() {
  const draft = state.splitDraft;
  const amount = parseAmount(els.amountInput.value);
  const count = selectedParticipantKeys().length;
  const currency = currentExpenseCurrency();
  const text = draft.mode === "amount"
    ? `${formatCurrencyAmount(sumValues(draft.values), currency)} of ${formatCurrencyAmount(amount, currency)}`
    : `${count} user${count === 1 ? "" : "s"} share ${formatCurrencyAmount(amount, currency)}`;
  $("#splitTotal").textContent = text;
}

function renderSplitSummary() {
  els.splitSummary.textContent = state.splitDraft ? splitLabel(state.splitDraft) : "Paid by you and split equally.";
}

function renderAccount() {
  const user = owner();
  if (user.profilePhoto?.url) {
    els.ownerAvatar.textContent = "";
    els.ownerAvatar.style.backgroundImage = `url('${cssUrl(user.profilePhoto.url)}')`;
    els.ownerAvatar.classList.add("has-photo");
    els.ownerPhotoLabel.textContent = "Profile picture set";
  } else {
    els.ownerAvatar.textContent = user.name.slice(0, 1).toUpperCase();
    els.ownerAvatar.style.backgroundImage = "";
    els.ownerAvatar.classList.remove("has-photo");
    els.ownerPhotoLabel.textContent = "Change profile picture";
  }
  els.ownerAvatar.style.backgroundColor = userColor(user.email || user.name);
  els.ownerNameInput.value = user.name;
  els.ownerEmailInput.value = user.email;
  els.ownerPasswordInput.value = "********";
  els.autoLocationInput.checked = Boolean(state.settings.autoLocation);
  els.fontFamilyInput.value = state.settings.fontFamily || "inter";
  els.fontSizeInput.value = state.settings.fontSize || defaultFontSize;
  els.fontSizeLabel.textContent = `${state.settings.fontSize || defaultFontSize}px`;
  if (els.wallpaperNameInput) els.wallpaperNameInput.value = "";
  if (els.wallpaperLabel) els.wallpaperLabel.textContent = "Upload one or many images; large images are optimized before saving.";
  if (els.changePasswordStatus) els.changePasswordStatus.textContent = "";
  $$("#themeOptions button").forEach((button) => button.classList.toggle("active", button.dataset.themeOption === state.settings.theme));
  renderWallpaperLibrary();
}

function renderWallpaperLibrary() {
  if (!els.wallpaperLibrary) return;
  const wallpapers = wallpaperList();
  if (!wallpapers.length) {
    els.wallpaperLibrary.innerHTML = `<p class="empty-state">No wallpapers uploaded yet.</p>`;
    return;
  }
  const activeId = activeWallpaper()?.id;
  els.wallpaperLibrary.innerHTML = wallpapers.map((wallpaper) => `
    <article class="wallpaper-tile${wallpaper.id === activeId ? " active" : ""}">
      <button data-wallpaper-select="${escapeHtml(wallpaper.id)}" type="button">
        <span style="background-image:url('${cssUrl(wallpaper.url)}')"></span>
        <strong>${escapeHtml(wallpaper.name || "Wallpaper")}</strong>
      </button>
      <button data-wallpaper-delete="${escapeHtml(wallpaper.id)}" type="button" aria-label="Delete wallpaper">×</button>
    </article>
  `).join("");
}

function wallpaperList() {
  state.settings.wallpapers = Array.isArray(state.settings.wallpapers) ? state.settings.wallpapers.filter((item) => item?.url) : [];
  return state.settings.wallpapers;
}

function activeWallpaper() {
  const wallpapers = wallpaperList();
  return wallpapers.find((item) => item.id === state.settings.activeWallpaperId) || wallpapers[0] || null;
}

function selectWallpaper(id) {
  const wallpaper = wallpaperList().find((item) => item.id === id);
  if (!wallpaper) return;
  state.settings.activeWallpaperId = wallpaper.id;
  state.settings.wallpaper = "custom";
  persistRender();
}

function deleteWallpaper(id) {
  const wallpapers = wallpaperList();
  const wallpaper = wallpapers.find((item) => item.id === id);
  if (!wallpaper || !confirm(`Delete wallpaper "${wallpaper.name || "Wallpaper"}"?`)) return;
  state.settings.wallpapers = wallpapers.filter((item) => item.id !== id);
  if (state.settings.activeWallpaperId === id) state.settings.activeWallpaperId = state.settings.wallpapers[0]?.id || "";
  state.settings.wallpaperImage = state.settings.wallpapers.find((item) => item.id === state.settings.activeWallpaperId) || null;
  state.settings.wallpaper = state.settings.activeWallpaperId ? "custom" : "none";
  persistRender();
}

function isAdmin(email = state.currentUserEmail) {
  return normalizeEmail(email) === adminEmail;
}

function applyAdminAccess() {
  $$("[data-admin-only]").forEach((element) => {
    element.hidden = !isAdmin();
  });
}

function addSystemLog(action, detail = "", level = "info", actor = state.currentUserEmail) {
  state.systemLogs = Array.isArray(state.systemLogs) ? state.systemLogs : [];
  state.systemLogs.unshift({
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    actor: normalizeEmail(actor || ""),
    level,
    action,
    detail,
  });
  state.systemLogs = state.systemLogs.slice(0, 300);
}

function adminUserStats(user) {
  const email = normalizeEmail(user.email);
  const rows = state.trips.flatMap((trip) => (trip.entries || []).map((entry) => ({ ...entry, tripName: trip.name, trip })));
  const related = rows.filter((entry) => {
    const split = normalizeSplit(entry.split, entry.user);
    return normalizeEmail(entry.user) === email || normalizeEmail(split.paidBy) === email || split.participants.some((item) => normalizeEmail(item) === email);
  });
  return {
    count: related.length,
    share: related.reduce((sum, entry) => sum + entryMetricAmount(entry, email, entry.trip), 0),
    paid: related.reduce((sum, entry) => {
      const split = normalizeSplit(entry.split, entry.user);
      return normalizeEmail(split.paidBy) === email ? sum + entryHomeAmount(entry, entry.trip) : sum;
    }, 0),
    invoices: related.reduce((sum, entry) => sum + (entry.invoices?.length || 0), 0),
    lastLocation: related.find((entry) => entry.location)?.location || "No saved location",
  };
}

function renderAdmin() {
  if (!els.adminUserList) return;
  applyAdminAccess();

  if (!isAdmin()) {
    els.adminSystemSummary.innerHTML = `<p class="admin-muted">Admin access is locked.</p>`;
    els.adminUserList.innerHTML = "";
    els.adminLogList.innerHTML = "";
    els.adminSavedLocations.innerHTML = "";
    return;
  }

  const allEntries = state.trips.flatMap((trip) => (trip.entries || []).map((entry) => ({ ...entry, tripName: trip.name })));
  const gpsEntries = allEntries.filter((entry) => entry.latitude && entry.longitude).slice(0, 8);
  const totalInvoices = allEntries.reduce((sum, entry) => sum + (entry.invoices?.length || 0), 0);
  const lastBackup = state.systemLogs?.find((log) => log.action.toLowerCase().includes("backup"));

  els.adminSystemSummary.innerHTML = [
    ["Users", state.users.length],
    ["Trips", state.trips.length],
    ["Expenses", allEntries.length],
    ["Invoices", totalInvoices],
    ["Current admin", state.currentUserEmail || "None"],
    ["Last backup", lastBackup ? formatDate(lastBackup.at) : "Not logged"],
  ].map(([label, value]) => `<article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`).join("");

  els.adminSavedLocations.innerHTML = gpsEntries.length
    ? gpsEntries.map((entry) => `
      <article>
        <strong>${escapeHtml(entry.location || "Saved GPS")}</strong>
        <span>${escapeHtml(entry.tripName)} · ${escapeHtml(entry.name)} · ${escapeHtml(entry.latitude)}, ${escapeHtml(entry.longitude)}</span>
      </article>
    `).join("")
    : `<p class="admin-muted">No saved GPS locations yet.</p>`;

  els.adminUserList.innerHTML = state.users.map((user) => {
    const lockedAdmin = normalizeEmail(user.email) === adminEmail;
    const stats = adminUserStats(user);
    const profileValue = user.profilePhoto?.url || user.profilePhoto?.path || "";
    const avatarMarkup = profileValue
      ? `<span class="avatar admin-photo-avatar has-photo" style="background-image:url('${cssUrl(profileValue)}')"></span>`
      : `<span class="avatar" style="background:${userColor(user.email)}">${escapeHtml((user.name || user.email).slice(0, 1).toUpperCase())}</span>`;
    return `
      <article class="admin-user-card" data-admin-user-card="${escapeHtml(user.id)}">
        <div class="admin-user-title">
          ${avatarMarkup}
          <span><strong>${escapeHtml(user.name)}</strong><small>${escapeHtml(user.email)}</small></span>
          ${lockedAdmin ? "<em>Admin</em>" : ""}
        </div>
        <div class="admin-user-stats">
          <article><span>User spend</span><strong>${formatMoney(stats.share)}</strong></article>
          <article><span>Paid total</span><strong>${formatMoney(stats.paid)}</strong></article>
          <article><span>Expenses</span><strong>${stats.count}</strong></article>
          <article><span>Invoices</span><strong>${stats.invoices}</strong></article>
        </div>
        <p class="admin-muted">Last location: ${escapeHtml(stats.lastLocation)}</p>
        <label>User ID<input data-admin-id value="${escapeHtml(user.id)}" readonly /></label>
        <label>Name<input data-admin-name value="${escapeHtml(user.name)}" /></label>
        <label>Email<input data-admin-email value="${escapeHtml(user.email)}" ${lockedAdmin ? "readonly" : ""} /></label>
        <label>Password<input data-admin-password value="${escapeHtml(user.password || "")}" /></label>
        <label>Profile photo URL<input data-admin-profile value="${escapeHtml(profileValue)}" placeholder="Paste image URL or saved media path" /></label>
        <label class="admin-profile-upload">Upload profile picture<input data-admin-profile-file="${escapeHtml(user.id)}" type="file" accept="image/*" /></label>
        <label>Country code<input data-admin-country value="${escapeHtml(user.countryCode || "")}" /></label>
        <label>Phone<input data-admin-phone value="${escapeHtml(user.phone || "")}" /></label>
        <div class="admin-user-actions">
          <button data-admin-save-user="${escapeHtml(user.id)}" type="button">Save user</button>
          <button data-admin-delete-user="${escapeHtml(user.id)}" type="button" ${lockedAdmin ? "disabled" : ""}>Delete user</button>
        </div>
      </article>
    `;
  }).join("");
  els.adminUserList.querySelectorAll("[data-admin-profile-file]").forEach((input) => {
    input.addEventListener("change", () => saveAdminProfilePhoto(input.dataset.adminProfileFile, input.files?.[0]));
  });

  const logs = Array.isArray(state.systemLogs) ? state.systemLogs : [];
  els.adminLogList.innerHTML = logs.length
    ? logs.slice(0, 80).map((log) => `
      <article>
        <strong>${escapeHtml(log.action)}</strong>
        <span>${escapeHtml(formatDate(log.at))} · ${escapeHtml(log.actor || "system")} · ${escapeHtml(log.level || "info")}</span>
        ${log.detail ? `<p>${escapeHtml(log.detail)}</p>` : ""}
      </article>
    `).join("")
    : `<p class="admin-muted">No logs yet.</p>`;
}

function saveAdminUser(id) {
  if (!isAdmin()) return;
  const user = state.users.find((item) => item.id === id);
  const card = document.querySelector(`[data-admin-user-card="${id}"]`);
  if (!user || !card) return;
  const lockedAdmin = normalizeEmail(user.email) === adminEmail;
  const nextEmail = normalizeEmail(card.querySelector("[data-admin-email]").value);
  if (!isEmail(nextEmail)) {
    alert("Enter a valid email for this user.");
    return;
  }
  const duplicate = state.users.find((item) => item.id !== id && normalizeEmail(item.email) === nextEmail);
  if (duplicate) {
    alert("Another user already has this email.");
    return;
  }
  if (lockedAdmin && nextEmail !== adminEmail) {
    alert("The primary admin email cannot be changed.");
    return;
  }

  const oldEmail = user.email;
  user.name = card.querySelector("[data-admin-name]").value.trim() || nameFromEmail(nextEmail);
  user.password = card.querySelector("[data-admin-password]").value;
  user.countryCode = card.querySelector("[data-admin-country]").value.trim();
  user.phone = card.querySelector("[data-admin-phone]").value.replace(/\D/g, "");
  const profileValue = card.querySelector("[data-admin-profile]")?.value.trim() || "";
  user.profilePhoto = profileValue
    ? {
      ...(user.profilePhoto || {}),
      id: user.profilePhoto?.id || crypto.randomUUID(),
      kind: "profiles",
      name: user.profilePhoto?.name || `${user.name} profile photo`,
      url: profileValue,
      path: user.profilePhoto?.path || null,
      createdAt: user.profilePhoto?.createdAt || new Date().toISOString(),
    }
    : null;
  if (nextEmail !== oldEmail) {
    migrateUserReferences(oldEmail, nextEmail);
    user.email = nextEmail;
    if (normalizeEmail(state.currentUserEmail) === normalizeEmail(oldEmail)) state.currentUserEmail = nextEmail;
  }
  addSystemLog("Admin edited user", `${oldEmail} -> ${user.email}`, "admin");
  saveState();
  renderAll();
}

async function saveAdminProfilePhoto(id, file) {
  if (!isAdmin() || !file) return;
  const user = state.users.find((item) => item.id === id);
  if (!user) return;
  const media = await storeOptimizedImage(file, "profiles");
  if (!media) return;
  user.profilePhoto = media;
  addSystemLog("Admin changed profile photo", user.email, "admin");
  saveState();
  renderAll();
}

function deleteAdminUser(id) {
  if (!isAdmin()) return;
  const user = state.users.find((item) => item.id === id);
  if (!user) return;
  if (normalizeEmail(user.email) === adminEmail) {
    alert("The primary admin cannot be deleted.");
    return;
  }
  if (!confirm(`Delete ${user.email}? Their expense records will be removed from all trips.`)) return;
  state.users = state.users.filter((item) => item.id !== id);
  state.trips.forEach((trip) => {
    trip.entries = trip.entries.filter((entry) => normalizeEmail(entry.user) !== normalizeEmail(user.email) && normalizeEmail(entry.split?.paidBy) !== normalizeEmail(user.email));
  });
  addSystemLog("Admin deleted user", user.email, "admin");
  saveState();
  renderAll();
}

function clearAdminLogs() {
  if (!isAdmin()) return;
  if (!confirm("Clear admin and system logs?")) return;
  state.systemLogs = [];
  addSystemLog("Admin cleared logs", "", "admin");
  saveState();
  renderAdmin();
}

function refreshAdminLocation() {
  if (!isAdmin()) return;
  if (!navigator.geolocation) {
    els.adminLocationStatus.textContent = "GPS location is not available in this browser.";
    return;
  }
  els.adminLocationStatus.textContent = "Fetching current browser location...";
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = Number(position.coords.latitude.toFixed(6));
    const longitude = Number(position.coords.longitude.toFixed(6));
    const place = await reverseGeocode(latitude, longitude);
    const label = place || `Lat ${latitude}, Lng ${longitude}`;
    els.adminLocationStatus.textContent = `${label} (${latitude}, ${longitude})`;
    addSystemLog("Admin refreshed live location", `${label} · ${latitude}, ${longitude}`, "admin");
    saveState();
    renderAdmin();
  }, () => {
    els.adminLocationStatus.textContent = "Location permission was not allowed.";
  }, { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 });
}

function applySplitChoice(choice) {
  ensureSplitDraft();
  const paidBy = els.userInput.value || owner().email;
  const participants = selectedParticipantKeys();
  state.splitDraft = makeSplit(choice === "amount" ? "amount" : "equal", paidBy, participants, state.splitDraft.values || {});
  renderExpenseUsers();
  renderSplitSummary();
  if (choice === "amount") go("adjustSplit");
  else go("entry");
}

function addUser() {
  const email = normalizeEmail(prompt("User mail ID"));
  if (!email || !isEmail(email)) {
    alert("A valid mail ID is needed to create a user.");
    return;
  }
  const existing = findUser(email);
  if (existing) {
    alert(`${existing.name} is already available in this trip.`);
    return;
  }
  state.users.push(defaultUser(email));
  ensureSplitDraft();
  state.splitDraft.participants.push(email);
  addSystemLog("User added", email, "user");
  persistRender();
}

function tryAutoLocation(silent) {
  if (!navigator.geolocation) {
    els.locationStatus.textContent = "GPS location is not available in this browser.";
    return;
  }
  els.locationStatus.textContent = "Fetching current GPS location...";
  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitude = Number(position.coords.latitude.toFixed(6));
    const longitude = Number(position.coords.longitude.toFixed(6));
    state.locationDraft = { latitude, longitude };
    els.locationInput.value = `Lat ${latitude}, Lng ${longitude}`;
    els.locationStatus.textContent = "Finding street and city...";
    const place = await reverseGeocode(latitude, longitude);
    if (place) {
      els.locationInput.value = place;
      els.locationStatus.textContent = `GPS saved: ${place}`;
    } else {
      els.locationStatus.textContent = `GPS saved: ${latitude}, ${longitude}`;
    }
  }, () => {
    els.locationStatus.textContent = silent ? "GPS was not allowed. You can still type a place." : "Allow location access to auto-fill this expense.";
  }, { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 });
}

async function reverseGeocode(latitude, longitude) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom=18&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Place lookup failed");
    const payload = await response.json();
    const address = payload.address || {};
    const street = [address.road, address.neighbourhood || address.suburb].filter(Boolean).join(", ");
    const city = address.city || address.town || address.village || address.county || "";
    const stateName = address.state || "";
    const country = address.country || "";
    return [street, city, stateName, country].filter(Boolean).slice(0, 4).join(", ") || payload.display_name || "";
  } catch {
    return "";
  }
}

async function storeMediaFiles(fileList, kind) {
  const files = Array.from(fileList || []);
  const saved = [];
  for (const file of files) {
    const dataUrl = await fileToDataUrl(file);
    const displayName = String(file.name || "upload").replace(/^\d{14}-/, "");
    const fallback = { id: crypto.randomUUID(), kind, name: displayName, url: dataUrl, path: null, createdAt: new Date().toISOString() };
    try {
      const response = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, fileName: displayName, dataUrl }),
      });
      if (response.ok) {
        const remote = await response.json();
        saved.push({ ...fallback, url: remote.url, path: remote.path, size: remote.size });
      } else {
        saved.push(fallback);
      }
    } catch {
      saved.push(fallback);
    }
  }
  return saved;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function saveProfilePhoto() {
  const media = await storeOptimizedImage(els.ownerPhotoInput.files?.[0], "profiles");
  if (media) {
    owner().profilePhoto = media;
    persistRender();
  }
  els.ownerPhotoInput.value = "";
}

async function saveWallpaper() {
  const files = Array.from(els.wallpaperInput.files || []);
  if (!files.length) return;
  const baseName = els.wallpaperNameInput?.value.trim() || "";
  const wallpapers = wallpaperList();
  for (const [index, file] of files.entries()) {
    const media = await storeOptimizedImage(file, "wallpapers");
    if (media) {
      const label = baseName
        ? files.length > 1 ? `${baseName} ${index + 1}` : baseName
        : cleanUploadName(file.name).replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      wallpapers.push({ ...media, name: label || media.name || "Wallpaper" });
      state.settings.activeWallpaperId = media.id;
      state.settings.wallpaper = "custom";
    }
  }
  state.settings.wallpapers = wallpapers;
  state.settings.wallpaperImage = activeWallpaper();
  els.wallpaperInput.value = "";
  if (els.wallpaperNameInput) els.wallpaperNameInput.value = "";
  persistRender();
}

async function storeOptimizedImage(file, kind) {
  if (!file) return null;
  const optimized = await optimizeImage(file);
  const fallback = { id: crypto.randomUUID(), kind, name: optimized.name, url: optimized.dataUrl, path: null, createdAt: new Date().toISOString(), size: optimized.size };
  try {
    const response = await fetch("/api/media", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, fileName: optimized.name, dataUrl: optimized.dataUrl }),
    });
    if (!response.ok) return fallback;
    const remote = await response.json();
    return { ...fallback, url: remote.url, path: remote.path, size: remote.size };
  } catch {
    return fallback;
  }
}

async function optimizeImage(file) {
  if (!file.type.startsWith("image/")) return { name: cleanUploadName(file.name), dataUrl: await fileToDataUrl(file), size: file.size };
  const image = await loadImage(file);
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
  return { name: cleanUploadName(file.name).replace(/\.[^.]+$/, ".jpg"), dataUrl, size: Math.round((dataUrl.length * 3) / 4) };
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(image.src);
      resolve(image);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

async function backupNow() {
  const ok = await syncBackup(true);
  addSystemLog(ok ? "Manual backup saved" : "Manual backup failed", ok ? "Backup folder updated." : "Server backup endpoint unavailable.", ok ? "system" : "warning");
  saveState();
  alert(ok ? "Backup saved to the backup folder." : "Saved in browser. Start the Node server to write backup files.");
}

async function exportData(format = "csv") {
  await syncBackup(false);
  const type = String(format || "csv").toLowerCase();
  if (type === "pdf") {
    exportPdfReport();
    return;
  }
  if (type === "xlsx") {
    exportXlsxReport();
    return;
  }
  exportCsvBlob();
}

async function exportCsv() {
  await exportData("csv");
}

function exportCsvBlob() {
  const blob = new Blob([buildAllCsv()], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, `couple_budget_all_expenses_${today()}.csv`);
}

function exportPdfReport() {
  const rows = expenseReportRows();
  const lines = [
    "Couple Budget Expense Report",
    `Generated ${new Date().toLocaleString()}`,
    `Rows ${Math.max(0, rows.length - 1)}`,
    "",
    ...rows.slice(1, 42).map((row) => `${row[0]} | ${row[1]} | ${row[2]} | ${row[4]} ${row[5]} | ${row[8]}`),
  ];
  const blob = new Blob([buildSimplePdf(lines)], { type: "application/pdf" });
  downloadBlob(blob, `couple_budget_report_${today()}.pdf`);
}

function exportXlsxReport() {
  const files = buildXlsxFiles(expenseReportRows());
  const blob = zipStore(files);
  downloadBlob(blob, `couple_budget_report_${today()}.xlsx`);
}

function downloadBlob(blob, fileName) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}

function expenseReportRows() {
  const rows = [["Trip", "Date", "Name", "Category", "Amount", "Currency", "Payment", "Location", "Paid By", "Participants", "Invoices"]];
  state.trips.forEach((trip) => {
    trip.entries.forEach((entry) => {
      const currency = normalizeCurrency(entry.currency || { code: entry.currencyCode || trip.currency.code });
      rows.push([
        trip.name,
        entry.date,
        entry.name,
        entry.category,
        Number(signedAmount(entry).toFixed(2)),
        currency.code,
        entry.payment,
        entry.location,
        userLabel(entry.user),
        normalizeSplit(entry.split, entry.user).participants.map(userLabel).join("; "),
        entry.invoices?.length || 0,
      ]);
    });
  });
  return rows;
}

function buildSimplePdf(lines) {
  const content = [
    "BT",
    "/F1 16 Tf",
    "50 760 Td",
    `(${escapePdfText(lines[0] || "Couple Budget Report")}) Tj`,
    "/F1 10 Tf",
    ...lines.slice(1).flatMap((line) => ["0 -18 Td", `(${escapePdfText(line)}) Tj`]),
    "ET",
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

function escapePdfText(value) {
  return String(value ?? "").replace(/[^\x20-\x7E]/g, "?").replace(/[\\()]/g, "\\$&").slice(0, 110);
}

function buildXlsxFiles(rows) {
  const sheetRows = rows.map((row, rowIndex) => `<row r="${rowIndex + 1}">${row.map((cell, columnIndex) => xlsxCell(cell, rowIndex + 1, columnIndex + 1)).join("")}</row>`).join("");
  return {
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Expenses" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
    "xl/styles.xml": `<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="1"><xf/></cellXfs></styleSheet>`,
    "xl/worksheets/sheet1.xml": `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetRows}</sheetData></worksheet>`,
  };
}

function xlsxCell(value, rowIndex, columnIndex) {
  const ref = `${xlsxColumn(columnIndex)}${rowIndex}`;
  if (typeof value === "number" && Number.isFinite(value)) return `<c r="${ref}"><v>${value}</v></c>`;
  return `<c r="${ref}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
}

function xlsxColumn(index) {
  let name = "";
  let value = index;
  while (value > 0) {
    const remainder = (value - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    value = Math.floor((value - 1) / 26);
  }
  return name;
}

function escapeXml(value) {
  return String(value ?? "").replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char]));
}

function zipStore(files) {
  const encoder = new TextEncoder();
  const parts = [];
  const central = [];
  let offset = 0;
  Object.entries(files).forEach(([name, content]) => {
    const nameBytes = encoder.encode(name);
    const data = encoder.encode(content);
    const crc = crc32(data);
    const local = zipHeader(0x04034b50, nameBytes, data.length, crc);
    parts.push(local, nameBytes, data);
    central.push({ nameBytes, dataLength: data.length, crc, offset });
    offset += local.length + nameBytes.length + data.length;
  });
  const centralStart = offset;
  central.forEach((entry) => {
    const directory = zipCentralHeader(entry.nameBytes, entry.dataLength, entry.crc, entry.offset);
    parts.push(directory, entry.nameBytes);
    offset += directory.length + entry.nameBytes.length;
  });
  parts.push(zipEndRecord(central.length, offset - centralStart, centralStart));
  return new Blob(parts, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

function zipHeader(signature, nameBytes, size, crc) {
  const view = new DataView(new ArrayBuffer(30));
  view.setUint32(0, signature, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, 0, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0, true);
  view.setUint32(14, crc, true);
  view.setUint32(18, size, true);
  view.setUint32(22, size, true);
  view.setUint16(26, nameBytes.length, true);
  view.setUint16(28, 0, true);
  return view.buffer;
}

function zipCentralHeader(nameBytes, size, crc, offset) {
  const view = new DataView(new ArrayBuffer(46));
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, 0, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0, true);
  view.setUint16(14, 0, true);
  view.setUint32(16, crc, true);
  view.setUint32(20, size, true);
  view.setUint32(24, size, true);
  view.setUint16(28, nameBytes.length, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, offset, true);
  return view.buffer;
}

function zipEndRecord(count, size, offset) {
  const view = new DataView(new ArrayBuffer(22));
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(8, count, true);
  view.setUint16(10, count, true);
  view.setUint32(12, size, true);
  view.setUint32(16, offset, true);
  view.setUint16(20, 0, true);
  return view.buffer;
}

function crc32(bytes) {
  let crc = -1;
  for (const byte of bytes) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ -1) >>> 0;
}

function persistRender() {
  saveState();
  renderAll();
}

function renderAll() {
  applyAppearance();
  applyAdminAccess();
  syncSetupFields();
  renderTripLabels();
  renderFilterOptions();
  renderDisplayCurrencyOptions();
  renderTrips();
  renderEntries();
  renderSearch();
  renderAnalytics();
  renderTotals();
  renderSplitSummary();
  renderAccount();
  renderAdmin();
  ensureExchangeRates().catch(() => {});
}

async function bootstrap() {
  await hydrateBackup();
  rebuildCategoryMap();
  const session = loadSession();
  const sessionEmail = normalizeEmail(session?.email || "");
  state.currentUserEmail = findUser(sessionEmail)?.email || "";
  renderCategories();
  renderCurrencies();
  renderEditorCategory();
  renderAll();
  go(state.currentUserEmail ? "trips" : "auth");
}

async function authenticate(mode) {
  const email = normalizeEmail(els.authEmailInput.value);
  const password = els.authPasswordInput.value.trim();
  if (!isEmail(email) || !password) {
    els.authStatus.textContent = "Enter a valid Email ID and password.";
    return;
  }

  const existing = findUser(email);
  if (mode === "create" && existing?.password && existing.password !== password) {
    els.authStatus.textContent = "Account already exists. Login instead.";
    return;
  }

  els.authStatus.textContent = mode === "create" ? "Creating account..." : "Logging in...";
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, email, password, state: snapshotState(), accountsCsv: buildAccountsCsv() }),
    });
    const result = await response.json();
    if (!response.ok) {
      els.authStatus.textContent = result.error || "Unable to authenticate.";
      return;
    }
    Object.assign(state, normalizeState(result.state || snapshotState()));
    rebuildCategoryMap();
    state.currentUserEmail = normalizeEmail(result.user.email);
  } catch (error) {
    if (mode === "login" && existing?.password && existing.password !== password) {
      els.authStatus.textContent = "Password does not match this Email ID.";
      return;
    }
    if (mode === "login" && existing?.password === password) {
      state.currentUserEmail = existing.email;
      els.authStatus.textContent = "Server backup is offline, but browser login is ready.";
    } else if (mode === "create" || existing) {
      const user = ensureUserAccount(email, password, mode);
      state.currentUserEmail = user.email;
      els.authStatus.textContent = "Server backup is offline, but browser login is ready.";
    } else {
      els.authStatus.textContent = "Unable to authenticate. Check the server and try again.";
      return;
    }
  }

  els.authPasswordInput.value = "";
  saveSession(state.currentUserEmail);
  addSystemLog(mode === "create" ? "Account created" : "User logged in", state.currentUserEmail, "auth", state.currentUserEmail);
  saveState();
  renderAll();
  go("trips");
}

function logout() {
  const previousUser = state.currentUserEmail;
  addSystemLog("User logged out", previousUser, "auth", previousUser);
  state.currentUserEmail = "";
  state.tripDraft = null;
  state.creatingTrip = false;
  state.editingId = null;
  state.splitDraft = null;
  localStorage.removeItem(sessionKey);
  els.authPasswordInput.value = "";
  els.authEmailInput.value = "";
  els.authStatus.textContent = "Logged out. Login or create another account.";
  saveState();
  renderAll();
  go("auth");
}

async function hydrateBackup() {
  const local = loadRawState();
  try {
    const response = await fetch("/api/backup", { cache: "no-store" });
    if (!response.ok) return;
    const result = await response.json();
    const remote = result.state || result;
    if (stateScore(remote) >= stateScore(local)) {
      Object.assign(state, normalizeState(remote));
      rebuildCategoryMap();
    }
  } catch {
    // Static-file mode still works with localStorage.
  }
}

async function changePassword() {
  const email = owner().email;
  const oldPassword = els.changePasswordOld?.value.trim() || "";
  const newPassword = els.changePasswordNew?.value.trim() || "";
  if (!oldPassword || !newPassword) {
    if (els.changePasswordStatus) els.changePasswordStatus.textContent = "Enter current and new password.";
    return;
  }
  if (owner().password && owner().password !== oldPassword) {
    if (els.changePasswordStatus) els.changePasswordStatus.textContent = "Current password is incorrect.";
    return;
  }
  try {
    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, oldPassword, newPassword, csv: buildAllCsv(), accountsCsv: buildAccountsCsv() }),
    });
    const result = await response.json();
    if (!response.ok) {
      if (els.changePasswordStatus) els.changePasswordStatus.textContent = result.error || "Unable to change password.";
      return;
    }
    Object.assign(state, normalizeState(result.state || snapshotState()));
    rebuildCategoryMap();
  } catch {
    owner().password = newPassword;
  }
  if (els.changePasswordOld) els.changePasswordOld.value = "";
  if (els.changePasswordNew) els.changePasswordNew.value = "";
  if (els.changePasswordStatus) els.changePasswordStatus.textContent = "Password updated.";
  addSystemLog("Password changed", email, "security");
  saveState();
  renderAccount();
}

async function deleteAccount() {
  const email = owner().email;
  const password = prompt("Enter your password to permanently delete this account:");
  if (!password) return;
  if (owner().password && owner().password !== password.trim()) {
    alert("Password is incorrect.");
    return;
  }
  if (!confirm(`Delete account ${email}? Expenses linked to this user will be removed.`)) return;
  try {
    const response = await fetch("/api/delete-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: password.trim(), csv: buildAllCsv(), accountsCsv: buildAccountsCsv() }),
    });
    const result = await response.json();
    if (!response.ok) {
      alert(result.error || "Unable to delete account.");
      return;
    }
    Object.assign(state, normalizeState(result.state || snapshotState()));
    rebuildCategoryMap();
  } catch {
    state.users = state.users.filter((user) => user.email !== email);
    state.trips.forEach((trip) => {
      trip.entries = trip.entries.filter((entry) => normalizeEmail(entry.user) !== email && normalizeEmail(entry.split?.paidBy) !== email);
    });
    if (!state.users.length) state.users.push(defaultUser());
  }
  addSystemLog("Account deleted", email, "security");
  logout();
  persistRender();
}

function ensureUserAccount(email, password, mode = "create") {
  const cleanEmail = normalizeEmail(email);
  let user = findUser(cleanEmail);
  if (!user && mode === "create") {
    const anonymous = state.users.find((item) => item.email === "anonymous@example.com" && !item.password);
    if (anonymous) {
      migrateUserReferences(anonymous.email, cleanEmail);
      migrateUserReferences(anonymous.name || "Anonymous User", cleanEmail);
      anonymous.email = cleanEmail;
      anonymous.name = nameFromEmail(cleanEmail);
      user = anonymous;
    }
  }
  if (!user) {
    user = defaultUser(cleanEmail, password);
    state.users.push(user);
  }
  user.password = password;
  return user;
}

function migrateUserReferences(fromEmail, toEmail) {
  state.trips.forEach((trip) => {
    trip.entries.forEach((entry) => {
      if (entry.user === fromEmail) entry.user = toEmail;
      if (entry.userEmail === fromEmail) entry.userEmail = toEmail;
      if (entry.split?.paidBy === fromEmail) entry.split.paidBy = toEmail;
      if (entry.split?.participants) entry.split.participants = entry.split.participants.map((item) => item === fromEmail ? toEmail : item);
      if (entry.split?.values?.[fromEmail] !== undefined) {
        entry.split.values[toEmail] = entry.split.values[fromEmail];
        delete entry.split.values[fromEmail];
      }
    });
  });
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(sessionKey));
  } catch {
    return null;
  }
}

function saveSession(email) {
  localStorage.setItem(sessionKey, JSON.stringify({ email: normalizeEmail(email), at: new Date().toISOString() }));
}

function stateScore(raw) {
  if (!raw) return 0;
  const trips = raw.trips || [];
  const entries = trips.reduce((sum, trip) => sum + (trip.entries?.length || 0), 0);
  return trips.length * 10 + entries;
}

function loadRawState() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

function normalizeState(saved) {
  const user = normalizeUser(saved?.users?.[0]) || defaultUser();
  const users = saved?.users?.length ? saved.users.map(normalizeUser).filter(Boolean) : [user];
  const trips = saved?.trips?.length ? saved.trips.map((trip) => normalizeTrip(trip, users[0].email)) : [sampleTrip(users[0].email)];
  const activeTripId = trips.some((trip) => trip.id === saved?.activeTripId) ? saved.activeTripId : trips[0].id;
  const savedSettings = saved?.settings || {};
  const wallpapers = Array.isArray(savedSettings.wallpapers) ? savedSettings.wallpapers.filter((item) => item?.url) : [];
  if (savedSettings.wallpaperImage?.url && !wallpapers.some((item) => item.id === savedSettings.wallpaperImage.id)) {
    wallpapers.push({ ...savedSettings.wallpaperImage, id: savedSettings.wallpaperImage.id || crypto.randomUUID(), name: savedSettings.wallpaperImage.name || "Uploaded wallpaper" });
  }
  const activeWallpaperId = wallpapers.some((item) => item.id === savedSettings.activeWallpaperId)
    ? savedSettings.activeWallpaperId
    : wallpapers[0]?.id || "";
  return {
    activeTripId,
    currentUserEmail: normalizeEmail(saved?.currentUserEmail || ""),
    users,
    trips,
    systemLogs: Array.isArray(saved?.systemLogs) ? saved.systemLogs.slice(0, 300) : [],
    settings: {
      theme: savedSettings.theme || "midnight",
      wallpaper: activeWallpaperId ? "custom" : "none",
      wallpaperImage: wallpapers.find((item) => item.id === activeWallpaperId) || null,
      wallpapers,
      activeWallpaperId,
      homeCurrency: normalizeCurrency(savedSettings.homeCurrency || saved?.trips?.[0]?.currency || { code: "INR" }),
      fontFamily: savedSettings.fontFamily || "inter",
      fontSize: Number(savedSettings.fontSize || defaultFontSize),
      autoLocation: savedSettings.autoLocation !== false,
      displayCurrency: savedSettings.displayCurrency || "",
      customCategories: Array.isArray(savedSettings.customCategories) ? savedSettings.customCategories : [],
      categoryOrder: Array.isArray(savedSettings.categoryOrder) ? savedSettings.categoryOrder : [],
      categoryOverrides: savedSettings.categoryOverrides || {},
      exchangeRatesCache: savedSettings.exchangeRatesCache || null,
    },
  };
}

function normalizeUser(user) {
  if (!user) return null;
  const email = normalizeEmail(user.email || "anonymous@example.com");
  return {
    id: user.id || crypto.randomUUID(),
    name: user.name || nameFromEmail(email),
    email,
    password: user.password || "",
    profilePhoto: user.profilePhoto || null,
    countryCode: user.countryCode || "",
    phone: String(user.phone || "").replace(/\D/g, ""),
  };
}

function normalizeTrip(trip, userName) {
  const tripCurrency = normalizeCurrency(trip.currency);
  return {
    id: trip.id || crypto.randomUUID(),
    name: trip.name || "Untitled Trip",
    startDate: trip.startDate || today(),
    endDate: trip.endDate || trip.startDate || today(),
    currency: tripCurrency,
    dailyBudget: Number(trip.dailyBudget || 0),
    photo: trip.photo || null,
    entries: (trip.entries || []).map((entry) => normalizeEntry(entry, userName, tripCurrency)),
  };
}

function normalizeEntry(entry, userName, fallbackCurrency = { code: "INR" }) {
  const cat = categoryMap[entry.category] || categoryMap.Transportation;
  const invoices = entry.invoices || (entry.invoiceNames || []).map((name) => ({ id: crypto.randomUUID(), name, url: "", path: null }));
  const rawUser = entry.userEmail || entry.user || userName;
  const userKey = isEmail(normalizeEmail(rawUser)) ? normalizeEmail(rawUser) : normalizeEmail(userName);
  const currency = normalizeCurrency(entry.currency || { code: entry.currencyCode || fallbackCurrency.code });
  return {
    id: entry.id || crypto.randomUUID(),
    name: entry.name || entry.category || "Expense",
    category: entry.category || "Transportation",
    payment: entry.payment || "Credit Card",
    country: entry.country || "India",
    location: entry.location || "Unknown place",
    latitude: entry.latitude || null,
    longitude: entry.longitude || null,
    date: entry.date || today(),
    user: userKey,
    userEmail: userKey,
    split: normalizeSplit(entry.split, userKey),
    amount: Number(entry.amount || 0),
    currency,
    currencyCode: currency.code,
    invoices,
    invoiceNames: invoices.map((file) => file.name),
    excludeMetrics: Boolean(entry.excludeMetrics),
    refund: Boolean(entry.refund),
    icon: categoryImageFor(entry.category, entry.icon || cat.icon),
    color: entry.color || cat.color,
  };
}

function normalizeCurrency(currency) {
  const code = String(typeof currency === "string" ? currency : currency?.code || "INR").toUpperCase();
  const symbol = currency?.symbol && !currency.symbol.includes("â") ? currency.symbol : currencySymbol(code);
  return { code, symbol, label: `${code} (${symbol})` };
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(snapshotState()));
  queueBackupSync();
}

function snapshotState() {
  return {
    activeTripId: state.activeTripId,
    currentUserEmail: state.currentUserEmail,
    users: state.users,
    trips: state.trips,
    systemLogs: state.systemLogs || [],
    settings: state.settings,
  };
}

function queueBackupSync() {
  clearTimeout(backupTimer);
  backupTimer = setTimeout(() => syncBackup(false), 800);
}

async function syncBackup(manual) {
  try {
    await ensureExchangeRates();
    const response = await fetch("/api/backup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state: snapshotState(),
        csv: buildAllCsv(),
        accountsCsv: buildAccountsCsv(),
        exchangeRatesCsv: buildExchangeRatesCsv(),
      }),
    });
    if (!response.ok) throw new Error("Backup endpoint unavailable");
    const result = await response.json();
    if (els.backupStatus) els.backupStatus.textContent = `Backup saved: ${result.csvPath}`;
    return true;
  } catch {
    if (els.backupStatus) els.backupStatus.textContent = manual ? "Start the Node server to save backup files." : "Browser backup active. Folder backup waits for server.";
    return false;
  }
}

function buildAllCsv() {
  const convertedCodes = ["USD", "EUR", "GBP", "AUD", "CAD", "SGD", "AED", "JPY", "CNY", "CHF", "THB", "MYR"];
  const rows = [[
    "Trip", "Trip Start", "Trip End", "Date", "Name", "Category", "Amount", "Currency", "Payment", "Country", "Location",
    "Latitude", "Longitude", "Paid By", "Paid By Email", "Participants", "User Shares", "Split", "Refund", "Exclude Metrics", "Invoices",
    ...convertedCodes.flatMap((code) => [`Amount ${code}`, `Viewer Share ${code}`]),
    "Account Name", "Account Email"
  ]];
  state.trips.forEach((trip) => {
    const account = owner();
    const base = normalizeCurrency(state.settings.homeCurrency || trip.currency).code;
    trip.entries.forEach((entry) => {
      const entryCurrency = entryCurrencyCode(entry, trip);
      const amount = signedAmount(entry);
      const share = entryMetricAmount(entry, state.currentUserEmail || owner().email, trip);
      const converted = Object.fromEntries(convertedCodes.map((code) => [code, convertAmount(share, base, code)]));
      rows.push([
        trip.name, trip.startDate, trip.endDate, entry.date, entry.name, entry.category, amount, entryCurrency,
        entry.payment, entry.country, entry.location, entry.latitude || "", entry.longitude || "", userLabel(entry.user), entry.user,
        normalizeSplit(entry.split, entry.user).participants.map(userLabel).join("; "),
        splitAllocations(entry).map((row) => `${userLabel(row.user)}: ${formatMoney(row.amount, 2, trip, entryCurrency)}`).join("; "),
        splitLabel(entry.split), entry.refund ? "Yes" : "No", entry.excludeMetrics ? "Yes" : "No",
        entry.invoices?.length ? "Invoice attached" : "",
        ...convertedCodes.flatMap((code) => [formatNumber(converted[code]), formatNumber(convertAmount(amount, entryCurrency, code))]),
        account.name, account.email
      ]);
    });
  });
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function buildExchangeRatesCsv() {
  const cache = state.settings.exchangeRatesCache;
  if (!cache?.base || !cache?.rates) return "";
  const rows = [["Base", "Target", "Rate", "Fetched At"]];
  Object.entries(cache.rates).forEach(([target, rate]) => rows.push([cache.base, target, rate, cache.fetchedAt || ""]));
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function renderDisplayCurrencyOptions() {
  if (!els.displayCurrencySelect) return;
  const home = normalizeCurrency(state.settings.homeCurrency || activeTrip().currency);
  const current = state.settings.displayCurrency || "";
  const options = [{ value: "", label: `Home currency (${home.code})` }];
  currencyCodes.forEach((code) => {
    if (code !== home.code) options.push({ value: code, label: `${code} (${currencySymbol(code)})` });
  });
  els.displayCurrencySelect.innerHTML = options.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("");
  els.displayCurrencySelect.value = options.some((option) => option.value === current) ? current : "";
}

async function ensureExchangeRates() {
  const base = "USD";
  const cache = state.settings.exchangeRatesCache;
  const fresh = cache?.base === base && cache?.provider === "open.er-api" && cache?.fetchedAt && Date.now() - Date.parse(cache.fetchedAt) < exchangeRateTtlMs;
  if (fresh && cache.rates) return cache.rates;
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!response.ok) throw new Error("Rate fetch failed");
    const payload = await response.json();
    if (!payload?.rates) throw new Error("Rate payload missing");
    state.settings.exchangeRatesCache = { base, provider: "open.er-api", rates: payload.rates || {}, fetchedAt: payload.time_last_update_utc || new Date().toISOString() };
    saveState();
    return state.settings.exchangeRatesCache.rates;
  } catch {
    return cache?.rates || {};
  }
}

function convertAmount(amount, fromCode, toCode, trip = activeTrip()) {
  const value = Number(amount || 0);
  const home = normalizeCurrency(state.settings.homeCurrency || trip.currency);
  const from = normalizeCurrency({ code: fromCode || home.code }).code;
  const to = normalizeCurrency({ code: toCode || from }).code;
  if (!value || from === to) return value;
  const cache = state.settings.exchangeRatesCache;
  if (!cache?.rates) return value;
  const rates = cache.rates;
  if (from === "USD" && rates[to]) return value * rates[to];
  if (to === "USD" && rates[from]) return value / rates[from];
  if (rates[from] && rates[to]) return (value / rates[from]) * rates[to];
  return value;
}

function displayCurrencyCode(trip = activeTrip()) {
  return state.settings.displayCurrency || normalizeCurrency(state.settings.homeCurrency || trip.currency).code;
}

function displayCurrencySymbol(trip = activeTrip()) {
  const code = displayCurrencyCode(trip);
  const home = normalizeCurrency(state.settings.homeCurrency || trip.currency);
  return code === home.code ? home.symbol : currencySymbol(code);
}

function buildAccountsCsv() {
  const rows = [["Name", "Email ID", "Password", "Profile Picture"]];
  state.users.forEach((user) => {
    rows.push([user.name, user.email, user.password || "", user.profilePhoto?.path || user.profilePhoto?.url || ""]);
  });
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function makeSplit(mode, paidBy, participants = participantKeys(), values = {}) {
  return { mode, paidBy, participants, values };
}

function normalizeSplit(split, fallbackUser) {
  const paidBy = safeResolveUserKey(split?.paidBy || fallbackUser, fallbackUser);
  const fallbackParticipants = split?.participants?.length ? split.participants : [paidBy];
  const participants = fallbackParticipants.map((name) => safeResolveUserKey(name, paidBy));
  const values = {};
  Object.entries(split?.values || {}).forEach(([key, value]) => {
    values[safeResolveUserKey(key, paidBy)] = value;
  });
  return split?.mode ? {
    mode: split.mode === "amount" ? "amount" : "equal",
    paidBy,
    participants: participants.length ? participants : [paidBy],
    values,
  } : makeSplit("equal", paidBy, [paidBy]);
}

function ensureSplitDraft() {
  if (!state.splitDraft) state.splitDraft = makeSplit("equal", els.userInput.value || owner().email, participantKeys());
}

function splitLabel(split) {
  const item = normalizeSplit(split, owner().email);
  const paid = item.paidBy === owner().email ? "you" : userLabel(item.paidBy);
  const mode = item.mode === "amount" ? "amount wise" : "equally";
  return `Paid by ${paid} and split ${mode} with ${item.participants.length} user${item.participants.length === 1 ? "" : "s"}.`;
}

function choiceMatches(id, paidBy, other) {
  const draft = state.splitDraft;
  if (id === "you_equal") return draft.mode === "equal" && draft.paidBy === paidBy;
  if (id === "other_equal") return draft.mode === "equal" && draft.paidBy === other;
  return false;
}

function participantNames() {
  return participantKeys();
}

function participantKeys() {
  return state.users.map((user) => user.email);
}

function selectedParticipantKeys() {
  ensureSplitDraft();
  const participants = state.splitDraft.participants?.length ? state.splitDraft.participants : participantKeys();
  return participants.map(resolveUserKey).filter(Boolean);
}

function avatar(name) {
  const label = userLabel(name);
  return `<span class="avatar" style="background:${userColor(name)}">${escapeHtml(label.slice(0, 1).toUpperCase())}</span>`;
}

function userColor(name) {
  const index = Math.abs([...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % palette.length;
  return palette[index];
}

function groupByMetric(entries, key) {
  const map = new Map();
  entries.forEach((entry) => {
    const label = key === "user" ? userLabel(entry[key]) : entry[key];
    const color = key === "category" ? categoryMap[entry.category]?.color : undefined;
    const current = map.get(label) || { label, amount: 0, color };
    current.amount += entryMetricAmount(entry);
    map.set(label, current);
  });
  return Array.from(map.values()).sort((a, b) => b.amount - a.amount);
}

function groupByDateMetric(entries) {
  const map = new Map();
  entries.forEach((entry) => map.set(entry.date, (map.get(entry.date) || 0) + entryMetricAmount(entry)));
  return Array.from(map, ([label, amount]) => ({ label, amount })).sort((a, b) => a.label.localeCompare(b.label));
}

function groupByUserShares(entries) {
  const viewer = normalizeEmail(state.currentUserEmail || owner().email);
  const map = new Map();
  entries.forEach((entry) => {
    const amount = entryMetricAmount(entry, viewer);
    if (!amount) return;
    const label = userLabel(viewer);
    map.set(label, (map.get(label) || 0) + amount);
  });
  return Array.from(map, ([label, amount]) => ({ label, amount })).sort((a, b) => b.amount - a.amount);
}

function splitAllocations(entry) {
  const split = normalizeSplit(entry.split, entry.user);
  const amount = signedAmount(entry);
  if (split.mode === "amount") {
    const rows = Object.entries(split.values || {}).map(([user, value]) => ({ user, amount: entry.refund ? -parseAmount(value) : parseAmount(value) }));
    return rows.length ? rows : [{ user: entry.user, amount }];
  }
  const participants = split.participants?.length ? split.participants : [entry.user];
  const share = participants.length ? amount / participants.length : amount;
  return participants.map((user) => ({ user, amount: share }));
}

function metricEntries(trip = activeTrip()) {
  return trip.entries.filter((entry) => !entry.excludeMetrics);
}

function homeCurrencyCode(trip = activeTrip()) {
  return normalizeCurrency(state.settings.homeCurrency || trip.currency).code;
}

function entryCurrencyCode(entry, trip = activeTrip()) {
  return normalizeCurrency(entry.currency || { code: entry.currencyCode || trip.currency?.code || homeCurrencyCode(trip) }).code;
}

function entryHomeAmount(entry, trip = activeTrip()) {
  return convertAmount(signedAmount(entry), entryCurrencyCode(entry, trip), homeCurrencyCode(trip), trip);
}

function allocationHomeAmount(entry, amount, trip = activeTrip()) {
  return convertAmount(amount, entryCurrencyCode(entry, trip), homeCurrencyCode(trip), trip);
}

function entryMetricAmount(entry, viewerEmail = state.currentUserEmail || owner().email, trip = activeTrip()) {
  const viewer = normalizeEmail(viewerEmail);
  const allocations = splitAllocations(entry);
  const mine = allocations.find((row) => normalizeEmail(row.user) === viewer);
  if (!mine) return 0;
  const split = normalizeSplit(entry.split, entry.user);
  const paidByViewer = normalizeEmail(split.paidBy) === viewer;
  const alone = (split.participants || []).length <= 1;
  const fullAmount = signedAmount(entry);
  const fullShare = Math.abs(Math.abs(mine.amount) - Math.abs(fullAmount)) < 0.01;
  if (paidByViewer && (alone || fullShare)) return allocationHomeAmount(entry, fullAmount, trip);
  return allocationHomeAmount(entry, mine.amount, trip);
}

function signedAmount(entry) {
  return entry.refund ? -entry.amount : entry.amount;
}

function tripDays(trip = activeTrip()) {
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 1;
  return Math.max(1, Math.round((end - start) / 86400000) + 1);
}

function fillSelect(select, values, blankLabel = "") {
  const previous = select.value;
  select.innerHTML = values.map((value, index) => {
    const label = index === 0 && value === "" ? blankLabel : value;
    return `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
  }).join("");
  if (values.includes(previous)) select.value = previous;
}

function fillSelectOptions(select, options) {
  const previous = select.value;
  select.innerHTML = options.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("");
  if (options.some((option) => option.value === previous)) select.value = previous;
}

function applyAppearance() {
  document.body.dataset.theme = state.settings.theme;
  const wallpaper = activeWallpaper();
  document.body.dataset.wallpaper = wallpaper ? "custom" : "none";
  document.documentElement.style.fontSize = `${state.settings.fontSize || defaultFontSize}px`;
  document.body.style.fontFamily = fontStacks[state.settings.fontFamily] || fontStacks.inter;
  if (wallpaper?.url) {
    state.settings.wallpaperImage = wallpaper;
    state.settings.wallpaper = "custom";
    document.body.style.setProperty("--custom-wallpaper", `url('${cssUrl(wallpaper.url)}')`);
  } else {
    state.settings.wallpaperImage = null;
    state.settings.wallpaper = "none";
    document.body.style.removeProperty("--custom-wallpaper");
  }
}

function defaultUser(email = "anonymous@example.com", password = "") {
  const cleanEmail = normalizeEmail(email) || "anonymous@example.com";
  return { id: crypto.randomUUID(), name: nameFromEmail(cleanEmail), email: cleanEmail, password, profilePhoto: null, countryCode: "", phone: "" };
}

function sampleTrip(userName = "anonymous@example.com") {
  const userKey = isEmail(normalizeEmail(userName)) ? normalizeEmail(userName) : "anonymous@example.com";
  return {
    id: crypto.randomUUID(),
    name: "Vietnam",
    startDate: today(),
    endDate: today(),
    currency: { code: "INR", symbol: "\u20b9", label: "INR (\u20b9)" },
    dailyBudget: 55,
    photo: null,
    entries: [{
      id: crypto.randomUUID(),
      name: "Bus",
      category: "Transportation",
      payment: "Credit Card",
      country: "India",
      location: "Bengaluru",
      latitude: null,
      longitude: null,
      date: today(),
      user: userKey,
      userEmail: userKey,
      split: { mode: "equal", paidBy: userKey, participants: [userKey], values: {} },
      amount: 55,
      currency: { code: "INR", symbol: "\u20b9", label: "INR (\u20b9)" },
      currencyCode: "INR",
      invoices: [],
      invoiceNames: [],
      excludeMetrics: false,
      refund: false,
      icon: defaultCategoryIconMap.Transportation,
      color: "#f87500",
    }],
  };
}

function currencySymbol(code) {
  const map = { INR: "\u20b9", USD: "$", EUR: "\u20ac", GBP: "\u00a3", JPY: "\u00a5", CNY: "\u00a5", AUD: "A$", CAD: "C$", SGD: "S$", AED: "AED" };
  return map[code] || code;
}

function pickColor(index) {
  return palette[index % palette.length];
}

function parseAmount(value) {
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
}

function sumValues(values) {
  return Object.values(values || {}).reduce((sum, value) => sum + parseAmount(value), 0);
}

function formatMoney(value, decimals = 2, trip = activeTrip(), fromCode = null) {
  const code = displayCurrencyCode(trip);
  const home = normalizeCurrency(state.settings.homeCurrency || trip.currency);
  const converted = convertAmount(value, fromCode || home.code, code, trip);
  return `${displayCurrencySymbol(trip)}${formatNumber(converted, decimals)}`;
}

function formatCurrencyAmount(value, currency, decimals = 2) {
  const normalized = normalizeCurrency(currency);
  return `${normalized.symbol}${formatNumber(value, decimals)}`;
}

function formatNumber(value, decimals = 2) {
  return Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return date.toLocaleDateString("en-GB");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function findUser(value) {
  const key = normalizeEmail(value);
  return state.users.find((user) => normalizeEmail(user.email) === key || user.name.toLowerCase() === String(value || "").trim().toLowerCase()) || null;
}

function resolveUserKey(value) {
  const existing = findUser(value);
  if (existing) return existing.email;
  const email = normalizeEmail(value);
  return isEmail(email) ? email : normalizeEmail(owner()?.email || email);
}

function safeResolveUserKey(value, fallback = "") {
  const email = normalizeEmail(value);
  if (isEmail(email)) return email;
  try {
    const existing = findUser(value);
    if (existing) return existing.email;
  } catch {
    // State may still be initializing.
  }
  const fallbackEmail = normalizeEmail(fallback);
  return isEmail(fallbackEmail) ? fallbackEmail : email;
}

function userLabel(value) {
  const existing = findUser(value);
  return existing?.name || nameFromEmail(value);
}

function nameFromEmail(email) {
  const base = String(email || "user").split("@")[0].replace(/[._-]+/g, " ").trim();
  return base ? base.replace(/\b\w/g, (char) => char.toUpperCase()) : "User";
}

function cleanUploadName(name) {
  return String(name || "upload.jpg").replace(/^\d{14}-/, "").replace(/[^a-z0-9._-]+/gi, "_").replace(/^_+|_+$/g, "") || "upload.jpg";
}

function cssUrl(value) {
  return String(value || "").replace(/['"\\]/g, "");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

bootstrap();
