const http = require("http");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const root = path.resolve(__dirname);
const backupDir = path.join(root, "backup");
const mediaDir = path.join(root, "media");
const port = Number(process.env.PORT || 4175);
const host = process.env.HOST || "0.0.0.0";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".csv": "text/csv; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

ensureDir(backupDir);
ensureDir(path.join(mediaDir, "photos"));
ensureDir(path.join(mediaDir, "invoices"));
ensureDir(path.join(mediaDir, "profiles"));
ensureDir(path.join(mediaDir, "wallpapers"));

http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/media") {
      await handleMedia(req, res);
      return;
    }
    if (req.method === "POST" && req.url === "/api/backup") {
      await handleBackup(req, res);
      return;
    }
    if (req.method === "GET" && req.url === "/api/backup") {
      await handleBackupRead(req, res);
      return;
    }
    if (req.method === "POST" && req.url === "/api/auth") {
      await handleAuth(req, res);
      return;
    }
    if (req.method === "POST" && req.url === "/api/change-password") {
      await handleChangePassword(req, res);
      return;
    }
    if (req.method === "POST" && req.url === "/api/delete-account") {
      await handleDeleteAccount(req, res);
      return;
    }
    serveStatic(req, res);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
}).listen(port, host, () => {
  console.log(`AABudget running at http://127.0.0.1:${port}`);
  console.log(`LAN hosting enabled on http://<your-computer-ip>:${port}`);
});

async function handleMedia(req, res) {
  const body = await readJson(req);
  const allowed = new Set(["photos", "invoices", "profiles", "wallpapers"]);
  const kind = allowed.has(body.kind) ? body.kind : "invoices";
  const match = /^data:(.+?);base64,(.+)$/.exec(body.dataUrl || "");
  if (!match) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid media data" }));
    return;
  }

  const extension = extensionFor(body.fileName, match[1]);
  const safeName = safeFileName(body.fileName || `upload.${extension}`);
  const fileName = `${stamp()}-${safeName}`;
  const folder = path.join(mediaDir, kind);
  ensureDir(folder);
  const file = path.join(folder, fileName);
  const bytes = Buffer.from(match[2], "base64");
  await fs.promises.writeFile(file, bytes);

  sendJson(res, {
    name: body.fileName || fileName,
    path: path.relative(root, file),
    url: `/media/${kind}/${fileName}`,
    size: bytes.length,
  });
}

async function handleBackup(req, res) {
  const body = await readJson(req);
  ensureDir(backupDir);
  const jsonPath = path.join(backupDir, "app-data.json");
  const csvPath = path.join(backupDir, "all-data.csv");
  const accountsPath = path.join(backupDir, "accounts.csv");
  const ratesPath = path.join(backupDir, "exchange-rates.csv");
  const snapshotPath = path.join(backupDir, `${stamp()}-snapshot.json`);
  await fs.promises.writeFile(jsonPath, JSON.stringify(body.state || {}, null, 2));
  await fs.promises.writeFile(snapshotPath, JSON.stringify(body.state || {}, null, 2));
  await fs.promises.writeFile(csvPath, body.csv || "");
  await fs.promises.writeFile(accountsPath, body.accountsCsv || buildAccountsCsv(body.state || {}));
  if (body.exchangeRatesCsv) await fs.promises.writeFile(ratesPath, body.exchangeRatesCsv);
  sendJson(res, {
    ok: true,
    jsonPath: path.relative(root, jsonPath),
    csvPath: path.relative(root, csvPath),
    accountsPath: path.relative(root, accountsPath),
    ratesPath: path.relative(root, ratesPath),
    snapshotPath: path.relative(root, snapshotPath),
  });
}

async function handleBackupRead(req, res) {
  const jsonState = await readState();
  const csvText = await readTextFile(path.join(backupDir, "all-data.csv"));
  const accountsText = await readTextFile(path.join(backupDir, "accounts.csv"));
  const merged = mergeBackupSources(jsonState, csvText, accountsText);
  sendJson(res, { ok: true, state: merged, csvMtime: await fileMtime(path.join(backupDir, "all-data.csv")) });
}

