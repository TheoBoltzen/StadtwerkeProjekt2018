const db = require("../config/db.config");
const backendSecurity = require("../services/backendsecurity.service"),
  wait = require("wait.for-es6");
const categoryService = require("../services/category.service");
const Category = db.category;

// FETCH all categories
exports.findAll = (req, res, next) => {
  if (backendSecurity.checkIfRequestIsAuthenticated(req.body)) {
    categoryService
      .findAll()
      .then(Category => res.json(Category))
      .catch(err => next(err));
  } else {
    console.log("caution: unauthenticated request!");
  }
};
