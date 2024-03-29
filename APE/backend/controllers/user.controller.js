const userService = require("../services/user.service");

exports.authenticate = (req, res, next) => {
  userService
    .authenticate(req.body, res)
    .then(user => {
      if (user) {
        res.status(201).send(user);
      } else {
        userService
          .tryLogin(req.body, res)
          .then(() => {})
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
};

exports.register = (req, res, next) => {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
};
exports.getAllTrainees = (req, res, next) => {
  userService
    .getAllTrainees()
    .then(users => res.json(users))
    .catch(err => next(err));
};

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}
