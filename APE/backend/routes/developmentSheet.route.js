module.exports = app => {
  const DevelopmentSheet = require("../controllers/developmentSheet.controller.js");

  //Get all Items
  app.get("/api/developmentSheet", DevelopmentSheet.findAll);
};
