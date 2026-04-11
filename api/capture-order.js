const { parseBody, sendMethodNotAllowed } = require("./_lib/http");
const { getSettings, getOrders, saveOrders } = require("./_lib/storage");
const { resolvePaypalConfig } = require("./_lib/paypal-config");

async function getAccessToken(baseUrl, clientId, clientSecret) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(`PayPal token failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return sendMethodNotAllowed(res, ["POST"]);
  }

  try {
    const { orderID } = parseBody(req);
    if (!orderID) {
      return res.status(400).json({ ok: false, error: "Missing orderID" });
    }

    const settings = await getSettings();
    const paypal = resolvePaypalConfig(settings);
    if (!paypal.configured) {
      return res.status(500).json({ ok: false, error: paypal.configError || "Missing PayPal credentials" });
    }

    const clientId = paypal.clientId;
    const clientSecret = paypal.clientSecret;
    const mode = paypal.mode;
    const baseUrl = mode === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
    const accessToken = await getAccessToken(baseUrl, clientId, clientSecret);

    const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    const orders = await getOrders();
    const index = orders.findIndex((item) => item.id === orderID);
    const nextRecord = {
      id: orderID,
      status: data.status || (response.ok ? "COMPLETED" : "FAILED"),
      mode,
      updatedAt: new Date().toISOString(),
      rawCapture: data,
    };
    if (index >= 0) {
      orders[index] = { ...orders[index], ...nextRecord };
    } else {
      orders.push({ ...nextRecord, createdAt: new Date().toISOString() });
    }
    await saveOrders(orders);

    return res.status(response.status).json({ ok: response.ok, ...data });
  } catch (error) {
    const details = error.message;
    return res.status(500).json({
      ok: false,
      error: "Capture failed",
      details,
      hint: /invalid_client/i.test(details)
        ? "Check that PayPal Client ID, Secret, and mode all belong to the same sandbox/live app."
        : undefined,
    });
  }
};
