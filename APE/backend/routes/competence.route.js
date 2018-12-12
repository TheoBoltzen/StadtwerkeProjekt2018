const guard = require("../_helpers/guard.js");
const Competence = require("../controllers/competence.controller.js");

module.exports = app => {
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
  app.post(
    "/services/getCompetencesBySubCategory",
    guard(["admin", "trainer"]),
    Competence.getAllBySubCategory
  );
  app.post(
    "/services/getCompetencesByCompetencyCategory",
    guard(["admin", "trainer"]),
    Competence.getAllByCompetencyCategory
  );
  app.post(
    "/services/getCompetencesByMainCategory",
    guard(["admin", "trainer"]),
    Competence.getAllByMainCategory
  );
};
