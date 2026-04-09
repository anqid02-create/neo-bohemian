const crypto = require("crypto");

function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "change-me",
    secret: process.env.ADMIN_TOKEN_SECRET || "dev-secret-change-me",
  };
}

function isValidAdminLogin(email, password) {
  const creds = getAdminCredentials();
  return email === creds.email && password === creds.password;
}

function signAdminToken(email) {
  const { secret } = getAdminCredentials();
  const payload = {
    email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };
  const raw = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(raw).digest("base64url");
  return `${raw}.${sig}`;
}

function verifyAdminToken(token) {
  if (!token || !token.includes(".")) {
    return null;
  }
  const { secret } = getAdminCredentials();
  const [raw, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("base64url");
  if (expected !== sig) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

function getTokenFromRequest(req) {
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) {
    return auth.slice(7).trim();
  }
  return "";
}

function requireAdmin(req, res) {
  const token = getTokenFromRequest(req);
  const payload = verifyAdminToken(token);
  if (!payload) {
    res.status(401).json({ ok: false, error: "Unauthorized" });
    return null;
  }
  return payload;
}

module.exports = {
  isValidAdminLogin,
  signAdminToken,
  requireAdmin,
};
