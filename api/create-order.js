module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "create-order api works"
  });
};
