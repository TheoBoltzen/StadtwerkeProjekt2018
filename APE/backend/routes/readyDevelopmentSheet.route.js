module.exports = app => {
  const ReadyDevelopmentSheet = require("../controllers/readyDevelopmentSheet.controller.js");

  //Get all Items
  app.get("/api/readyDevelopmentSheet", ReadyDevelopmentSheet.findAll);
};
