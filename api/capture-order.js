const { parseBody, sendMethodNotAllowed } = require("./_lib/http");
const { getSettings, getOrders, saveOrders } = require("./_lib/storage");

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
    const paypal = settings.paypal || {};
    const clientId = process.env.PAYPAL_CLIENT_ID || paypal.clientId;
    const clientSecret = process.env.PAYPAL_SECRET || process.env.PAYPAL_CLIENT_SECRET || paypal.clientSecret;
    if (!clientId || !clientSecret) {
      return res.status(500).json({ ok: false, error: "Missing PayPal credentials" });
    }

    const mode = paypal.mode === "live" ? "live" : "sandbox";
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
    return res.status(500).json({
      ok: false,
      error: "Capture failed",
      details: error.message,
    });
  }
};
