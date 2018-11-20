module.exports = app => {
  const SubCategory = require("../controllers/subCategory.controller.js");

  //Get all Items
  app.post("/services/createSubCategory", SubCategory.newSubCategory);
  app.get("/services/getAllCompetences", SubCategory.getAll);
  app.get(
    "/services/getSubCategoriesByCompetencyCategory",
    SubCategory.getAllByCompetencyCategory
  );
  app.get(
    "/services/getSubCategoriesByMainCategory",
    SubCategory.getAllByMainCategory
  );
};
