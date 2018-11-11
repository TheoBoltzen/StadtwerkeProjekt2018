const db = require('../config/db.config')
const CompetencyCategory = db.competencyCategory

// FETCH all Items
exports.findAll = (req, res) => {
    CompetencyCategory.findAll().then(competencyCategory => { // catch
        res.send(competencyCategory)
})
}