const db = require("../config/db.config");
wait = require("wait.for-es6");
const itemService = require("../services/item.service");

// FETCH all Items
exports.findAll = (req, res, next) => {
  itemService
    .findAll()
    .then(Item => res.json(Item))
    .catch(err => next(err));
};
