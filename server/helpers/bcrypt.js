const { hashSync, compareSync } = require("bcryptjs");

module.exports = {
  hashPassword: (password) => hashSync(password, 10),
  comparePassword: (password, db_password) =>
    compareSync(password, db_password),
};
