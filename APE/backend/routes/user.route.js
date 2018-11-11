module.exports = (app) => {
    const User = require('../controllers/user.controller.js')

    //Get all Items
    app.get('/api/user', User.findAll)
}