async function handleAuth(req, res) {
  const body = await readJson(req);
  const mode = body.mode === "login" ? "login" : "create";
  const email = normalizeEmail(body.email);
  const password = String(body.password || "").trim();
  if (!isEmail(email) || !password) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Valid Email ID and password are required." }));
    return;
  }

  const clientState = body.state && typeof body.state === "object" ? body.state : {};
  let state = await readState();
  if (stateScore(clientState) > stateScore(state)) state = clientState;
  state.users = Array.isArray(state.users) ? state.users : [];
  state.trips = Array.isArray(state.trips) ? state.trips : [];
  state.settings = state.settings && typeof state.settings === "object" ? state.settings : {};
  if (body.accountsCsv) mergeAccountsCsv(state, body.accountsCsv);

  let user = state.users.find((item) => normalizeEmail(item.email) === email);
  if (mode === "login" && !user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Account not found. Create an account first." }));
    return;
  }
  if (mode === "create" && user?.password && user.password !== password) {
    res.writeHead(409, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Account already exists. Login instead." }));
    return;
  }
  if (mode === "login" && user?.password && user.password !== password) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Password does not match this Email ID." }));
    return;
  }

  if (!user) {
    const anonymous = state.users.find((item) => normalizeEmail(item.email) === "anonymous@example.com" && !item.password);
    if (anonymous && mode === "create") {
      migrateUserReferences(state, anonymous.email, email);
      anonymous.email = email;
      anonymous.name = nameFromEmail(email);
      user = anonymous;
    } else {
      user = { id: randomId(), name: nameFromEmail(email), email, password: "", profilePhoto: null, countryCode: "", phone: "" };
      state.users.push(user);
    }
  }

  user.password = password;
  state.currentUserEmail = email;
  await writeState(state, "", body.accountsCsv || buildAccountsCsv(state));
  sendJson(res, { ok: true, user, state });
}

async function handleChangePassword(req, res) {
  const body = await readJson(req);
  const email = normalizeEmail(body.email);
  const oldPassword = String(body.oldPassword || "").trim();
  const newPassword = String(body.newPassword || "").trim();
  if (!isEmail(email) || !oldPassword || !newPassword) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Email, current password, and new password are required." }));
    return;
  }
  const state = await readState();
  const user = (state.users || []).find((item) => normalizeEmail(item.email) === email);
  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Account not found." }));
    return;
  }
  if (user.password && user.password !== oldPassword) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Current password is incorrect." }));
    return;
  }
  user.password = newPassword;
  await writeState(state, body.csv || "", body.accountsCsv || buildAccountsCsv(state));
  sendJson(res, { ok: true, state });
}

async function handleDeleteAccount(req, res) {
  const body = await readJson(req);
  const email = normalizeEmail(body.email);
  const password = String(body.password || "").trim();
  if (!isEmail(email)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Valid Email ID is required." }));
    return;
  }
  const state = await readState();
  const user = (state.users || []).find((item) => normalizeEmail(item.email) === email);
  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Account not found." }));
    return;
  }
  if (user.password && user.password !== password) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Password is incorrect." }));
    return;
  }
  removeUserFromState(state, email);
  if (state.currentUserEmail === email) state.currentUserEmail = "";
  await writeState(state, body.csv || "", body.accountsCsv || buildAccountsCsv(state));
  sendJson(res, { ok: true, state });
}

