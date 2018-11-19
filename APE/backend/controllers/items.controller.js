const db = require("../config/db.config");
const backendSecurity = require("../services/backendsecurity.service"),
  wait = require("wait.for-es6");
const itemService = require("../services/item.service");
const Item = db.items;

// FETCH all Items
exports.findAll = (req, res, next) => {
  itemService
    .findAll()
    .then(Item => res.json(Item))
    .catch(err => next(err));
};
