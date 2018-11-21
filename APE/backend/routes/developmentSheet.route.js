const guard = require("../_helpers/guard.js");

module.exports = app => {
  const DevelopmentSheet = require("../controllers/developmentSheet.controller.js");

  //Get all Items
  app.get(
    "/api/getAllDevelopmentSheets",
    guard(["admin", "trainer"]),
    DevelopmentSheet.getAll
  );
  app.post(
    "/api/createDevelopmentSheet",
    guard(["admin", "trainer"]),
    DevelopmentSheet.newDevelopmentSheet
  );
};
