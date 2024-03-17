const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
async function authentication(req, res, next) {
  try {
    let access_token = req.headers.authorization;

    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    let [type, token] = access_token.split(" ");
    if (type !== "Bearer") {
      throw { name: "Unauthenticated" };
    }

    const payload = verifyToken(token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      username: user.username,
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = authentication;
