const competencyCategoryService = require("../services/competencyCategory.service");
const express = require("express");
const router = express.Router();

exports.newCompetencyCategory = (req, res, next) => {
  competencyCategoryService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
  competencyCategoryService
    .findAll()
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
  competencyCategoryService
    .update(req.body)
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

function getById(req, res, next) {
  competencyCategoryService
    .getById(req.params.name)
    .then(competence =>
      competence ? res.json(competence) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  competencyCategoryService
    .delete(req.params.name)
    .then(() => res.json({}))
    .catch(err => next(err));
}
