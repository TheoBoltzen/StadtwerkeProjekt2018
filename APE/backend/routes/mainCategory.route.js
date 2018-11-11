module.exports = (app) => {
    const MainCategory = require('../controllers/mainCategory.controller.js')

    //Get all Items
    app.get('/api/mainCategory', MainCategory.findAll)
}
