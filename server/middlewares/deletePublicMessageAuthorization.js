const { GroupMessage } = require("../models");

async function deletePublicMessageAuthorization(req, res, next) {
  try {
    const pubMessageId = req.params.id;
    const pubMessage = await GroupMessage.findByPk(pubMessageId);
    if (!pubMessage) {
      throw { name: "NotFound" };
    }

    const sender = pubMessage.UserId;
    const reqMaker = req.user.id;

    if (sender !== reqMaker) {
      throw { name: "Unauthorized" };
    }

    next();
  } catch (error) {
    console.log(error);
    next(error)
  }
}
module.exports = deletePublicMessageAuthorization