const jwt = require("jsonwebtoken");
const config = require("./../config.json");

exports.decodeToken = (req, res, next) => {
  try {
    if (req.body.token) {
      const token = req.body.token;
      const decodedToken = jwt.verify(token, config.secret);
      const role = decodedToken.role;
      //return role;
      res.status(200).send(role);
    } else {
      res.status(400).json({ message: "req.body.token ist leer" });
    }
  } catch (e) {
    res.status(400).json({ message: "Fehler bei Token-Übertragung" });
  }
};
