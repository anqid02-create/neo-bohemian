module.exports = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "capture-order api works"
  });
};
