module.exports = app => {
  const CompetencyCategory = require("../controllers/competencyCategory.controller.js");

  //Get all Items
  app.post(
    "/services/createCompetencyCategory",
    CompetencyCategory.newCompetencyCategory
  );
  app.post("/services/getAllCompetencyCategories", CompetencyCategory.getAll);
};