function serveStatic(req, res) {
  let pathname = decodeURIComponent(req.url.split("?")[0]);
  if (pathname === "/") pathname = "/index.html";

  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

async function readState() {
  try {
    const file = path.join(backupDir, "app-data.json");
    return JSON.parse(await fs.promises.readFile(file, "utf8"));
  } catch {
    return {};
  }
}

async function readTextFile(file) {
  try {
    return await fs.promises.readFile(file, "utf8");
  } catch {
    return "";
  }
}

async function fileMtime(file) {
  try {
    const stat = await fs.promises.stat(file);
    return stat.mtimeMs;
  } catch {
    return 0;
  }
}

function mergeBackupSources(jsonState, csvText, accountsText) {
  let state = jsonState && typeof jsonState === "object" ? jsonState : {};
  state.users = Array.isArray(state.users) ? state.users : [];
  state.trips = Array.isArray(state.trips) ? state.trips : [];
  state.settings = state.settings && typeof state.settings === "object" ? state.settings : {};

  if (accountsText) mergeAccountsCsv(state, accountsText);
  if (csvText) mergeExpenseCsv(state, csvText);
  return state;
}

function mergeAccountsCsv(state, text) {
  const rows = parseCsv(text);
  if (rows.length < 2) return;
  const header = rows[0].map((cell) => cell.toLowerCase());
  const emailIndex = header.findIndex((cell) => cell.includes("email"));
  const nameIndex = header.findIndex((cell) => cell === "name");
  const passwordIndex = header.findIndex((cell) => cell.includes("password"));
  if (emailIndex < 0) return;

  rows.slice(1).forEach((row) => {
    const email = normalizeEmail(row[emailIndex]);
    if (!isEmail(email)) return;
    let user = state.users.find((item) => normalizeEmail(item.email) === email);
    if (!user) {
      user = { id: randomId(), name: nameFromEmail(email), email, password: "", profilePhoto: null };
      state.users.push(user);
    }
    if (nameIndex >= 0 && row[nameIndex]) user.name = row[nameIndex];
    if (passwordIndex >= 0 && row[passwordIndex]) user.password = row[passwordIndex];
  });
}

function mergeExpenseCsv(state, text) {
  const rows = parseCsv(text);
  if (rows.length < 2) return;
  const header = rows[0].map((cell) => cell.toLowerCase());
  const index = (name) => header.findIndex((cell) => cell.includes(name));
  const tripIndex = index("trip");
  const dateIndex = index("date");
  const nameIndex = index("name");
  const categoryIndex = index("category");
  const amountIndex = index("amount");
  const currencyIndex = index("currency");
  const paymentIndex = index("payment");
  const countryIndex = index("country");
  const locationIndex = index("location");
  const paidByIndex = index("paid by email");
  const refundIndex = index("refund");
  if (tripIndex < 0 || dateIndex < 0 || amountIndex < 0) return;

  const csvScore = rows.length - 1;
  const jsonScore = state.trips.reduce((sum, trip) => sum + (trip.entries?.length || 0), 0);
  if (csvScore <= jsonScore) return;

  const tripMap = new Map(state.trips.map((trip) => [String(trip.name || "").toLowerCase(), trip]));
  rows.slice(1).forEach((row) => {
    const tripName = row[tripIndex] || "Untitled Trip";
    const key = tripName.toLowerCase();
    let trip = tripMap.get(key);
    if (!trip) {
      trip = {
        id: randomId(),
        name: tripName,
        startDate: row[header.findIndex((cell) => cell.includes("trip start"))] || today(),
        endDate: row[header.findIndex((cell) => cell.includes("trip end"))] || today(),
        currency: { code: row[currencyIndex] || "INR", symbol: currencySymbol(row[currencyIndex] || "INR"), label: `${row[currencyIndex] || "INR"}` },
        dailyBudget: 0,
        photo: null,
        entries: [],
      };
      state.trips.push(trip);
      tripMap.set(key, trip);
    }
    const amount = Number(String(row[amountIndex] || "0").replace(/[^0-9.-]/g, "")) || 0;
    const entryName = nameIndex >= 0 ? row[nameIndex] : "Expense";
    const signature = `${row[dateIndex]}|${entryName}|${amount}`;
    const exists = trip.entries.some((entry) => `${entry.date}|${entry.name}|${entry.amount}` === signature);
    if (exists) return;
    const userEmail = paidByIndex >= 0 ? normalizeEmail(row[paidByIndex]) : state.users[0]?.email || "anonymous@example.com";
    trip.entries.push({
      id: randomId(),
      name: entryName,
      category: categoryIndex >= 0 ? row[categoryIndex] : "General",
      payment: paymentIndex >= 0 ? row[paymentIndex] : "Credit Card",
      country: countryIndex >= 0 ? row[countryIndex] : "India",
      location: locationIndex >= 0 ? row[locationIndex] : "Unknown place",
      date: row[dateIndex],
      user: userEmail,
      userEmail,
      split: { mode: "equal", paidBy: userEmail, participants: [userEmail], values: {} },
      amount: Math.abs(amount),
      invoices: [],
      invoiceNames: [],
      excludeMetrics: false,
      refund: refundIndex >= 0 ? String(row[refundIndex]).toLowerCase() === "yes" : amount < 0,
      icon: "GN",
      color: "#ffb21a",
    });
  });
}

function removeUserFromState(state, email) {
  const cleanEmail = normalizeEmail(email);
  state.users = (state.users || []).filter((user) => normalizeEmail(user.email) !== cleanEmail);
  (state.trips || []).forEach((trip) => {
    trip.entries = (trip.entries || []).filter((entry) => {
      const participants = entry.split?.participants || [];
      const touches = normalizeEmail(entry.user) === cleanEmail
        || normalizeEmail(entry.userEmail) === cleanEmail
        || normalizeEmail(entry.split?.paidBy) === cleanEmail
        || participants.some((item) => normalizeEmail(item) === cleanEmail);
      return !touches;
    });
  });
  if (!state.users.length) {
    state.users.push({ id: randomId(), name: "Anonymous User", email: "anonymous@example.com", password: "", profilePhoto: null });
  }
}

async function writeState(state, csv, accountsCsv) {
  ensureDir(backupDir);
  const jsonPath = path.join(backupDir, "app-data.json");
  const csvPath = path.join(backupDir, "all-data.csv");
  const accountsPath = path.join(backupDir, "accounts.csv");
  await fs.promises.writeFile(jsonPath, JSON.stringify(state || {}, null, 2));
  if (csv) await fs.promises.writeFile(csvPath, csv);
  await fs.promises.writeFile(accountsPath, accountsCsv || buildAccountsCsv(state || {}));
}

function buildAccountsCsv(state) {
  const rows = [["Name", "Email ID", "Password", "Profile Picture"]];
  (state.users || []).forEach((user) => {
    rows.push([user.name || nameFromEmail(user.email), normalizeEmail(user.email), user.password || "", user.profilePhoto?.path || user.profilePhoto?.url || ""]);
  });
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += char;
  }
  if (cell.length || row.length) {
    row.push(cell);
    if (row.some((value) => value !== "")) rows.push(row);
  }
  return rows;
}

