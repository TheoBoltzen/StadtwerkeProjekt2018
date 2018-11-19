module.exports = app => {
  const Items = require("../controllers/items.controller.js");
  const jwt = require("jsonwebtoken");
  const config = require("./../config.json"); //have to be implemented
  const error = require("./../_helpers/error-handler");

  //Get all Items
  app.get(
    "/api/items",
    (req, res, next) => {
      const token = req.headers.authorization.split("Bearer ")[1];
      const decodedToken = jwt.decode(token, config.secret);

      const role = decodedToken.permissions;
      console.log("req", token);
      console.log("decodeRoute", decodedToken);
      console.log("permission: ", role);

      if (role === "admin") {
        next();
      } else {
        res.send(error());
        console.log("error");
      }
    },
    Items.findAll
  );
};
