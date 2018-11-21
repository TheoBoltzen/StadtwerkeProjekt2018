const guard = require("../_helpers/guard.js");

module.exports = app => {
  const ReadyDevelopmentSheet = require("../controllers/readyDevelopmentSheet.controller.js");

  //Get all Items
  app.get(
    "/api/readyDevelopmentSheet",
    guard(["admin", "trainer"]),
    ReadyDevelopmentSheet.findAll
  );
};
