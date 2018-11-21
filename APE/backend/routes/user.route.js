const Users = require("../controllers/user.controller.js");

module.exports = app => {
  app.post("/services/authenticate", Users.authenticate);
  app.post("/services/register", Users.register);
};
