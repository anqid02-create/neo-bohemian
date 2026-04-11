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
    const settings = await getSettings();
    const paypal = resolvePaypalConfig(settings);
    if (!paypal.enabled) {
      return res.status(400).json({ ok: false, error: "PayPal disabled in admin settings" });
    }

    if (!paypal.configured) {
      return res.status(500).json({ ok: false, error: paypal.configError || "Missing PayPal credentials" });
    }

    const clientId = paypal.clientId;
    const clientSecret = paypal.clientSecret;
    const mode = paypal.mode;
    const baseUrl = mode === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
    const body = parseBody(req);
    const amount = String(body.amount || paypal.amount || "9.99");
    const currency = String(body.currency || paypal.currency || "USD").toUpperCase();
    const intent = String(body.intent || paypal.intent || "CAPTURE").toUpperCase();

    const accessToken = await getAccessToken(baseUrl, clientId, clientSecret);

    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent,
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
            },
          },
        ],
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      return res.status(orderResponse.status).json({ ok: false, ...orderData });
    }

    const orders = await getOrders();
    orders.push({
      id: orderData.id,
      status: orderData.status || "CREATED",
      currency,
      amount,
      mode,
      source: "checkout",
      createdAt: new Date().toISOString(),
      payerEmail: body.email || "",
      raw: orderData,
    });
    await saveOrders(orders);

    return res.status(200).json({ ok: true, ...orderData });
  } catch (error) {
    const details = error.message;
    return res.status(500).json({
      ok: false,
      error: "Create order failed",
      details,
      hint: /invalid_client/i.test(details)
        ? "Check that PayPal Client ID, Secret, and mode all belong to the same sandbox/live app."
        : undefined,
    });
  }
};
