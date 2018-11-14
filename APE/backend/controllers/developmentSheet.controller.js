const db = require("../config/db.config");
const DevelopmentSheet = db.developmentBow;

// FETCH all Items
exports.findAll = (req, res) => {
  DevelopmentSheet.findAll().then(developmentSheet => {
    // catch
    res.send(developmentSheet);
  });
};
