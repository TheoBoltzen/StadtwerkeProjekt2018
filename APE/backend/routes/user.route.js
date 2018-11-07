module.exports = (app) => {

    const Users = require('../users/user.controller.js')

    //authenticate user
    //app.post('/authenticate', Users.authenticate)
    app.get('/users', Users.getAll)
}
