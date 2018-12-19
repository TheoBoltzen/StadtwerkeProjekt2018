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
