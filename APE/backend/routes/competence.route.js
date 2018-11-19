module.exports = app => {
  const Competence = require("../controllers/competence.controller.js");

  //Get all Items
  app.post("/services/createCompetence", Competence.newCompetence);
  app.get("/services/getAllCompetences", Competence.getAll);
  app.get(
    "/services/getCompetencesBySubCategory",
    Competence.getAllBySubCategory
  );
  app.get(
    "/services/getCompetencesByCompetencyCategory",
    Competence.getAllByCompetencyCategory
  );
  app.get(
    "/services/getCompetencesByMainCategory",
    Competence.getAllByMainCategory
  );
};
