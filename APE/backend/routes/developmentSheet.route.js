module.exports = app => {
  const DevelopmentBow = require("../controllers/developmentSheet.controller.js");

  //Get all Items
  app.get("/api/developmentSheet", DevelopmentSheet.findAll);
};
