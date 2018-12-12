const guard = require("../_helpers/guard.js");
const UserDevelopmentSheet = require("../controllers/userDevelopmentSheet.controller.js");

module.exports = app => {
  //Get all Items
  app.post(
    "/services/getAllUserDevelopmentSheetsByUserIdForList",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.getAllUserDevelopmentSheetsByUserId
  );
  app.post(
    "/services/getAllUserDevelopmentSheetsForList",
    guard(["admin", "trainer"]),
    UserDevelopmentSheet.getAllUserDevelopmentSheets
  );
  app.post(
    "/services/getUserDevelopmentSheet",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.getUserDevelopmentSheet
  );
  app.post(
    "/services/setTrainerToUserDevSheet",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.associateTrainerDevSheet
  );
  app.post(
    "/services/setTraineeToUserDevSheet",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.associateTraineeDevSheet
  );
};
