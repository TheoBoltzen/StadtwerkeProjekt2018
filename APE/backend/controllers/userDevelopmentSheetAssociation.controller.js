const userdevSheetServiceAsso = require("../services/userDevelopmentSheetAssociation.service");
const express = require("express");
const router = express.Router();

exports.associateTraineeDevSheet = (req, res, next) => {
  userdevSheetServiceAsso
    .associate(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.setTrainerAssessment = (req, res, next) => {
  userdevSheetServiceAsso
    .setTrainerAssessment(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.setTraineeAssessment = (req, res, next) => {
  userdevSheetServiceAsso
    .setTraineeAssessment(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};
