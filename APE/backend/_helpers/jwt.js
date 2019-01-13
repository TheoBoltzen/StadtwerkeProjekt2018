const expressJwt = require("express-jwt");
const config = require("../config.json");

module.exports = jwt;

function jwt() {
  console.log("jwt - jwt()");
  const secret = config.secret;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      "/services/authenticate",
      "/services/register"
    ]
  });
}
