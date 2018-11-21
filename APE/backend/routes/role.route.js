const Role = require("../controllers/role.controller.js");

module.exports = app => {
  //Get all Items
  app.post("/role", Role.decodeToken);
};
