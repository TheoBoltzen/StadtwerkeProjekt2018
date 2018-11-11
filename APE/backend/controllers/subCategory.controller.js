const db = require('../config/db.config')
const SubCategory = db.subCategory

// FETCH all Items
exports.findAll = (req, res) => {
    SubCategory.findAll().then(subCategory => { // catch
        res.send(subCategory)
})
}