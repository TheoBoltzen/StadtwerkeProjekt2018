module.exports = (app) => {
    const Users = require('../controllers/user.controller.js')

    app.post('/services/authenticate', Users.authenticate)
    app.post('/services/register', Users.register)

}
