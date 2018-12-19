const guard = require("../_helpers/guard.js");
const UserDevelopmentSheetAssociation = require("../controllers/userDevelopmentSheetAssociation.controller.js");

module.exports = app => {
  //Get all Items
  app.post(
    "/services/setTraineeToUserDevSheet",
    guard(["admin", "trainer", "trainee"]),
    UserDevelopmentSheetAssociation.associateTraineeDevSheet
  );

  app.post(
    "/services/setTrainerAssessment",
    guard(["admin", "trainer"]),
    UserDevelopmentSheetAssociation.setTrainerAssessment
  );

  app.post(
    "/services/setTraineeAssessment",
    guard(["admin", "trainee"]),
    UserDevelopmentSheetAssociation.setTraineeAssessment
  );
};
