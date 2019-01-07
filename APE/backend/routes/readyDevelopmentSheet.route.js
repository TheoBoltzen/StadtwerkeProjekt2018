const guard = require("../_helpers/guard.js");
const ReadyDevelopmentSheet = require("../controllers/readyDevelopmentSheet.controller.js");

module.exports = app => {
  app.post(
    "/services/createReadyDevelopmentSheet",
    guard(["admin"]),
    ReadyDevelopmentSheet.newReadyDevSheet
  );
  app.post(
    "/services/updateReadyDevelopmentSheet",
    guard(["admin"]),
    ReadyDevelopmentSheet.updateReadyDevSheet
  );
  app.post(
    "/services/getEmptyDevSheet",
    guard(["admin", "trainer", "trainee"]),
    ReadyDevelopmentSheet.getemptyById
  );
  app.post(
    "/services/getFullDevSheet",
    guard(["admin", "trainer", "trainee"]),
    ReadyDevelopmentSheet.getfullById
  );
};
