const { PrivateMessage, GroupMessage, User } = require("../models");

module.exports = class MessageController {
  static async getDirectMessages(req, res, next) {
    try {
      const { username } = req.params;
      
      if (!username) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      const findReceivedUser = await User.findOne({
        where: { username: username },
      });
      if (!findReceivedUser) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      const privateMessages = await PrivateMessage.findAll({
        where: {
          SenderId: req.user.id,
          ReceiverId: findReceivedUser.id,
        },
      });

      res.status(200).json(privateMessages);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async sendDirectMessage(req, res, next) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
