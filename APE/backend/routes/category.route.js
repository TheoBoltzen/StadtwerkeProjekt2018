module.exports = app => {
  const Category = require("../controllers/category.controller.js");

  //Get all Items
  app.get("/api/category", Category.findAll);
};
