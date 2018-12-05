const guard = require("../_helpers/guard.js");
const DevelopmentSheet = require("../controllers/developmentSheet.controller.js");

module.exports = app => {
  //Get all Items
  app.get(
    "/services/getAllDevelopmentSheets",
    guard(["admin", "trainer"]),
    DevelopmentSheet.getAll
  );
  app.post(
    "/services/createDevelopmentSheet",
    guard(["admin", "trainer"]),
    DevelopmentSheet.newDevelopmentSheet
  );
};
