const jwt = require("jsonwebtoken");
const config = require("./../config.json");

module.exports = role => (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const verifiedToken = jwt.verify(token, config.secret);

  const permission = verifiedToken.role;

  const isPermitted = !!role.find(i => i === permission);

  if (isPermitted) {
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};
