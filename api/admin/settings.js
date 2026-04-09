const { parseBody, sendMethodNotAllowed } = require("../_lib/http");
const { requireAdmin } = require("../_lib/admin-auth");
const { getSettings, saveSettings } = require("../_lib/storage");

function sanitizeSettingsPatch(payload) {
  const patch = {};
  if (!payload || typeof payload !== "object") {
    return patch;
  }
  if (payload.paypal && typeof payload.paypal === "object") {
    const pp = payload.paypal;
    patch.paypal = {};
    if (typeof pp.enabled === "boolean") patch.paypal.enabled = pp.enabled;
    if (typeof pp.mode === "string") patch.paypal.mode = pp.mode === "live" ? "live" : "sandbox";
    if (typeof pp.clientId === "string") patch.paypal.clientId = pp.clientId.trim();
    if (typeof pp.clientSecret === "string") patch.paypal.clientSecret = pp.clientSecret.trim();
    if (typeof pp.currency === "string" && pp.currency.trim()) patch.paypal.currency = pp.currency.trim().toUpperCase();
    if (typeof pp.amount === "string" && pp.amount.trim()) patch.paypal.amount = pp.amount.trim();
    if (typeof pp.intent === "string" && pp.intent.trim()) patch.paypal.intent = pp.intent.trim().toUpperCase();
  }
  return patch;
}

function toPublicSettings(settings) {
  const paypal = settings.paypal || {};
  return {
    paypal: {
      enabled: Boolean(paypal.enabled),
      mode: paypal.mode === "live" ? "live" : "sandbox",
      clientId: paypal.clientId || "",
      currency: paypal.currency || "USD",
      amount: paypal.amount || "9.99",
      intent: paypal.intent || "CAPTURE",
    },
  };
}

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const current = await getSettings();
    if (String(req.query.public || "") === "1") {
      return res.status(200).json({ ok: true, settings: toPublicSettings(current) });
    }
    if (!requireAdmin(req, res)) {
      return;
    }
    return res.status(200).json({ ok: true, settings: current });
  }

  if (req.method === "POST") {
    if (!requireAdmin(req, res)) {
      return;
    }
    const current = await getSettings();
    const patch = sanitizeSettingsPatch(parseBody(req));
    const next = {
      ...current,
      ...patch,
      paypal: {
        ...(current.paypal || {}),
        ...(patch.paypal || {}),
      },
    };
    await saveSettings(next);
    return res.status(200).json({ ok: true, settings: next });
  }

  return sendMethodNotAllowed(res, ["GET", "POST"]);
};
