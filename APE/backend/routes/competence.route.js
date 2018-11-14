module.exports = app => {
  const Competence = require("../controllers/competence.controller.js");

  //Get all Items
  app.get("/api/competence", Competence.findAll);
};
