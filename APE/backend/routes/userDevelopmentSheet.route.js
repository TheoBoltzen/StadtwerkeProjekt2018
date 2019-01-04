const guard = require("../_helpers/guard.js");
const UserDevelopmentSheet = require("../controllers/userDevelopmentSheet.controller.js");

module.exports = app => {
  //Get all Items
  app.post(
    "/services/setStatusRated",
    guard(["admin", "trainer"]),
    UserDevelopmentSheet.setStatusRated
  );
  app.post(
    "/services/setStatusEstimated",
    guard(["admin", "trainee"]),
    UserDevelopmentSheet.setStatusEstimated
  );
  app.post(
    "/services/setTrainerToUserDevSheet",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.associateTrainerDevSheet
  );
  app.post(
    "/services/deleteUserDevSheet",
    guard(["admin"]),
    UserDevelopmentSheet.deleteUserDevelopmentSheet
  );
  app.post(
    "/services/setDigitalAgreement",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.setDigitalAgreement
  );
  app.post(
    "/services/getAllUserDevelopmentSheetsByUserTraineeForList",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.getAllUserDevelopmentSheetsByUserTrainee
  );
  app.post(
    "/services/getAllUserDevelopmentSheetsByUserTrainerForList",
    guard(["admin", "trainer"]),
    UserDevelopmentSheet.getAllUserDevelopmentSheetsByUserTrainer
  );
  app.get(
    "/services/getAllUserDevelopmentSheetsForList",
    guard(["admin", "trainer"]),
    UserDevelopmentSheet.getAllUserDevelopmentSheets
  );
  app.post(
    "/services/getUserDevelopmentSheet",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheet.getUserDevelopmentSheet
  );
};
