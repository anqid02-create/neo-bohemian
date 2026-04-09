const { parseBody, sendMethodNotAllowed } = require("../_lib/http");
const { isValidAdminLogin, signAdminToken } = require("../_lib/admin-auth");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return sendMethodNotAllowed(res, ["POST"]);
  }

  const body = parseBody(req);
  const email = String(body.email || "").trim();
  const password = String(body.password || "");

  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Missing credentials" });
  }

  if (!isValidAdminLogin(email, password)) {
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  }

  const token = signAdminToken(email);
  return res.status(200).json({ ok: true, token, email });
};
