module.exports = (app) => {
    const DevelopmentBow = require('../controllers/developmentBow.controller.js')

    //Get all Items
    app.get('/api/developmentBow', DevelopmentBow.findAll)
}
