const { parseBody, sendMethodNotAllowed } = require("../_lib/http");
const { requireAdmin } = require("../_lib/admin-auth");
const { getSettings, saveSettings } = require("../_lib/storage");
const { resolvePaypalConfig } = require("../_lib/paypal-config");

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
  const paypal = resolvePaypalConfig(settings);
  const isEnvOverride = paypal.source === "env";
  return {
    paypal: {
      enabled: isEnvOverride ? true : Boolean(paypal.enabled),
      mode: paypal.mode,
      clientId: paypal.clientId,
      configured: paypal.configured,
      currency: paypal.currency,
      amount: String(paypal.amount),
      intent: String(paypal.intent),
      configError: paypal.configError || "",
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
