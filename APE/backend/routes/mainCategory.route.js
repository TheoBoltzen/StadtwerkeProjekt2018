const guard = require("../_helpers/guard.js");

module.exports = app => {
  const MainCategory = require("../controllers/mainCategory.controller.js");

  //Get all Items
  app.post("/services/createMainCategory", MainCategory.newMainCategory);
  app.get(
    "/services/getAllMainCategories",
    guard(["admin"]),
    MainCategory.getAll
  );
  app.get(
    "/services/getMainCategoriesByCompetencyCategory",
    MainCategory.getAllByCompetencyCategory
  );
  app.get("/services/joinTest", MainCategory.joinTest);
};
