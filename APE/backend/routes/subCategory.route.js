const guard = require("../_helpers/guard.js");

module.exports = app => {
  const SubCategory = require("../controllers/subCategory.controller.js");

  //Get all Items
  app.post(
    "/services/createSubCategory",
    guard(["admin", "trainer"]),
    SubCategory.newSubCategory
  );
  app.get(
    "/services/getAllCompetences",
    guard(["admin", "trainer"]),
    SubCategory.getAll
  );
  app.get(
    "/services/getSubCategoriesByCompetencyCategory",
    guard(["admin", "trainer"]),
    SubCategory.getAllByCompetencyCategory
  );
  app.get(
    "/services/getSubCategoriesByMainCategory",
    guard(["admin", "trainer"]),
    SubCategory.getAllByMainCategory
  );
};
