const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
module.exports = class UserController {
  static async Register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({ username, email });
    } catch (error) {
      console.log(error.parent.detail);
      next(error);
    }
  }

  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      if (!email) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Email is required",
        };
      }

      if (!password) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Password is required.",
        };
      }

      const user = await User.findOne({ where: { email: email } });

      if (!user || !comparePassword(password, user.password)) {
        throw {
          name: "CustomError",
          status: 401,
          message: "Invalid Email/Password",
        };
      }

      const token = signToken({
        id: user.id,
      });

      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
