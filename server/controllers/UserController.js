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
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
