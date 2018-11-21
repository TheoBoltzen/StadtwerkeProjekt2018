const guard = require("../_helpers/guard.js");

module.exports = app => {
  const CompetencyCategory = require("../controllers/competencyCategory.controller.js");

  //Get all Items
  app.post(
    "/services/createCompetencyCategory",
    guard(["admin", "trainer"]),
    CompetencyCategory.newCompetencyCategory
  );
  app.post(
    "/services/getAllCompetencyCategories",
    guard(["admin", "trainer"]),
    CompetencyCategory.getAll
  );
};
