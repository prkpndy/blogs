function cors(req, reply, done) {
  const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];

  reply.headers({
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-allow-methods": ALLOWED_METHODS.join(", "),
    "access-control-allow-credentials": true,
  });

  if (req.method === "OPTIONS") {
    return reply.headers({ "content-length": 0 }).send();
  }

  done();
}

module.exports = cors;
