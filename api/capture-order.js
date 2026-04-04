module.exports = async (req, res) => {
  try {
    const { orderID } = req.body || {};

    if (!orderID) {
      return res.status(400).json({ error: "Missing orderID" });
    }

    const auth = Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
    ).toString("base64");

    const response = await fetch(
      `https://api-m.paypal.com`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`,
        },
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Capture failed",
      details: error.message,
    });
  }
};
