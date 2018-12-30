const Users = require("../controllers/user.controller.js");
const guard = require("../_helpers/guard.js");

module.exports = app => {
  app.post("/services/authenticate", Users.authenticate);
  app.post("/services/register", Users.register);
  app.get("/services/getAllUser", guard(["admin"]), Users.getAll);
  app.get(
    "/services/getAllTrainees",
    guard(["admin", "trainer"]),
    Users.getAllTrainees
  );
};
