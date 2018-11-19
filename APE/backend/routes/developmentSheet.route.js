module.exports = app => {
  const DevelopmentSheet = require("../controllers/developmentSheet.controller.js");

  //Get all Items
  app.get("/api/getAllDevelopmentSheets", DevelopmentSheet.getAll);
  app.post("/api/createDevelopmentSheet", DevelopmentSheet.newDevelopmentSheet);
};
