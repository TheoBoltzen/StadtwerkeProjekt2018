const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/db.config");
const cors = require("cors");
var guard = require("express-jwt-permissions")();

const app = express();

app.use(cors());
app.use(logger("dev"));

//Mit BodyParser werden Requests direkt geparsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//guard - admin has permissions for the whole app (each route)
app.use(
  guard.check("admin").unless({
    path: [
      "/services/authenticate"
      //"/api/items"
    ]
  })
);

//Sync Sequelize
db.sequelize.sync({ alter: true }).catch(error => {
  // sync({force: alter}) is the solution!
  console.log("sync failed: ", error);
});

//Routes
require("./routes/items.route")(app);
require("./routes/user.route")(app);
require("./routes/category.route")(app);
require("./routes/competence.route")(app);

module.exports = app;
