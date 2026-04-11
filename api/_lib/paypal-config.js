function readEnvString(name) {
  return String(process.env[name] || "").trim();
}

function normalizeMode(value) {
  return value === "live" ? "live" : "sandbox";
}

function getStoredPaypalSettings(settings) {
  const paypal = settings?.paypal || {};
  return {
    enabled: paypal.enabled !== false,
    mode: normalizeMode(String(paypal.mode || "")),
    clientId: String(paypal.clientId || "").trim(),
    clientSecret: String(paypal.clientSecret || "").trim(),
    currency: String(paypal.currency || "USD").trim().toUpperCase() || "USD",
    amount: String(paypal.amount || "9.99").trim() || "9.99",
    intent: String(paypal.intent || "CAPTURE").trim().toUpperCase() || "CAPTURE",
  };
}

function resolvePaypalConfig(settings) {
  const stored = getStoredPaypalSettings(settings);
  const envClientId = readEnvString("PAYPAL_CLIENT_ID");
  const envClientSecret = readEnvString("PAYPAL_SECRET") || readEnvString("PAYPAL_CLIENT_SECRET");
  const envMode = normalizeMode(readEnvString("PAYPAL_MODE"));
  const envCurrency = readEnvString("PAYPAL_CURRENCY").toUpperCase();
  const envAmount = readEnvString("PAYPAL_AMOUNT");
  const envIntent = readEnvString("PAYPAL_INTENT").toUpperCase();

  const hasEnvClientId = Boolean(envClientId);
  const hasEnvClientSecret = Boolean(envClientSecret);
  const hasEnvPair = hasEnvClientId && hasEnvClientSecret;
  const hasPartialEnvCredentials = hasEnvClientId !== hasEnvClientSecret;

  const hasStoredPair = Boolean(stored.clientId && stored.clientSecret);
  const hasPartialStoredCredentials = Boolean(stored.clientId) !== Boolean(stored.clientSecret);

  let source = "none";
  let clientId = "";
  let clientSecret = "";
  let mode = stored.mode;

  if (hasEnvPair) {
    source = "env";
    clientId = envClientId;
    clientSecret = envClientSecret;
    mode = envMode;
  } else if (hasStoredPair) {
    source = "stored";
    clientId = stored.clientId;
    clientSecret = stored.clientSecret;
    mode = stored.mode;
  }

  let configError = "";
  if (hasPartialEnvCredentials) {
    configError = "Incomplete PayPal environment variables: set both PAYPAL_CLIENT_ID and PAYPAL_SECRET.";
  } else if (hasPartialStoredCredentials) {
    configError = "Incomplete PayPal admin settings: set both clientId and clientSecret.";
  } else if (!clientId || !clientSecret) {
    configError = "Missing PayPal credentials.";
  }

  return {
    enabled: stored.enabled,
    source,
    mode,
    clientId,
    clientSecret,
    currency: envCurrency || stored.currency,
    amount: envAmount || stored.amount,
    intent: envIntent || stored.intent,
    configured: Boolean(clientId && clientSecret) && !configError,
    configError,
  };
}

module.exports = {
  resolvePaypalConfig,
};
