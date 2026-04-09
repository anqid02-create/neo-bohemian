function parseBody(req) {
  if (!req || req.body == null) {
    return {};
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      return {};
    }
  }
  if (typeof req.body === "object") {
    return req.body;
  }
  return {};
}

function sendMethodNotAllowed(res, methods) {
  res.setHeader("Allow", methods.join(", "));
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}

module.exports = {
  parseBody,
  sendMethodNotAllowed,
};
