const config = require("./../config.json"); //have to be implemented
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db.config");
const User = db.user;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  tryLogin,
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  console.log(username + "   " + password);
  let user = await User.findOne({ where: { username: username } });
  if (user.tryLogin < 3 && user && bcrypt.compareSync(password, user.hash)) {
    user.tryLogin = 0; //in case of successfully login
    user.save(); //write in db

    const { hash, role, ...userWithoutHash } = user.dataValues;
    const payload = {
      username: user.dataValues.username,
      firstname: user.dataValues.firstname,
      lastname: user.dataValues.lastname,
      role: user.dataValues.role
    };
    const token = jwt.sign(payload, config.secret);

    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await User.find().select("-hash");
}

async function getById(id) {
  return await User.findById(id).select("-hash");
}
async function tryLogin(userParam, res) {
  console.log(userParam.username + "   " + userParam.password);
  let user = await User.findOne({ where: { username: userParam.username } });
  if (user) {
    if (user.tryLogin < 3) {
      res.status(400).json({ message: "Kennung und Passowrt falsch" });
      user.tryLogin += 1;
      user.save();
    }
    if (user.tryLogin === 3) {
      console.log("2 Minuten warten");
      res.status(400).json({ message: "Kennung für 2 Minuten gesperrt" });
      setTimeout(myTimeout1, 120000); //after 2 minutes login is available again
      function myTimeout1() {
        user.tryLogin = 0;
        user.save(); //write in db
      }
    }
  }
}

async function create(userParam) {
  // validate
  if (await User.findOne({ where: { username: userParam.username } })) {
    throw 'Username "' + userParam.username + '" is already taken';
  } else {
    const newUser = User.build({
      username: userParam.username,
      hash: await bcrypt.hashSync(userParam.password, 10),
      firstname: userParam.firstname,
      lastname: userParam.lastname,
      role: userParam.role,
      tryLogin: 0
    });
    // save user in db
    newUser.save().then(() => {});
  }
}

async function update(username, userParam) {
  const user = await User.findByPk(username);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
    console.log(username);
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
