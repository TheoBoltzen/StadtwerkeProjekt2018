module.exports = (app) => {
    const SubCategory = require('../controllers/subCategory.controller.js')

    //Get all Items
    app.get('/api/subCategory', SubCategory.findAll)
}
