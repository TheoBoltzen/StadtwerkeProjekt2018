const db = require('../config/db.config')
const User = db.user

// FETCH all Items
exports.findAll = (req, res) => {
    User.findAll().then(user => { // catch
        res.send(user)
})
}