const config = require('./../config.json');      //have to be implemented
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db.config');
const User = db.user;
/*
// FETCH all Items
    User.findAll().then(users => {
        console.log("findAll()");
        console.log(users[0].dataValues.username)
    });
*/
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    console.log("user.service - authenticate()");
    //console.log(username + " "+ password);

    const user = await User.findOne({ where: {username: username} });
    console.log(user.dataValues);
    console.log("password_DB: " + user.hash + "           password_login: " + password);

    if (user && bcrypt.compareSync(password, user.hash)) {
        //console.log("geht rein - 1", user);
        //const { hash, ...userWithoutHash } = user.toObject();
        //const userParse = JSON.parse(user)

        //console.log(...userWithoutHash);
        const token = jwt.sign({ sub: user.id }, config.secret);
        console.log("geht rein - 3", token);
        return {
            token,
            user
        };
    }
}

async function getAll() {
    console.log("user.service - getALL")
    return await User.find().select('-hash');
}

async function getById(id) {
    console.log("user.service - getById()");
    return await User.findById(id).select('-hash');
    //return await User.findOne({ where: {username: id} }).select('-hash');
}

async function create(userParam) {
    console.log("user.service - create()");
    // validate
    if (await User.findOne({ where: {username: userParam.username} }))
    {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else {
       // const user = new User(userParam);
        console.log("neuer User wird lokal erzeugt.", userParam);
        const newUser = User.build({
            username: userParam.username,
            hash: await bcrypt.hashSync(userParam.password, 10),
            firstname: userParam.firstname,
            lastname: userParam.lastname
        });
        console.log(newUser.hash);
        // hash password
        /*
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }

        // save user
        await User.create(userParam).then(function (newEntry) {
            console.log("new entry in db users!");
        }) */
        newUser.save().then(() => {
            console.log("neuer User in DB angelegt!")
        })
    }




}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}