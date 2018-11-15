const expressJwt = require("express-jwt");
const config = require("../config.json");
const userService = require("../services/user.service");

module.exports = jwt;

function jwt() {
  console.log("jwt - jwt()");
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/services/authenticate",
      "/services/register"
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(user.id);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
