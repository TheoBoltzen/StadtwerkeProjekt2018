const devSheetService = require("../services/developmentSheet.service");
const express = require("express");
const router = express.Router();

exports.newDevelopmentSheet = (req, res, next) => {
  devSheetService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
  devSheetService
    .findAll()
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

function getById(req, res, next) {
  devSheetService
    .getById(req.params.name)
    .then(competence =>
      competence ? res.json(competence) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  devSheetService
    .delete(req.params.name)
    .then(() => res.json({}))
    .catch(err => next(err));
}
