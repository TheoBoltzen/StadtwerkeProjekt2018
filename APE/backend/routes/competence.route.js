const guard = require("../_helpers/guard.js");

module.exports = app => {
  const Competence = require("../controllers/competence.controller.js");

  app.post(
    "/services/createCompetence",
    guard(["admin", "trainer"]),
    Competence.newCompetence
  );
  app.get(
    "/services/getAllCompetences",
    guard(["admin", "trainer"]),
    Competence.getAll
  );
  app.get(
    "/services/getCompetencesBySubCategory",
    guard(["admin", "trainer"]),
    Competence.getAllBySubCategory
  );
  app.get(
    "/services/getCompetencesByCompetencyCategory",
    guard(["admin", "trainer"]),
    Competence.getAllByCompetencyCategory
  );
  app.get(
    "/services/getCompetencesByMainCategory",
    guard(["admin", "trainer"]),
    Competence.getAllByMainCategory
  );
};