function stateScore(state) {
  const trips = Array.isArray(state?.trips) ? state.trips : [];
  const entries = trips.reduce((sum, trip) => sum + (Array.isArray(trip.entries) ? trip.entries.length : 0), 0);
  return trips.length * 10 + entries;
}

function migrateUserReferences(state, fromEmail, toEmail) {
  (state.trips || []).forEach((trip) => {
    (trip.entries || []).forEach((entry) => {
      if (entry.user === fromEmail) entry.user = toEmail;
      if (entry.userEmail === fromEmail) entry.userEmail = toEmail;
      if (entry.split?.paidBy === fromEmail) entry.split.paidBy = toEmail;
      if (Array.isArray(entry.split?.participants)) {
        entry.split.participants = entry.split.participants.map((item) => item === fromEmail ? toEmail : item);
      }
      if (entry.split?.values?.[fromEmail] !== undefined) {
        entry.split.values[toEmail] = entry.split.values[fromEmail];
        delete entry.split.values[fromEmail];
      }
    });
  });
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 30 * 1024 * 1024) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, data) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extensionFor(fileName, mimeType) {
  const ext = path.extname(fileName || "").replace(".", "").toLowerCase();
  if (ext) return ext;
  const map = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
  return map[mimeType] || "bin";
}

function safeFileName(name) {
  return String(name).replace(/^\d{14}-/, "").replace(/[^a-z0-9._-]+/gi, "_").replace(/^_+|_+$/g, "") || "upload.bin";
}

function stamp() {
  return new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function nameFromEmail(email) {
  const base = String(email || "user").split("@")[0].replace(/[._-]+/g, " ").trim();
  return base ? base.replace(/\b\w/g, (char) => char.toUpperCase()) : "User";
}

function currencySymbol(code) {
  const map = { INR: "₹", USD: "$", EUR: "€", GBP: "£", JPY: "¥", CNY: "¥", AUD: "A$", CAD: "C$", SGD: "S$", AED: "AED" };
  return map[code] || code;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function randomId() {
  return randomUUID();
}
