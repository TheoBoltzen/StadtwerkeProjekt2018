module.exports = (app) => {
    const Users = require('../controllers/user.controller.js')

    //authenticate user
    //app.post('/authenticate', Users.authenticate)
    app.get('/services', Users.getAll)

    /*
//router.post('/authenticate', authenticate);
router.post('/register', register);
//router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
*/
}
