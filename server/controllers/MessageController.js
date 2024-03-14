const { Op } = require("sequelize");
const { PrivateMessage, GroupMessage, User, Profile } = require("../models");

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

      let privateMessages = await PrivateMessage.findAll({
        where: {
          [Op.or]: [
            { SenderId: req.user.id, ReceiverId: findReceivedUser.id },
            { SenderId: findReceivedUser.id, ReceiverId: req.user.id },
          ],
        },
        include: [
          {
            model: User,
            as: "Sender",
            attributes: ["username"],
            include: [
              {
                model: Profile,
                as: "Profile",
                attributes: ["profileImgUrl", "fullName"],
              },
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
      });

      // handling duplicate data
      privateMessages = privateMessages.reduce((akumulator, item) => {
        if (
          !akumulator.some(
            (obj) =>
              obj.id === item.id &&
              obj.SenderId === item.SenderId &&
              obj.ReceiverId === item.ReceiverId
          )
        ) {
          akumulator.push(item);
        }
        return akumulator;
      }, []);

      // message belongs to
      let addBelongsTo = privateMessages.map((el) => {
        if (el.SenderId == req.user.id) {
          el.dataValues.messageBelongsToLoggedUser = true;
          return el;
        } else {
          el.dataValues.messageBelongsToLoggedUser = false;
          return el;
        }
      });

      res.status(200).json(addBelongsTo);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async sendDirectMessage(req, res, next) {
    try {
      const { username } = req.params;
      const { text } = req.body;

      if (!username) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      const findReceivedUser = await User.findOne({
        where: { username: username },
      });
      if (!findReceivedUser) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      const sendPrivateMessages = await PrivateMessage.create({
        text,
        SenderId: req.user.id,
        ReceiverId: findReceivedUser.id,
      });

      res.status(201).json(sendPrivateMessages);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
