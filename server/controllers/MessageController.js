const { Op } = require("sequelize");
const { PrivateMessage, GroupMessage, User, Profile } = require("../models");
const axios = require("axios");
const imgurClientId = process.env.imgurClientId;

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
      let { text } = req.body;
      if (!text) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Message is required.",
        };
      }
      const findReceivedUser = await User.findOne({
        where: { username: username },
      });
      if (!findReceivedUser) {
        throw { name: "CustomError", status: 404, message: "User not Found." };
      }

      if (req.file) {
        const imageBuffer = req.file.buffer;
        const base64Image = imageBuffer.toString("base64");

        const { data } = await axios.post(
          "https://api.imgur.com/3/image",
          {
            image: base64Image,
            type: "base64",
          },
          {
            headers: {
              Authorization: "Client-ID " + imgurClientId,
            },
          }
        );

        const linkImgur = data.data.link;

        const sendPrivateMessage = await PrivateMessage.create({
          text,
          SenderId: req.user.id,
          ReceiverId: findReceivedUser.id,
          imgUploadPriv: linkImgur,
        });
        return res.status(201).json(sendPrivateMessage);
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
  static async deleteDirectMessage(req, res, next) {
    try {
      const { id } = req.params;

      const privMessage = await PrivateMessage.findByPk(id);

      await privMessage.destroy(id);

      res.status(200).json({ message: "Message succesfully deleted." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
