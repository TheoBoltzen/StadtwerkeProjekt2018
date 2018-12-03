const guard = require("../_helpers/guard.js");
const CompetencyCategory = require("../controllers/competencyCategory.controller.js");

module.exports = app => {
  //Get all Items
  app.post(
    "/services/createCompetencyCategory",
    guard(["admin", "trainer"]),
    CompetencyCategory.newCompetencyCategory
  );
  app.get(
    "/services/getAllCompetencyCategories",
    guard(["admin", "trainer"]),
    CompetencyCategory.getAll
  );
  app.post(
    "/services/updateCompetencyCategory",
    guard(["admin", "trainer"]),
    CompetencyCategory.update
  );
};
