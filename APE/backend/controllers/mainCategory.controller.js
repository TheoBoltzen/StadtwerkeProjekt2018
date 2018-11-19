const mainCategoryService = require("../services/mainCategory.service");
const express = require("express");
const router = express.Router();

exports.newMainCategory = (req, res, next) => {
  mainCategoryService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
  mainCategoryService
    .findAll()
    .then(mainCategories => res.json(mainCategories))
    .catch(err => next(err));
};

exports.getAllByCompetencyCategory = (req, res, next) => {
  mainCategoryService
    .getAllByCompetencyCategory(req.body)
    .then(mainCategories => res.json(mainCategories))
    .catch(err => next(err));
};

exports.joinTest = (req, res, next) => {
  mainCategoryService
    .getAllByCompetencyCategory(req.params.name)
    .then(mainCategories => res.json(mainCategories))
    .catch(err => next(err));
};

function getById(req, res, next) {
  mainCategoryService
    .getById(req.params.name)
    .then(mainCategory =>
      mainCategory ? res.json(mainCategory) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  mainCategoryService
    .delete(req.params.name)
    .then(() => res.json({}))
    .catch(err => next(err));
}
