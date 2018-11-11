const db = require('../config/db.config')
const MainCategory = db.mainCategory

// FETCH all Items
exports.findAll = (req, res) => {
    MainCategory.findAll().then(mainCategory => { // catch
        res.send(mainCategory)
})
}