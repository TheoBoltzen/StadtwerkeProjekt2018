const bcrypt = require("bcryptjs");
const db = require("../config/db.config"),
  wait = require("wait.for-es6");
const User = db.user;

module.exports = {
  checkIfRequestIsAuthenticated
};

async function checkIfRequestIsAuthenticated(userParam) {
  // validate
  console.log(
    "###############################################################################"
  );

  //const user = wait.for(User.findOne({ where: { username: userParam.username } })) ;
  const user = await User.findOne({ where: { username: userParam.username } });

  if (user && bcrypt.compareSync(userParam.password, user.hash)) {
    console.log("true!");
    return true;
  } else {
    console.log("false!");
    return false;
  }
}
