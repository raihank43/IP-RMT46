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
};
