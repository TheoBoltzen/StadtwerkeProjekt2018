const db = require('../config/db.config')
const Competence = db.competence

// FETCH all Items
exports.findAll = (req, res) => {
    Competence.findAll().then(comptence => { // catch
        res.send(competence)
})
}