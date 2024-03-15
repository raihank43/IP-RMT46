const { Group, GroupMessage, User, Profile } = require("../models");
module.exports = class GroupController {
  static async getAllPublicGroupMessage(req, res, next) {
    try {
      const data = await GroupMessage.findAll({
        where: { GroupId: 1 },
        include: [
          { model: Group, as: "Group" },
          {
            model: User,
            as: "User",
            attributes: ["username"],
            include: [{ model: Profile, as: "Profile" }],
          },
        ],
      });

      const addBelongsTo = data.map((el) => {
        if (el.UserId == req.user.id) {
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

  static async sendMessageToPublicGroup(req, res, next) {
    try {
      const { text } = req.body;
      if (!text) {
        throw {
          name: "CustomError",
          status: 400,
          message: "Message is required.",
        };
      }

      const sendMessage = await GroupMessage.create({
        UserId: req.user.id,
        GroupId: 1,
        text,
      });

      res.status(201).json(sendMessage);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
