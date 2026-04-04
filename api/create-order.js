module.exports = async (req, res) => {
  res.status(200).json({
    hasClientId: !!process.env.PAYPAL_CLIENT_ID,
    hasSecret: !!process.env.PAYPAL_SECRET,
    clientIdPrefix: process.env.PAYPAL_CLIENT_ID?.slice(0, 12) || null
  });
};
