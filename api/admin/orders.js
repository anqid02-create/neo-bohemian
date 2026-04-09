const { sendMethodNotAllowed } = require("../_lib/http");
const { requireAdmin } = require("../_lib/admin-auth");
const { getOrders } = require("../_lib/storage");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendMethodNotAllowed(res, ["GET"]);
  }
  if (!requireAdmin(req, res)) {
    return;
  }
  const all = await getOrders();
  const status = String(req.query.status || "").trim().toLowerCase();
  const filtered = status ? all.filter((item) => String(item.status || "").toLowerCase() === status) : all;
  const sorted = filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return res.status(200).json({ ok: true, orders: sorted });
};
