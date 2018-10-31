module.exports = (app) => {
    const Items = require('../controllers/items.controller.js')

    //Get all Items
    app.get('/api/items', Items.findAll)
}
