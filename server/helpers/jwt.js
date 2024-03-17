const jsonwebtoken = require("jsonwebtoken");
// const { sign, verify } = jsonwebtoken;
const secret = process.env.JWT_SECRET;

// payload > informasi yang akan disimpan didalam token
function signToken(payload) {
  return jsonwebtoken.sign(payload, secret);
}

function verifyToken(token) {
  return jsonwebtoken.verify(token, secret); // return payload didalam token
}

module.exports = { signToken, verifyToken };
