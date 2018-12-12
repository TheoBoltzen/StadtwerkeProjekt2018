const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/db.config");
const cors = require("cors");
const testingData = require("./config/testingData");

const app = express();

app.use(cors());
app.use(logger("dev"));

//Mit BodyParser werden Requests direkt geparsed
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sync Sequelize
db.sequelize.sync({ alter: true }).catch(error => {
  // sync({force: alter}) is the solution!
  console.log("sync failed: ", error);
});

//Routes
require("./routes/user.route")(app);
require("./routes/competencyCategory.route")(app);
require("./routes/competence.route")(app);
require("./routes/role.route")(app);
require("./routes/mainCategory.route")(app);
require("./routes/subCategory.route")(app);
require("./routes/developmentSheet.route")(app);
require("./routes/readyDevelopmentSheet.route")(app);
require("./routes/userDevelopmentSheet.route")(app);

testingData.createData();

//Catch-All Route
/*app.get("*", (req, res) =>
  res.status(200).send({
    message: "Willkommen"
  })
);*/

module.exports = app;
