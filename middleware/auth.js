const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    next();
    return;
  }

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
