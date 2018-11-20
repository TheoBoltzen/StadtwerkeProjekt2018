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
  update,
  delete: _delete
};

async function authenticate({ username, password }) {
  console.log(username + "   " + password);
  const user = await User.findOne({ where: { username: username } });

  if (user && bcrypt.compareSync(password, user.hash)) {
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
  //return await User.findOne({ where: { username: username } });
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
      role: userParam.role
    });
    // save user in db
    newUser.save().then(() => {});
  }
}

async function update(id, userParam) {
  const user = await User.findById(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== userParam.username &&
    (await User.findOne({ username: userParam.username }))
  ) {
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
