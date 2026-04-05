module.exports = async (req, res) => {
  try {
    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
    ).toString("base64");

    // 1. 先获取 PayPal access token
    const tokenResponse = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(500).json({
        error: "Failed to get PayPal access token",
        details: tokenData
      });
    }

    // 2. 创建订单
    const orderResponse = await fetch("https://api-m.paypal.com/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "9.99"
            }
          }
        ]
      })
    });

    const orderData = await orderResponse.json();

    res.status(orderResponse.status).json(orderData);

  } catch (error) {
    res.status(500).json({
      error: "Create order failed",
      details: error.message
    });
  }
};
