module.exports = (app) => {
    const CompetencyCategory = require('../controllers/competencyCategory.controller.js')

    //Get all Items
    app.get('/api/competencyCategory', CompetencyCategory.findAll)
}
