const Items = require("../controllers/items.controller.js");
const guard = require("../_helpers/guard");

module.exports = app => {
  //Get all Items
  app.get("/api/items", guard(["admin"]), Items.findAll);
};
