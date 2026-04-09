const fs = require("fs").promises;
const path = require("path");

const dataDir = path.join(process.cwd(), "data");
const settingsPath = path.join(dataDir, "admin-settings.json");
const ordersPath = path.join(dataDir, "orders.json");

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
  await ensureDataDir();
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf8");
      return fallback;
    }
    throw error;
  }
}

async function writeJson(filePath, value) {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
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
