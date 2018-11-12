const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/db.config");

const app = express();

app.use(logger("dev"));

//Mit BodyParser werden Requests direkt geparsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Sync Sequelize
db.sequelize.sync().catch(error => {
  console.log("sync failed: ", error);
});

//Routes
require("./routes/items.route")(app);
require("./routes/user.route")(app);

module.exports = app;
