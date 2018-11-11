const db = require('../config/db.config')
const DevelopmentBow = db.developmentBow

// FETCH all Items
exports.findAll = (req, res) => {
    DevelopmentBow.findAll().then(developmentBow => { // catch
        res.send(developmentBow)
})
}