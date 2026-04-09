const TOKEN_KEY = "bazichart_admin_token";

const loginPanel = document.getElementById("login-panel");
const dashboardPanel = document.getElementById("dashboard-panel");
const logoutButton = document.getElementById("logout-button");

const loginForm = document.getElementById("login-form");
const adminEmail = document.getElementById("admin-email");
const adminPassword = document.getElementById("admin-password");
const loginError = document.getElementById("login-error");

const settingsForm = document.getElementById("settings-form");
const refreshSettingsButton = document.getElementById("refresh-settings");
const saveSettingsButton = document.getElementById("save-settings");
const settingsOk = document.getElementById("settings-ok");
const settingsError = document.getElementById("settings-error");

const refreshOrdersButton = document.getElementById("refresh-orders");
const ordersError = document.getElementById("orders-error");
const ordersBody = document.getElementById("orders-table-body");

const fields = {
  enabled: document.getElementById("paypal-enabled"),
  mode: document.getElementById("paypal-mode"),
  clientId: document.getElementById("paypal-client-id"),
  clientSecret: document.getElementById("paypal-client-secret"),
  currency: document.getElementById("paypal-currency"),
  amount: document.getElementById("paypal-amount"),
  intent: document.getElementById("paypal-intent"),
};

function getToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY) || "";
  } catch (error) {
    return "";
  }
}

function setToken(token) {
  try {
    if (!token) {
      window.localStorage.removeItem(TOKEN_KEY);
      return;
    }
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    return;
  }
}

function toggleVisibility(node, show) {
  if (!node) return;
  node.classList.toggle("hidden", !show);
}

function showMessage(node, message) {
  if (!node) return;
  node.textContent = message || "";
  toggleVisibility(node, Boolean(message));
}

function normalizeErrorMessage(error) {
  const raw = String(error?.message || "").toLowerCase();
  if (raw.includes("failed to fetch") || raw.includes("networkerror")) {
    return "Cannot reach /api. Please run with a local/dev server (not file://), and verify CSP/deployment headers.";
  }
  return error?.message || "Request failed";
}

function showDashboard() {
  toggleVisibility(loginPanel, false);
  toggleVisibility(dashboardPanel, true);
  toggleVisibility(logoutButton, true);
}

function showLogin() {
  toggleVisibility(loginPanel, true);
  toggleVisibility(dashboardPanel, false);
  toggleVisibility(logoutButton, false);
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

async function apiRequest(path, options = {}, withAuth = true) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (withAuth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  const response = await fetch(path, {
    ...options,
    headers,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false) {
    const message = data.error || data.details || `Request failed: ${response.status}`;
    throw new Error(message);
  }
  return data;
}

function fillSettings(settings) {
  const paypal = settings?.paypal || {};
  fields.enabled.value = paypal.enabled === false ? "false" : "true";
  fields.mode.value = paypal.mode === "live" ? "live" : "sandbox";
  fields.clientId.value = paypal.clientId || "";
  fields.clientSecret.value = paypal.clientSecret || "";
  fields.currency.value = paypal.currency || "USD";
  fields.amount.value = paypal.amount || "9.99";
  fields.intent.value = paypal.intent || "CAPTURE";
}

function buildSettingsPayload() {
  return {
    paypal: {
      enabled: fields.enabled.value === "true",
      mode: fields.mode.value === "live" ? "live" : "sandbox",
      clientId: fields.clientId.value.trim(),
      clientSecret: fields.clientSecret.value.trim(),
      currency: fields.currency.value.trim().toUpperCase() || "USD",
      amount: fields.amount.value.trim() || "9.99",
      intent: fields.intent.value.trim().toUpperCase() || "CAPTURE",
    },
  };
}

function renderOrders(orders) {
  if (!ordersBody) return;
  if (!Array.isArray(orders) || orders.length === 0) {
    ordersBody.innerHTML = `
      <tr>
        <td class="px-3 py-3 text-muted" colspan="6">No orders yet.</td>
      </tr>
    `;
    return;
  }

  ordersBody.innerHTML = orders
    .map((order) => {
      const amount = order.amount && order.currency ? `${order.amount} ${order.currency}` : "-";
      const email = order.payerEmail || "-";
      const created = formatDateTime(order.createdAt || order.updatedAt);
      return `
        <tr class="rounded-lg bg-[#151723] text-text">
          <td class="px-3 py-3 text-xs">${order.id || "-"}</td>
          <td class="px-3 py-3 text-xs">${order.status || "-"}</td>
          <td class="px-3 py-3 text-xs">${amount}</td>
          <td class="px-3 py-3 text-xs">${order.mode || "-"}</td>
          <td class="px-3 py-3 text-xs">${email}</td>
          <td class="px-3 py-3 text-xs">${created}</td>
        </tr>
      `;
    })
    .join("");
}

async function loadSettings() {
  showMessage(settingsOk, "");
  showMessage(settingsError, "");
  try {
    const data = await apiRequest("/api/admin/settings");
    fillSettings(data.settings);
  } catch (error) {
    showMessage(settingsError, normalizeErrorMessage(error));
    if (String(error.message).toLowerCase().includes("unauthorized")) {
      setToken("");
      showLogin();
    }
  }
}

async function saveSettings() {
  showMessage(settingsOk, "");
  showMessage(settingsError, "");
  try {
    const payload = buildSettingsPayload();
    await apiRequest("/api/admin/settings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    showMessage(settingsOk, "Saved.");
  } catch (error) {
    showMessage(settingsError, normalizeErrorMessage(error));
  }
}

async function loadOrders() {
  showMessage(ordersError, "");
  try {
    const data = await apiRequest("/api/admin/orders");
    renderOrders(data.orders || []);
  } catch (error) {
    showMessage(ordersError, normalizeErrorMessage(error));
    if (String(error.message).toLowerCase().includes("unauthorized")) {
      setToken("");
      showLogin();
    }
  }
}

async function handleLogin(event) {
  event.preventDefault();
  showMessage(loginError, "");

  const email = adminEmail.value.trim();
  const password = adminPassword.value;

  if (!email || !password) {
    showMessage(loginError, "Please enter email and password.");
    return;
  }

  try {
    const data = await apiRequest(
      "/api/admin/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
      false
    );
    setToken(data.token);
    adminPassword.value = "";
    showDashboard();
    await Promise.all([loadSettings(), loadOrders()]);
  } catch (error) {
    showMessage(loginError, normalizeErrorMessage(error));
  }
}

function logout() {
  setToken("");
  showLogin();
}

function bindEvents() {
  loginForm?.addEventListener("submit", handleLogin);
  refreshSettingsButton?.addEventListener("click", loadSettings);
  saveSettingsButton?.addEventListener("click", saveSettings);
  settingsForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveSettings();
  });
  refreshOrdersButton?.addEventListener("click", loadOrders);
  logoutButton?.addEventListener("click", logout);
}

async function init() {
  bindEvents();

  if (window.location.protocol === "file:") {
    showLogin();
    showMessage(
      loginError,
      "This page is opened via file://, so /api is unavailable. Please run from a local/dev server."
    );
    return;
  }

  const token = getToken();
  if (!token) {
    showLogin();
    return;
  }

  showDashboard();
  await Promise.all([loadSettings(), loadOrders()]);
}

init();
