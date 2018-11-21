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
    .then(devSheets => res.json(devSheets))
    .catch(err => next(err));
};

function getById(req, res, next) {
  devSheetService
    .getById(req.params.name)
    .then(devSheets => (devSheets ? res.json(devSheets) : res.sendStatus(404)))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  devSheetService
    .delete(req.params.name)
    .then(() => res.json({}))
    .catch(err => next(err));
}
