const db = require("../config/db.config");
const ReadyDevelopmentSheet = db.readyDevelopmentSheet;

// FETCH all Items
exports.findAll = (req, res) => {
  ReadyDevelopmentSheet.findAll().then(readyDevelopmentSheet => {
    // catch
    res.send(readyDevelopmentSheet);
  });
};
