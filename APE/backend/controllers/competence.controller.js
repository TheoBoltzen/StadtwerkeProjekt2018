const competenceService = require("../services/competence.service");
const express = require("express");
const router = express.Router();

exports.newCompetence = (req, res, next) => {
  competenceService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
  competenceService
    .findAll()
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

exports.getAllBySubCategory = (req, res, next) => {
  competenceService
    .getAllBySubCategory(req.params.name)
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

exports.getAllByMainCategory = (req, res, next) => {
  competenceService
    .getAllByMainCategory(req.params.name)
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

exports.getAllByCompetencyCategory = (req, res, next) => {
  competenceService
    .getAllByCompetencyCategory(req.params.name)
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

function getById(req, res, next) {
  competenceService
    .getById(req.params.name)
    .then(competence =>
      competence ? res.json(competence) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  competenceService
    .delete(req.params.name)
    .then(() => res.json({}))
    .catch(err => next(err));
}
