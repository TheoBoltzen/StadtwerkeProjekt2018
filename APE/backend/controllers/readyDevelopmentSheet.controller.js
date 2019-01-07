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
exports.getemptyById = (req, res, next) => {
  readyDevSheetService
    .getemptyById(req.body)
    .then(result => res.json({ result }))
    .catch(err => next(err));
};
exports.getfullByIdTrainer = (req, res, next) => {
  readyDevSheetService
    .getfullByIdTrainer(req.body, req.headers.authorization.split("Bearer ")[1])
    .then(result => res.json({ result }))
    .catch(err => next(err));
};
exports.getfullByIdTrainee = (req, res, next) => {
  readyDevSheetService
    .getfullByIdTrainee(req.body, req.headers.authorization.split("Bearer ")[1])
    .then(result => res.json({ result }))
    .catch(err => next(err));
};
