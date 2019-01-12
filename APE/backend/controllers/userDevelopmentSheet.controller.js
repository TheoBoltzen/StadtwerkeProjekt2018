const userdevSheetService = require("../services/userDevelopmentSheet.service");
const express = require("express");
const router = express.Router();

exports.associateTrainerDevSheet = (req, res, next) => {
  userdevSheetService
    .setTrainer(req.body, req.headers.authorization.split("Bearer ")[1])
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.setStatusEstimated = (req, res, next) => {
  userdevSheetService
    .setStatusEstimated(req.body, req.headers.authorization.split("Bearer ")[1])
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.setStatusRated = (req, res, next) => {
  userdevSheetService
    .setStatusRated(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAllUserDevelopmentSheets = (req, res, next) => {
  userdevSheetService
    .getAllUserDevelopmentSheets(req.body)
    .then(devSheets => res.json(devSheets))
    .catch(err => next(err));
};

exports.getAllUserDevelopmentSheetsByUserTrainee = (req, res, next) => {
  userdevSheetService
    .getAllUserDevelopmentSheetsByUserTrainee(
      req.body,
      req.headers.authorization.split("Bearer ")[1]
    )
    .then(devSheets => res.json(devSheets))
    .catch(err => next(err));
};

exports.getAllUserDevelopmentSheetsByUserTrainer = (req, res, next) => {
  userdevSheetService
    .getAllUserDevelopmentSheetsByUserTrainer(
      req.body,
      req.headers.authorization.split("Bearer ")[1]
    )
    .then(devSheets => res.json(devSheets))
    .catch(err => next(err));
};

exports.getUserDevelopmentSheet = (req, res, next) => {
  userdevSheetService
    .getUserDevelopmentSheet(req.body)
    .then(devSheet => res.json(devSheet))
    .catch(err => next(err));
};

exports.deleteUserDevelopmentSheet = (req, res, next) => {
  userdevSheetService
    .delete(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.setDigitalAgreement = (req, res, next) => {
  userdevSheetService
    .setDigitalAgreement(
      req.body,
      req.headers.authorization.split("Bearer ")[1]
    )
    .then(() => res.json({}))
    .catch(err => next(err));
};
