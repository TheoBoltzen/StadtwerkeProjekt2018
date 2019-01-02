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
exports.getfullById = (req, res, next) => {
  readyDevSheetService
    .getfullById(req.body)
    .then(result => res.json({ result }))
    .catch(err => next(err));
};
