const Role = require("../controllers/role.controller.js");

module.exports = app => {
  //Get all Items
  app.get("/role", Role.decodeToken);
};
