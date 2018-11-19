const subCategoryService = require("../services/subCategory.service");
const express = require("express");
const router = express.Router();

exports.newSubCategory = (req, res, next) => {
  subCategoryService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
  subCategoryService
    .findAll()
    .then(subCategories => res.json(subCategories))
    .catch(err => next(err));
};

exports.getAllByMainCategory = (req, res, next) => {
  subCategoryService
    .getAllByMainCategory(req.body)
    .then(subCategories => res.json(subCategories))
    .catch(err => next(err));
};

exports.getAllByCompetencyCategory = (req, res, next) => {
  subCategoryService
    .getAllByCompetencyCategory(req.body)
    .then(subCategories => res.json(subCategories))
    .catch(err => next(err));
};

function getById(req, res, next) {
  subCategoryService
    .getById(req.params.name)
    .then(competence =>
      competence ? res.json(competence) : res.sendStatus(404)
    )
    .catch(err => next(err));
}

function _delete(req, res, next) {
  subCategoryService
    .delete(req.params.name)
    .then(() => res.json({}))
    .catch(err => next(err));
}
