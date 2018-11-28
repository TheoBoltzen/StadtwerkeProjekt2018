const guard = require("../_helpers/guard.js");
const ReadyDevelopmentSheet = require("../controllers/readyDevelopmentSheet.controller.js");

module.exports = app => {
  app.post(
    "/services/createReadyDevelopmentSheet",
    guard(["admin", "trainer"]),
    ReadyDevelopmentSheet.newReadyDevSheet
  );
};
