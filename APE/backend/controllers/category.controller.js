const db = require("../config/db.config");
wait = require("wait.for-es6");
const categoryService = require("../services/category.service");
const Category = db.category;

// FETCH all categories
exports.findAll = (req, res, next) => {
  categoryService
    .findAll()
    .then(Category => res.json(Category))
    .catch(err => next(err));
};
