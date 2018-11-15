const competenceService = require("../services/competence.service");
const backendSecurity = require("../services/backendsecurity.service"),
  wait = require("wait.for-es6");

// FETCH all Items
exports.findAll = (req, res, next) => {
  if (backendSecurity.checkIfRequestIsAuthenticated(req.body)) {
    competenceService
      .findAll()
      .then(competences => res.json(competences))
      .catch(err => next(err));
  } else {
    console.log("caution: unauthenticated request!");
  }
};

exports.functionXY = (req, res, next) => {
  competenceService
    .firstFunction()
    .then(competences => res.json(competences))
    .catch(err => next(err));
};
