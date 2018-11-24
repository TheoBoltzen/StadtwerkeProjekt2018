const guard = require("../_helpers/guard.js");

module.exports = app => {
  const MainCategory = require("../controllers/mainCategory.controller.js");

  //Get all Items
  app.post(
    "/services/createMainCategory",
    guard(["admin", "trainer"]),
    MainCategory.newMainCategory
  );
  app.get(
    "/services/getAllMainCategories",
    guard(["admin", "trainer"]),
    MainCategory.getAll
  );
  app.get(
    "/services/getMainCategoriesByCompetencyCategory",
    guard(["admin", "trainer"]),
    MainCategory.getAllByCompetencyCategory
  );
  app.get(
    "/services/joinTest",
    guard(["admin", "trainer"]),
    MainCategory.joinTest
  );
};
