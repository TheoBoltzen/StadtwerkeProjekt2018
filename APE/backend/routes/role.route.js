const guard = require("../_helpers/guard.js");
const Role = require("../controllers/role.controller.js");

module.exports = app => {
  //Get all Items
  app.get("/role", guard(["admin", "trainer", "trainee"]), Role.decodeToken);
};
