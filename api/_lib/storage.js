const fs = require("fs").promises;
const path = require("path");

const dataDir =
  process.env.BAZICHART_DATA_DIR ||
  (process.env.VERCEL ? "/tmp/bazichart-data" : path.join(process.cwd(), "data"));
const settingsPath = path.join(dataDir, "admin-settings.json");
const ordersPath = path.join(dataDir, "orders.json");
const memoryStore = new Map();

const defaultSettings = {
  paypal: {
    enabled: true,
    mode: "sandbox",
    clientId: "",
    clientSecret: "",
    currency: "USD",
    amount: "9.99",
    intent: "CAPTURE",
  },
};

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJson(filePath, fallback) {
  if (memoryStore.has(filePath)) {
    return memoryStore.get(filePath);
  }

  await ensureDataDir();
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    memoryStore.set(filePath, parsed);
    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") {
      memoryStore.set(filePath, fallback);
      try {
        await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8");
      } catch (writeError) {
        return fallback;
      }
      return fallback;
    }
    throw error;
  }
}

async function writeJson(filePath, value) {
  memoryStore.set(filePath, value);
  try {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
  } catch (error) {
    if (error && (error.code === "EROFS" || error.code === "EACCES" || error.code === "EPERM")) {
      return value;
    }
    throw error;
  }
  return value;
}

async function getSettings() {
  return readJson(settingsPath, defaultSettings);
}

async function saveSettings(next) {
  return writeJson(settingsPath, next);
}

async function getOrders() {
  return readJson(ordersPath, []);
}

async function saveOrders(next) {
  return writeJson(ordersPath, next);
}

module.exports = {
  getSettings,
  saveSettings,
  getOrders,
  saveOrders,
};
