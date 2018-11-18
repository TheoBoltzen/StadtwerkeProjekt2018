module.exports = app => {
  const Competence = require("../controllers/competence.controller.js");

  //Get all Items
  app.post("/services/createCompetence", Competence.newCompetence());
  app.post("/services/getAllCompetences", Competence.getAll());
  app.post(
    "/services/getCompetencesBySubCategory",
    Competence.getAllBySubCategory()
  );
  app.post(
    "/services/getCompetencesByCompetencyCategory",
    Competence.getAllByCompetencyCategory()
  );
  app.post(
    "/services/getCompetencesByMainCategory",
    Competence.getAllByMainCategory()
  );
};
