const competenceService = require("../services/competence.service");
wait = require("wait.for-es6");

// FETCH all Items
exports.findAll = (req, res, next) => {
  competenceService
    .findAll()
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

exports.functionXY = (req, res, next) => {
  competenceService
    .firstFunction()
    .then(competences => res.json(competences))
    .catch(err => next(err));
};
