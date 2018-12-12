const readyDevSheetService = require("../services/readyDevelopmentSheet.service");
const express = require("express");
const router = express.Router();

exports.newReadyDevSheet = (req, res, next) => {
  readyDevSheetService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.updateReadyDevSheet = (req, res, next) => {
  readyDevSheetService
    .update(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAllSimple = (req, res, next) => {
  readyDevSheetService
    .findAll()
    .then(competences => res.json(competences))
    .catch(err => next(err));
};

exports.getAllDevSheets = (req, res, next) => {
  readyDevSheetService
    .getAllDevSheets(req.body)
    .then(devSheet => res.json(devSheet))
    .catch(err => next(err));
};

function getById(req, res, next) {
  readyDevSheetService
    .getById(req.params.id)
    .then(competence =>
      competence ? res.json(competence) : res.sendStatus(404)
    )
    .catch(err => next(err));
}
